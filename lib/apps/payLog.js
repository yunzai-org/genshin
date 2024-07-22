import { plugin } from 'yunzai';
import { renderImg, PayData } from '../model/payLogData.js';
import { NoteUser } from 'yunzai-mys';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

class payLog extends plugin {
    dirPath = path.resolve('./data/payLog/');
    authKey = '';
    constructor() {
        super({
            priority: 299,
            rule: [
                {
                    reg: '^#?(充值|消费)(记录|统计)$',
                    fnc: 'payLog'
                },
                {
                    reg: '^#?更新(充值|消费)(记录|统计)$',
                    fnc: 'updatePayLog'
                },
                {
                    reg: '(.*)(user-game-search|bill-record-user|customer-claim|player-log|user.mihoyo.com)(.*)',
                    fnc: 'getAuthKey'
                },
                {
                    reg: '^#?(充值|消费)(记录|统计)帮助$',
                    fnc: 'payLogHelp'
                }
            ]
        });
    }
    async payLog(e) {
        if (!fs.readdirSync(this.dirPath, 'utf-8').includes(e.user_id + '.yaml')) {
            await this.updatePayLog();
            return true;
        }
        const mainUid = await this.isMain(e.user_id);
        let data = fs.readFileSync(this.dirPath + `/${e.user_id}.yaml`, 'utf-8');
        data = YAML.parse(data);
        if (!mainUid) {
            let key = Object.keys(data);
            let img = await renderImg(data[key[0]]);
            this.reply(img);
            return true;
        }
        if (data[mainUid]) {
            let img = await renderImg(data[mainUid]);
            this.reply(img);
            return true;
        }
        else {
            this.reply('当前绑定的uid未获取数据，请私聊获取');
            return false;
        }
    }
    async getAuthKey() {
        if (this.e.isGroup) {
            return false;
        }
        if (!this.e.msg.includes('authkey')) {
            this.reply('链接无效,请重新发送');
            return false;
        }
        let match = this.e.msg.match(/&authkey=([^&\s\u4e00-\u9fa5]+)/);
        if (!match) {
            this.reply('链接无效,请重新发送');
            return false;
        }
        this.authKey = decodeURIComponent(match[1]);
        this.reply('正在获取消费数据,可能需要30s~~');
        let data = new PayData(this.authKey);
        let imgData = await data.filtrateData();
        if (imgData?.errorMsg) {
            this.reply(imgData?.errorMsg);
            return true;
        }
        let img = await renderImg(imgData);
        this.reply(img);
        await this.writeData(imgData);
        await redis.setEx(`Yz:genshin:mys:qq-uid:${this.e.user_id}`, 3600 * 24 * 30, imgData.uid);
        await redis.setEx(`Yz:genshin:payLog:${imgData.uid}`, 3600 * 24, this.authKey);
        return true;
    }
    async updatePayLog(e) {
        let uid = await redis.get(`Yz:genshin:mys:qq-uid:${this.e.user_id}`);
        if (uid) {
            let mainUid = await this.isMain(this.e.user_id);
            if (mainUid)
                uid = mainUid;
            this.authKey =
                (await redis.get(`Yz:genshin:payLog:${uid}`)) ||
                    (await redis.get(`Yz:genshin:gachaLog:url:${uid}`));
            if (this.authKey) {
                this.reply('正在获取数据,可能需要30s');
                let imgData = await new PayData(this.authKey).filtrateData();
                if (imgData?.errorMsg) {
                    this.reply(imgData.errorMsg);
                }
                else {
                    let img = await renderImg(imgData);
                    this.reply(img);
                    await this.writeData(imgData);
                }
                return true;
            }
            else {
                this.reply([
                    '请私聊发送米游社链接，可以发送【#充值统计帮助】查看链接教程',
                    segment.button([{ text: '充值帮助', callback: '#充值统计帮助' }])
                ]);
            }
        }
        else {
            this.reply([
                '请私聊发送米游社链接，可以发送【#充值统计帮助】查看链接教程',
                segment.button([{ text: '充值帮助', callback: '#充值统计帮助' }])
            ]);
        }
        return true;
    }
    payLogHelp(e) {
        e.reply('安卓教程： https://b23.tv/K5qfLad\n苹果用户可【先】发送最新获取的抽卡记录链接，【再】发送【#充值记录】或【#更新充值统计】来获取（注：通过抽卡链接获取充值记录大概率已失效）');
    }
    async isMain(id, game = 'gs') {
        let user = await NoteUser.create(id);
        return user.getCkUid(game);
    }
    async writeData(imgData) {
        let userPath = this.dirPath + '/' + this.e.user_id + '.yaml';
        if (fs.readdirSync(this.dirPath).includes(`${this.e.user_id}.yaml`)) {
            let data = fs.readFileSync(userPath, 'utf-8');
            data = YAML.parse(data);
            data[imgData.uid] = imgData;
            fs.writeFileSync(userPath, YAML.stringify(data), 'utf-8');
        }
        else {
            let data = {};
            data[imgData.uid] = imgData;
            fs.writeFileSync(userPath, YAML.stringify(data), 'utf-8');
        }
    }
}

export { payLog };
