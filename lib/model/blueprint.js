import base from './base.js';
import { MysApi } from 'yunzai-mys';
import MysInfo from './mys/mysInfo.js';

class blueprint extends base {
    constructor(e) {
        super(e);
    }
    mysApi;
    model = 'blueprint';
    checkMsg = '设置尘歌壶模数有误\n指令：#尘歌壶模数\n示例：#尘歌壶模数123456\n参数为模数id(10-15位数字)';
    async get(role) {
        let uid = await MysInfo.getUid(this.e, false);
        if (!uid)
            return false;
        let ck = await MysInfo.checkUidBing(uid, this.e);
        if (!ck) {
            await this.e.reply(MysInfo.tips);
            return false;
        }
        this.mysApi = new MysApi(ck.uid, ck.ck, { log: true });
        let blueprint = await this.mysApi.getData('blueprint', {
            share_code: role,
            headers: 'https://webstatic.mihoyo.com/ys/event/e20200923adopt_calculator/index.html?bbs_presentation_style=fullscreen&bbs_auth_required=true&mys_source=GameRecord'
        });
        let body = await this.getBody(blueprint);
        if (!body)
            return false;
        let computes = await this.computes(body);
        if (!computes)
            return false;
        return {
            saveId: uid,
            uid,
            share_code: role[0],
            blueprint,
            computes,
            ...this.screenData
        };
    }
    async getBody(data) {
        if (!data?.data?.list?.length)
            return false;
        let newData = [];
        for (let item of data?.data?.list) {
            newData.push({
                cnt: item.num * 1,
                id: item.id * 1
            });
        }
        return { list: newData };
    }
    async computes(body) {
        let computes = await this.mysApi.getData('blueprintCompute', { body });
        if (!computes || computes.retcode !== 0)
            return false;
        computes = computes.data?.list;
        return computes;
    }
}

export { blueprint as default };
