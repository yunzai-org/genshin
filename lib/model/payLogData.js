import { puppeteer } from 'yunzai';
import fetch from 'node-fetch';
import moment from 'moment';
import fs from 'fs';
import base from './base.js';

if (!fs.existsSync('./data/payLog/')) {
    fs.mkdirSync('./data/payLog/');
}
class PayData {
    constructor(authKey = '') {
        this.#authkey = encodeURIComponent(authKey);
    }
    #genShinId = '';
    #oringinData = [];
    #authkey = '';
    async getOringinalData(id = '') {
        let res = await fetch(this.getUrl() + id, this.headers);
        let ret = await res.json();
        let check = this.checkResult(ret);
        if (check?.errorMsg)
            return check;
        let list = ret?.data?.list;
        if (!Array.isArray(list)) {
            console.error(ret);
            return { errorMsg: '获取失败，错误码：' + ret?.retcode };
        }
        if (list.length === 20) {
            this.#oringinData.push(...list);
            await this.getOringinalData(list[19].id);
            return true;
        }
        else {
            this.#oringinData.push(...list);
            return true;
        }
    }
    async getPrimogemLog(id = '') {
        let res = await fetch(this.getUrl('getPrimogemLog') + id, this.headers);
        let ret = await res.json();
        let check = this.checkResult(ret);
        if (check?.errorMsg)
            return check;
        let list = ret?.data?.list;
        if (!Array.isArray(list)) {
            console.error(ret);
            return { errorMsg: '获取失败，错误码：' + ret?.retcode };
        }
        if (list.length === 20) {
            list.forEach(v => {
                if (v.add_num === '680')
                    this.#oringinData.push(v);
            });
            await this.getPrimogemLog(list[19].id);
            return true;
        }
        else {
            list.forEach(v => {
                if (v.add_num === '680')
                    this.#oringinData.push(v);
            });
            return true;
        }
    }
    async getUserInfo() {
        let res = await fetch(this.getUrl('getUserInfo'), this.headers);
        let ret = await res.json();
        let check = this.checkResult(ret);
        if (check?.errorMsg)
            return check;
        let data = ret?.data;
        if (data?.uid) {
            return data;
        }
        return { errorMsg: '获取失败，可能是链接已过期或不正确' };
    }
    checkResult(ret) {
        if (ret?.retcode === -101 || ret?.retcode === -100) {
            return ret.retcode === -101
                ? { errorMsg: '您的链接过期，请重新获取' }
                : { errorMsg: '链接不正确，请重新获取' };
        }
        if (/unknown auth appid/.test(ret?.message)) {
            return {
                errorMsg: '抽卡或其他链接现已无法获取充值记录，请发送客服页面的链接！'
            };
        }
        return { errorMsg: '' };
    }
    async filtrateData() {
        const userInfo = await this.getUserInfo();
        if (userInfo?.errorMsg)
            return userInfo;
        this.#genShinId = userInfo.uid;
        let isSucceed = await this.getOringinalData();
        if (isSucceed?.errorMsg)
            return isSucceed;
        await this.getPrimogemLog();
        if (this.#oringinData.length === 0) {
            return { errorMsg: '未获取到您的任何充值数据' };
        }
        this.#oringinData = this.#oringinData.sort((a, b) => {
            let val1 = Number(a.id);
            let val2 = Number(b.id);
            if (val2 > val1) {
                return -1;
            }
            else {
                return 1;
            }
        });
        const price = [680, 300, 8080, 3880, 2240, 1090, 330, 60];
        const doublePrice = [0, 0, 12960, 6560, 3960, 1960, 600, 120];
        let month = 0;
        let sum = 0;
        let i = -1;
        let listIndex = 0;
        let list = [];
        for (let index = 0; index < this.#oringinData.length; index++) {
            let num = Number(this.#oringinData[index].add_num);
            if (num < 0)
                continue;
            let thisMonth = ++moment(this.#oringinData[index].datetime).toArray()[1];
            if (thisMonth !== month) {
                i++;
                month = thisMonth;
                list[listIndex++] = {
                    month: thisMonth + '月',
                    payNum: [0, 0, 0, 0, 0, 0, 0, 0]
                };
            }
            else if (!i) {
                list[i] = {
                    month: thisMonth + '月',
                    payNum: [0, 0, 0, 0, 0, 0, 0, 0]
                };
            }
            for (let index = 0; index < 8; index++) {
                if (num === price[index] || num === doublePrice[index]) {
                    list[i].payNum[index]++;
                    if (num !== 680)
                        sum += num;
                    break;
                }
            }
        }
        return {
            uid: this.#genShinId,
            crystal: sum,
            monthData: list
        };
    }
    headers = {
        headers: {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site'
        },
        referrer: 'https://webstatic.mihoyo.com/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    };
    getUrl(api = 'getCrystalLog') {
        const baseUrl = 'https://hk4e-api.mihoyo.com/common/hk4e_self_help_query/User';
        const isUserInfo = api === 'getUserInfo', isCrystalLog = api === 'getCrystalLog';
        const url = isUserInfo
            ? '/GetUserInfo'
            : isCrystalLog
                ? '/GetCrystalLog'
                : '/GetPrimogemLog';
        let params = '';
        params += '?selfquery_type=1';
        params += '&sign_type=2';
        params += '&auth_appid=csc';
        params += '&authkey_ver=1';
        params += '&game_biz=hk4e_cn';
        params += '&win_direction=portrait';
        params += '&bbs_auth_required=true';
        params += '&bbs_game_role_required=hk4e_cn';
        params += '&app_client=bbs';
        params += '&lang=zh-cn';
        params += '&csc_authkey_required=true';
        params += '&authkey=' + this.#authkey;
        params += '&page_id=1';
        if (!isUserInfo) {
            params += '&add_type=produce';
            params += '&size=20';
            params += '&end_id=';
        }
        return baseUrl + url + params;
    }
}
class HtmlData extends base {
    constructor(data = {}) {
        super();
        this.monthData = data.monthData;
        this.crystal = data.crystal;
        this.uid = data.uid;
        this.model = 'payLog';
    }
    crystal = 0;
    uid = '';
    monthData = [];
    price = [68, 30, 648, 328, 198, 98, 30, 6];
    getBarData() {
        return this.monthData.map(v => {
            return {
                type: v.month,
                sales: v.payNum.reduce((sum, val, index) => sum + val * this.price[index], 0)
            };
        });
    }
    getTopData(crystal = 0) {
        const maxMonth = this.maxcConsumption();
        const sum = this.sumConsumption();
        return [
            {
                title: '总消费',
                value: '￥' + this.getBarData().reduce((sum, val) => sum + val.sales, 0)
            },
            {
                title: '总结晶',
                value: this.crystal
            },
            {
                title: '消费最多',
                value: maxMonth.type
            },
            {
                title: maxMonth.type + '消费',
                value: '￥' + maxMonth.sales
            },
            ...sum
        ];
    }
    getPieData() {
        const data = this.sumConsumption();
        let pieData = [];
        data.forEach((val, index) => {
            let value = val.value * this.price[index];
            if (value) {
                pieData.push({
                    value,
                    name: val.title
                });
            }
        });
        return pieData;
    }
    maxcConsumption() {
        return this.getBarData().sort((a, b) => {
            if (a.sales < b.sales) {
                return 1;
            }
            else {
                return -1;
            }
        })[0];
    }
    sumConsumption() {
        let sum = {
            小月卡: 0,
            大月卡: 0,
            648: 0,
            328: 0,
            198: 0,
            98: 0,
            30: 0,
            6: 0
        };
        let k = Object.keys(sum).reverse();
        this.monthData.forEach(val => {
            val.payNum.forEach((v, i) => {
                sum[k[i]] += v;
            });
        });
        let value = Object.values(sum).reverse();
        return k.map((val, index) => {
            return {
                title: val,
                value: value[index]
            };
        });
    }
}
async function renderImg(data) {
    const htmlData = new HtmlData(data);
    const imgDatas = {
        ...htmlData.screenData,
        topData: htmlData.getTopData(),
        barData: JSON.stringify(htmlData.getBarData()),
        pieData: JSON.stringify(htmlData.getPieData()),
        saveId: htmlData.uid,
        uid: htmlData.uid
    };
    let img = await puppeteer.screenshot('payLog', imgDatas);
    return img;
}

export { HtmlData, PayData, renderImg };
