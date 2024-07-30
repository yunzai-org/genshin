import { Plugin, downFile } from 'yunzai';
import { GSCfg } from 'yunzai-mys';
import lodash from 'lodash';
import fs from 'node:fs';
import fetch from 'node-fetch';

GSCfg.cpCfg('mys', 'set');
class strategy extends Plugin {
    path = './temp/strategy';
    url = 'https://bbs-api.mihoyo.com/post/wapi/getPostFullInCollection?&gids=2&order_type=2&collection_id=';
    collection_id = [
        [],
        [2319292, 2319293, 2319295, 2319296, 2319299, 2319294, 2319298],
        [813033],
        [341284],
        [341523],
        [1582613],
        [22148],
        [1812949]
    ];
    source = [
        '西风驿站',
        '原神观测枢',
        '派蒙喵喵屋',
        'OH是姜姜呀',
        '曉K',
        '坤易',
        '婧枫赛赛'
    ];
    oss = '?x-oss-process=image//resize,s_1200/quality,q_90/auto-orient,0/interlace,1/format,jpg';
    constructor() {
        super({
            name: '米游社攻略',
            priority: 50,
            rule: [
                {
                    reg: '^#?(更新)?\\S+攻略([1-7])?$',
                    fnc: 'strategy'
                },
                {
                    reg: '^#?攻略(说明|帮助)?$',
                    fnc: 'strategy_help'
                },
                {
                    reg: '^#?设置默认攻略([1-7])?$',
                    fnc: 'strategy_setting'
                }
            ]
        });
        this.set = GSCfg.getConfig('mys', 'set');
    }
    set = null;
    async init() {
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.path);
        }
        for (let subId of [1, 2, 3, 4, 5, 6, 7]) {
            let path = this.path + '/' + subId;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
        }
    }
    async strategy() {
        let match = /^#?(更新)?(\S+)攻略([1-7])?$/.exec(this.e.msg);
        let isUpdate = !!match[1];
        let roleName = match[2];
        let group = match[3] ? match[3] : this.set.defaultSource;
        let role = GSCfg.getRole(roleName);
        if (!role)
            return false;
        if (['10000005', '10000007', '20000000'].includes(String(role.roleId))) {
            let travelers = ['风主', '岩主', '雷主', '草主', '水主'];
            if (!travelers.includes(role.alias)) {
                let msg = '请选择：';
                for (let sub of travelers) {
                    msg += `${sub}攻略${group}、`;
                }
                msg = msg.substring(0, msg.lastIndexOf('、'));
                await this.e.reply(msg);
                return;
            }
            else {
                role.name = role.alias;
            }
        }
        this.sfPath = `${this.path}/${group}/${role.name}.jpg`;
        let button = [];
        for (const i of [1, 2, 3, 4, 5, 6, 7])
            button.push({ text: String(i), callback: `#${role.name}攻略${i}` });
        button = segment.button(button);
        if (fs.existsSync(this.sfPath) && !isUpdate) {
            await this.e.reply([segment.image(`file://${this.sfPath}`), button]);
            return;
        }
        if (await this.getImg(role.name, group)) {
            await this.e.reply([segment.image(`file://${this.sfPath}`), button]);
        }
    }
    async strategy_help() {
        await this.e.reply('攻略帮助:\n#心海攻略[1234567]\n#更新早柚攻略[1234567]\n#设置默认攻略[1234567]\n示例: 心海攻略4\n\n攻略来源:\n1——西风驿站\n2——原神观测枢\n3——派蒙喵喵屋\n4——OH是姜姜呀\n5——曉K\n6——坤易\n7——婧枫赛赛(角色配队一图流)');
    }
    async strategy_setting() {
        let match = /^#?设置默认攻略([1-7])?$/.exec(this.e.msg);
        let set = './plugins/genshin/config/mys.set.yaml';
        let config = fs.readFileSync(set, 'utf8');
        let num = Number(match[1]);
        if (isNaN(num)) {
            await this.e.reply('默认攻略设置方式为: \n#设置默认攻略[1234567] \n 请增加数字1-7其中一个');
            return;
        }
        config = config.replace(/defaultSource: [1-7]/g, 'defaultSource: ' + num);
        fs.writeFileSync(set, config, 'utf8');
        await this.e.reply('默认攻略已设置为: ' + match[1]);
    }
    async getImg(name, group) {
        let msyRes = [];
        this.collection_id[group].forEach(id => msyRes.push(this.getData(this.url + id)));
        try {
            msyRes = await Promise.all(msyRes);
        }
        catch (error) {
            this.e.reply('暂无攻略数据，请稍后再试');
            logger.error(`米游社接口报错：${error}}`);
            return false;
        }
        let posts = lodash.flatten(lodash.map(msyRes, item => item.data.posts));
        let url;
        for (let val of posts) {
            if (group == 4) {
                if (val.post.structured_content.includes(name + '】')) {
                    let content = val.post.structured_content.replace(/\\\/\{\}/g, '');
                    let pattern = new RegExp(name + '】.*?image\\\\?":\\\\?"(.*?)\\\\?"');
                    let imgId = pattern.exec(content)[1];
                    for (let image of val.image_list) {
                        if (image.image_id == imgId) {
                            url = image.url;
                            break;
                        }
                    }
                    break;
                }
            }
            else {
                if (val.post.subject.includes(name)) {
                    let max = 0;
                    val.image_list.forEach((v, i) => {
                        if (Number(v.size) >= Number(val.image_list[max].size))
                            max = i;
                    });
                    url = val.image_list[max].url;
                    break;
                }
            }
        }
        if (!url) {
            this.e.reply([
                `暂无${name}攻略（${this.source[group - 1]}）\n请尝试其他的攻略来源查询\n#攻略帮助，查看说明`,
                segment.button([{ text: '攻略帮助', callback: '#攻略帮助' }])
            ]);
            return false;
        }
        logger.mark(`${this.e.logFnc} 下载${name}攻略图`);
        if (!(await downFile(url + this.oss, this.sfPath))) {
            return false;
        }
        logger.mark(`${this.e.logFnc} 下载${name}攻略成功`);
        return true;
    }
    async getData(url) {
        let response = await fetch(url, { method: 'get' });
        if (!response.ok) {
            return false;
        }
        const res = await response.json();
        return res;
    }
}

export { strategy };
