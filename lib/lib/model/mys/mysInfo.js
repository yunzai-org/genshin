import lodash from 'lodash';
import { NoteUser, MysApi, MysUser, DailyCache } from 'yunzai-mys';
import gsCfg from '../gsCfg.js';

class MysInfo {
    static tips = '请先#绑定Cookie\n发送【Cookie帮助】查看配置教程';
    uid = null;
    e = null;
    userId = null;
    ckInfo = null;
    auth = null;
    gtest = null;
    mysButton = null;
    ckUser = null;
    constructor(e) {
        if (e) {
            this.e = e;
            this.userId = String(e.user_id);
        }
        this.uid = '';
        this.ckInfo = {
            ck: '',
            uid: '',
            qq: '',
            ltuid: '',
            type: ''
        };
        this.ckUser = null;
        this.auth = [
            'dailyNote',
            'bbs_sign_info',
            'bbs_sign_home',
            'bbs_sign',
            'ys_ledger',
            'compute',
            'avatarSkill',
            'detail',
            'blueprint',
            'UserGame',
            'deckList',
            'avatar_cardList',
            'action_cardList',
            'avatarInfo'
        ];
        this.gtest = false;
        this.mysButton = segment.button([
            { text: '米游社', link: 'https://miyoushe.com' }
        ]);
    }
    static async init(e, api) {
        await MysInfo.initCache();
        let mysInfo = new MysInfo(e);
        let onlySelfCk = false;
        if (mysInfo.checkAuth(api)) {
            mysInfo.uid = await MysInfo.getSelfUid(e);
            onlySelfCk = true;
        }
        else {
            mysInfo.uid = await MysInfo.getUid(e);
        }
        if (!mysInfo.uid) {
            e.noTips = true;
            return false;
        }
        if (!['1', '2', '3', '5', '6', '7', '8', '18', '9'].includes(String(mysInfo.uid).slice(0, -8))) {
            return false;
        }
        if (!['6', '7', '8', '18', '9'].includes(String(mysInfo.uid).slice(0, -8)) &&
            api === 'useCdk') {
            e.reply('兑换码使用只支持国际服uid');
            return false;
        }
        mysInfo.e.uid = mysInfo.uid;
        await mysInfo.getCookie(e, onlySelfCk);
        await mysInfo.checkReply();
        return mysInfo;
    }
    static async getUid(e, matchMsgUid = true) {
        let user = await NoteUser.create(e);
        if (e.uid && matchMsgUid) {
            return user.autoRegUid(e.uid, e);
        }
        let { msg = '', at = '' } = e;
        if (!msg)
            return false;
        let uid;
        if (at) {
            let atUser = await NoteUser.create(at);
            uid = atUser.getUid(e);
            if (uid)
                return String(uid);
            if (e.noTips !== true) {
                e.reply([
                    '尚未绑定uid',
                    segment.button([{ text: '绑定UID', input: '#绑定uid' }])
                ], false, { at });
            }
            return false;
        }
        let matchUid = (msg = '') => {
            let ret = /([1-9]|18)[0-9]{8}/g.exec(msg);
            if (!ret)
                return false;
            return ret[0];
        };
        uid = matchUid(msg) || user.getUid(e) || matchUid(e.sender.card);
        if (!matchMsgUid)
            uid = user.getUid(e);
        if (uid) {
            return user.autoRegUid(uid, e);
        }
        if (e.noTips !== true) {
            e.reply([
                '请先#绑定uid',
                segment.button([{ text: '绑定UID', input: '#绑定uid' }])
            ], false, { at: at || true });
        }
        return false;
    }
    static async getSelfUid(e) {
        let { msg = '', at = '' } = e;
        if (!msg)
            return false;
        let user = await NoteUser.create(e);
        let selfUser = at ? await NoteUser.create(at) : user;
        if (!selfUser.hasCk) {
            if (e.noTips !== true) {
                e.reply([
                    '尚未绑定Cookie',
                    segment.button([
                        { text: 'Cookie帮助', callback: '#Cookie帮助' }
                    ])
                ], false, { at: selfUser.qq });
            }
            return false;
        }
        return selfUser.getUid(e);
    }
    static async get(e, api, data = {}, option = {}) {
        let mysInfo = await MysInfo.init(e, api);
        if (!mysInfo)
            return false;
        if (!mysInfo.uid || !mysInfo.ckInfo.ck)
            return false;
        e.uid = mysInfo.uid;
        let user = e.user?.getMysUser();
        let mysApi = new MysApi(mysInfo.uid, mysInfo.ckInfo.ck, option, e.isSr, user.device);
        let res;
        if (lodash.isObject(api)) {
            let all = [];
            await mysApi.getData('getFp');
            if (e.apiSync) {
                res = [];
                for (let i in api) {
                    res.push(await mysApi.getData(i, api[i]));
                }
            }
            else {
                lodash.forEach(api, (v, i) => {
                    all.push(mysApi.getData(i, v));
                });
                res = await Promise.all(all);
            }
            for (let i in res) {
                res[i] = await mysInfo.checkCode(res[i], res[i].api, mysApi, api[res[i].api]);
                mysInfo.gtest = true;
                if (res[i]?.retcode === 0)
                    continue;
                break;
            }
        }
        else {
            res = await mysApi.getData(api, data);
            res = await mysInfo.checkCode(res, api, mysApi, data);
        }
        return res;
    }
    static async initPubCk() {
        let pubCount = 0;
        let pubCks = gsCfg.getConfig('mys', 'pubCk') || [];
        for (let ck of pubCks) {
            let pubUser = await MysUser.create(ck);
            if (pubUser) {
                let ret = await pubUser.initCache();
                if (ret) {
                    pubCount++;
                }
                if (pubCount >= 20) {
                    break;
                }
            }
        }
        logger.mark(`加载公共ck：${pubCount}个`);
    }
    static async initUserCk() {
        let userCount = 0;
        await MysUser.forEach(async (mys) => {
            let ret = await mys.initCache();
            if (ret) {
                userCount++;
            }
        });
        logger.mark(`加载用户UID：${userCount}个，加入查询池`);
    }
    static initing = null;
    static async initCache(force = false, clearData = false) {
        const cache = DailyCache.create();
        if ((!force && (await cache.get('cache-ready'))) || this.initing)
            return true;
        this.initing = true;
        await DailyCache.clearOutdatedData();
        if (clearData)
            await MysUser.clearCache();
        await MysInfo.initUserCk();
        await MysInfo.initPubCk();
        await cache.set('cache-ready', Date.now());
        delete this.initing;
        return true;
    }
    static async getBingCkUid() {
        let res = await gsCfg.getBingCk();
        return { ...res.ck };
    }
    static async checkUidBing(uid, game = 'gs') {
        let ckUser = await MysUser.getByQueryUid(uid, game, true);
        if (ckUser && ckUser.ck) {
            return ckUser;
        }
        return false;
    }
    static async delDisable() {
        return await MysUser.delDisable();
    }
    checkAuth(api) {
        if (api === 'cookie') {
            return true;
        }
        if (lodash.isObject(api)) {
            for (let i in api) {
                if (this.auth.includes(i)) {
                    return true;
                }
            }
        }
        else if (this.auth.includes(api)) {
            return true;
        }
        return false;
    }
    async checkReply() {
        if (this.e.noTips === true)
            return;
        if (!this.uid) {
            this.e.reply([
                '请先#绑定uid',
                segment.button([{ text: '绑定UID', input: '#绑定uid' }])
            ], false, { at: true });
        }
        if (!this.ckInfo.ck) {
            this.e.reply([
                '暂无可用CK，请绑定更多用户或设置公共ck..',
                segment.button([{ text: 'Cookie帮助', callback: '#Cookie帮助' }])
            ]);
        }
        this.e.noTips = true;
    }
    async getCookie(game = 'gs', onlySelfCk = false) {
        if (this.ckUser?.ck)
            return this.ckUser?.ck;
        let mysUser = await MysUser.getByQueryUid(this.uid, game, onlySelfCk);
        if (mysUser) {
            if (mysUser.ck) {
                this.ckInfo = mysUser.getCkInfo(game);
                this.ckUser = mysUser;
                await mysUser.addQueryUid(this.uid, game);
            }
            else {
                await mysUser.disable(game);
                return onlySelfCk ? '' : await this.getCookie(game);
            }
        }
        return this.ckUser?.ck;
    }
    async checkCode(res, type, mysApi = {}, data = {}, isTask = false) {
        if (!res) {
            if (!isTask)
                this.e.reply([
                    `UID:${this.uid}，米游社接口请求失败，暂时无法查询`,
                    this.mysButton
                ]);
            return false;
        }
        res.retcode = Number(res.retcode);
        if (type === 'bbs_sign') {
            if ([-5003].includes(res.retcode)) {
                res.retcode = 0;
            }
        }
        switch (res.retcode) {
            case 0:
                break;
            case -1:
            case -100:
            case 1001:
            case 10001:
            case 10103:
                if (/(登录|login)/i.test(res.message)) {
                    if (this.ckInfo.uid) {
                        logger.mark(`[ck失效][uid:${this.uid}][qq:${this.userId}]`);
                        if (!isTask)
                            this.e.reply([
                                `UID:${this.ckInfo.uid}，米游社Cookie已失效`,
                                this.mysButton
                            ]);
                    }
                    else {
                        logger.mark(`[公共ck失效][ltuid:${this.ckInfo.ltuid}]`);
                        if (!isTask)
                            this.e.reply([
                                `UID:${this.uid}，米游社查询失败，请稍后再试`,
                                this.mysButton
                            ]);
                    }
                    if (!isTask)
                        await this.delCk();
                }
                else {
                    if (!isTask)
                        this.e.reply([
                            `UID:${this.uid}，米游社接口报错，暂时无法查询：${res.message}`,
                            this.mysButton
                        ]);
                }
                break;
            case 1008:
                if (!isTask)
                    this.e.reply([`UID:${this.uid}，请先去米游社绑定角色`, this.mysButton], false, { at: this.userId });
                break;
            case 10101:
                if (!isTask) {
                    await this.disableToday();
                    this.e.reply([`UID:${this.uid}，查询已达今日上限`, this.mysButton]);
                }
                break;
            case 10102:
                if (res.message === 'Data is not public for the user') {
                    if (!isTask)
                        this.e.reply([`\nUID:${this.uid}，米游社数据未公开`, this.mysButton], false, { at: this.userId });
                }
                else {
                    if (!isTask)
                        this.e.reply([
                            `UID:${this.uid}，请先去米游社绑定角色`,
                            this.mysButton
                        ]);
                }
                break;
            case -1002:
                if (res.api === 'detail')
                    res.retcode = 0;
                break;
            case 5003:
            case 10041:
                if (!isTask)
                    this.e.reply([
                        `UID:${this.uid}，米游社账号异常，暂时无法查询`,
                        this.mysButton
                    ]);
                break;
            case 1034:
            case 10035:
                let handler = this.e.runtime?.handler || {};
                if (handler.has('mys.req.err')) {
                    logger.mark(`[米游社查询][uid:${this.uid}][qq:${this.userId}] 遇到验证码，尝试调用 Handler mys.req.err`);
                    res =
                        (await handler.call('mys.req.err', this.e, {
                            mysApi,
                            type,
                            res,
                            data,
                            mysInfo: this
                        })) || res;
                }
                if (!res || res?.retcode == 1034) {
                    logger.mark(`[米游社查询失败][uid:${this.uid}][qq:${this.userId}] 遇到验证码`);
                    if (!isTask)
                        this.e.reply([
                            `UID:${this.uid}，米游社查询遇到验证码，请稍后再试`,
                            this.mysButton
                        ]);
                }
                break;
            case 10307:
                if (!isTask)
                    this.e.reply([
                        `UID:${this.uid}，版本更新期间，数据维护中`,
                        this.mysButton
                    ]);
                break;
            default:
                if (!isTask)
                    this.e.reply([
                        `UID:${this.uid}，米游社接口报错，暂时无法查询：${res.message || 'error'}`,
                        this.mysButton
                    ]);
                break;
        }
        if (res.retcode !== 0) {
            logger.mark(`[mys接口报错]${JSON.stringify(res)}，uid：${this.uid}`);
        }
        if (!isTask)
            await this.ckUser.addQueryUid(this.uid);
        return res;
    }
    async delCk() {
        if (!this.ckUser) {
            return false;
        }
        let ckUser = this.ckUser;
        await ckUser.delWithUser();
    }
    async disableToday(game = 'gs') {
        await this.ckUser.disable(game);
    }
}

export { MysInfo as default };
