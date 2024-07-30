import base from './base.js';
import { GSCfg } from 'yunzai-mys';
import lodash from 'lodash';
import moment from 'moment';
import { Character, Weapon } from '../miao.js';

class GachaData extends base {
    constructor(e) {
        super(e);
        this.model = 'gacha';
        this.pool = {};
        this.def = GSCfg.getdefSet('gacha', 'gacha');
        this.set = GSCfg.getGachaSet(this.e.group_id);
        this.ele = GSCfg.element;
        this.type = 'role';
        this.res = [];
        this.fiveHave = [];
        this.fourHave = [];
    }
    static async init(e) {
        let gacha = new GachaData(e);
        gacha.getTpye();
        await gacha.userData();
        await gacha.getPool();
        return gacha;
    }
    static getImg(name, type = 'role') {
        if (type === 'role' || type === '角色') {
            let char = Character.get(name);
            return char?.imgs?.gacha || '';
        }
        else if (type === 'weapon' || type === '武器') {
            let weapon = Weapon.get(name);
            return weapon?.imgs?.gacha || '';
        }
    }
    async run() {
        let list = this.lottery();
        let data = {
            name: this.e.sender.card,
            quality: 80,
            ...this.screenData,
            ...this.lotteryInfo(),
            list
        };
        return data;
    }
    get key() {
        if (this.e.isGroup) {
            return `${this.prefix}${this.e.group_id}:${this.userId}`;
        }
        else {
            return `${this.prefix}private:${this.userId}`;
        }
    }
    getTpye() {
        if (this.e.msg.includes('2'))
            this.role2 = true;
        if (this.e.msg.includes('武器'))
            this.type = 'weapon';
        if (this.e.msg.includes('常驻'))
            this.type = 'permanent';
    }
    async getPool() {
        let poolArr = GSCfg.getdefSet('gacha', 'pool');
        poolArr = [...poolArr].reverse();
        let NowPool = poolArr.find(val => new Date().getTime() <= new Date(val.endTime).getTime()) || poolArr.pop();
        this.NowPool = NowPool;
        if (this.type == 'weapon') {
            let weapon4 = lodash.difference(this.def.weapon4, NowPool.weapon4);
            let weapon5 = lodash.difference(this.def.weapon5, NowPool.weapon5);
            this.pool = {
                up4: NowPool.weapon4,
                role4: this.def.role4,
                weapon4,
                up5: NowPool.weapon5,
                five: weapon5
            };
        }
        if (this.type == 'role') {
            let role4 = lodash.difference(this.def.role4, NowPool.up4);
            let role5 = lodash.difference(this.def.role5, NowPool.up5);
            let up5 = NowPool.up5;
            if (this.role2)
                up5 = NowPool.up5_2;
            this.pool = {
                up4: NowPool.up4,
                role4,
                weapon4: this.def.weapon4,
                up5,
                five: role5
            };
        }
        if (this.type == 'permanent') {
            this.pool = {
                up4: [],
                role4: this.def.role4,
                weapon4: this.def.weapon4,
                up5: [],
                five: this.def.role5,
                fiveW: this.def.weapon5
            };
        }
        this.pool.weapon3 = this.def.weapon3;
    }
    async userData() {
        if (this.user)
            return this.user;
        let user = await redis.get(this.key);
        if (user) {
            user = JSON.parse(user);
            if (this.getNow() > user.today.expire) {
                user.today = {
                    star: [],
                    expire: this.getEnd().end4,
                    num: 0,
                    weaponNum: 0
                };
            }
            if (this.getNow() > user.week.expire) {
                user.week = { num: 0, expire: this.getWeekEnd() };
            }
        }
        else {
            let commom = { num4: 0, isUp4: 0, num5: 0, isUp5: 0 };
            user = {
                permanent: commom,
                role: commom,
                weapon: {
                    ...commom,
                    lifeNum: 0,
                    type: 1
                },
                today: { star: [], expire: this.getEnd().end4, num: 0, weaponNum: 0 },
                week: { num: 0, expire: this.getWeekEnd() }
            };
        }
        this.user = user;
        return user;
    }
    lottery(save = true) {
        for (let i = 1; i <= 10; i++) {
            this.index = i;
            if (this.type == 'weapon') {
                this.user.today.weaponNum++;
            }
            else {
                this.user.today.num++;
            }
            if (this.lottery5())
                continue;
            if (this.lottery4())
                continue;
            this.lottery3();
        }
        if (save)
            this.saveUser();
        this.res = lodash.orderBy(this.res, ['star', 'type', 'have', 'index'], ['desc', 'asc', 'asc', 'asc']);
        return this.res;
    }
    lottery5() {
        let isBigUP = false;
        let isBing = false;
        let tmpChance5 = this.probability();
        let type = this.type;
        if (lodash.random(1, 10000) > tmpChance5) {
            this.user[this.type].num5++;
            return false;
        }
        let nowCardNum = this.user[this.type].num5 + 1;
        this.user[this.type].num5 = 0;
        this.user[this.type].num4++;
        let tmpUp = this.def.wai;
        if (this.user[this.type].isUp5 == 1) {
            tmpUp = 101;
        }
        if (this.type == 'permanent')
            tmpUp = 0;
        let tmpName = '';
        if (this.type == 'weapon' && this.user[this.type].lifeNum >= 2) {
            tmpName = this.getBingWeapon();
            this.user[this.type].lifeNum = 0;
            isBing = true;
        }
        else if (lodash.random(1, 100) <= tmpUp) {
            if (this.user[this.type].isUp5 == 1)
                isBigUP = true;
            this.user[this.type].isUp5 = 0;
            tmpName = lodash.sample(this.pool.up5);
            if (tmpName == this.getBingWeapon()) {
                this.user[this.type].lifeNum = 0;
            }
        }
        else {
            if (this.type == 'permanent') {
                if (lodash.random(1, 100) <= 50) {
                    tmpName = lodash.sample(this.pool.five);
                    type = 'role';
                }
                else {
                    tmpName = lodash.sample(this.pool.fiveW);
                    type = 'weapon';
                }
            }
            else {
                this.user[this.type].isUp5 = 1;
                tmpName = lodash.sample(this.pool.five);
            }
        }
        if (tmpName != this.getBingWeapon()) {
            this.user[this.type].lifeNum++;
        }
        this.user.today.star.push({ name: tmpName, num: nowCardNum });
        this.user.week.num++;
        let have = false;
        if (this.fiveHave.includes(tmpName)) {
            have = true;
        }
        else {
            this.fiveHave.push(tmpName);
        }
        this.res.push({
            name: tmpName,
            star: 5,
            type,
            num: nowCardNum,
            element: this.ele[tmpName] || '',
            index: this.index,
            isBigUP,
            isBing,
            have,
            imgFile: GachaData.getImg(tmpName, type),
            rand: lodash.random(1, 7)
        });
        return true;
    }
    lottery4() {
        let tmpChance4 = this.def.chance4;
        if (this.user[this.type].num4 >= 9) {
            tmpChance4 += 10000;
        }
        else if (this.user[this.type].num4 >= 5) {
            tmpChance4 = tmpChance4 + Math.pow(this.user[this.type].num4 - 4, 2) * 500;
        }
        if (lodash.random(1, 10000) > tmpChance4) {
            this.user[this.type].num4++;
            return false;
        }
        this.user[this.type].num4 = 0;
        let tmpUp = 50;
        if (this.type == 'weapon')
            tmpUp = 75;
        if (this.user[this.type].isUp4 == 1) {
            this.user[this.type].isUp4 = 0;
            tmpUp = 100;
        }
        if (this.type == 'permanent')
            tmpUp = 0;
        let type = 'role';
        let tmpName = '';
        if (lodash.random(1, 100) <= tmpUp) {
            tmpName = lodash.sample(this.pool.up4);
            type = this.type;
        }
        else {
            this.user[this.type].isUp4 = 1;
            if (lodash.random(1, 100) <= 50) {
                tmpName = lodash.sample(this.pool.role4);
                type = 'role';
            }
            else {
                tmpName = lodash.sample(this.pool.weapon4);
                type = 'weapon';
            }
        }
        let have = false;
        if (this.fourHave.includes(tmpName)) {
            have = true;
        }
        else {
            this.fourHave.push(tmpName);
        }
        this.res.push({
            name: tmpName,
            star: 4,
            type,
            element: this.ele[tmpName] || '',
            index: this.index,
            imgFile: GachaData.getImg(tmpName, type),
            have
        });
        return true;
    }
    lottery3() {
        let tmpName = lodash.sample(this.pool.weapon3);
        this.res.push({
            name: tmpName,
            star: 3,
            type: 'weapon',
            element: this.ele[tmpName] || '',
            index: this.index,
            imgFile: GachaData.getImg(tmpName, 'weapon')
        });
        return true;
    }
    probability() {
        let tmpChance5 = this.def.chance5;
        if (this.type == 'role' || this.type == 'permanent') {
            if (this.user.week.num == 1) {
                tmpChance5 *= 2;
            }
            if (this.user[this.type].num5 >= 90) {
                tmpChance5 = 10000;
            }
            else if (this.user[this.type].num5 >= 74) {
                tmpChance5 = 590 + (this.user[this.type].num5 - 74) * 530;
            }
            else if (this.user[this.type].num5 >= 60) {
                tmpChance5 = this.def.chance5 + (this.user[this.type].num5 - 50) * 40;
            }
        }
        if (this.type == 'weapon') {
            tmpChance5 = this.def.chanceW5;
            if (this.user.week.num == 1) {
                tmpChance5 = tmpChance5 * 3;
            }
            if (this.user[this.type].num5 >= 80) {
                tmpChance5 = 10000;
            }
            else if (this.user[this.type].num5 >= 62) {
                tmpChance5 = tmpChance5 + (this.user[this.type].num5 - 61) * 700;
            }
            else if (this.user[this.type].num5 >= 45) {
                tmpChance5 = tmpChance5 + (this.user[this.type].num5 - 45) * 60;
            }
            else if (this.user[this.type].num5 >= 10 &&
                this.user[this.type].num5 <= 20) {
                tmpChance5 = tmpChance5 + (this.user[this.type].num5 - 10) * 30;
            }
        }
        return tmpChance5;
    }
    getBingWeapon(sortName = false) {
        if (this.type != 'weapon')
            return false;
        let name = this.pool.up5[this.user[this.type].type - 1];
        if (sortName)
            name = GSCfg.shortName(name, true);
        return name;
    }
    lotteryInfo() {
        let info = `累计「${this.user[this.type].num5}抽」`;
        let nowFive = 0;
        let nowFour = 0;
        this.res.forEach((v, i) => {
            if (v.star == 5) {
                nowFive++;
                if (v.type == 'role') {
                    let char = Character.get(v.name);
                    info = char?.abbr || '';
                }
                else {
                    let weapon = Weapon.get(v.name);
                    info = weapon.abbr || '';
                }
                info += `「${v.num}抽」`;
                if (v.isBigUP)
                    info += '大保底';
                if (v.isBing)
                    info += '定轨';
            }
            if (v.star == 4) {
                nowFour++;
            }
        });
        let poolName = `角色池：${GSCfg.shortName(this.pool.up5[0])}`;
        if (this.type == 'permanent')
            poolName = '常驻池';
        let res = {
            info,
            nowFive,
            nowFour,
            poolName,
            isWeapon: this.type == 'weapon',
            bingWeapon: this.getBingWeapon(true),
            lifeNum: this.user[this.type]?.lifeNum || 0
        };
        logger.debug(`[${poolName}] [五星数：${nowFive}] [${info}] [定轨：${res.lifeNum}]`);
        return res;
    }
    async saveUser() {
        this.user.today.expire = this.getEnd().end4;
        await redis.setEx(this.key, 3600 * 24 * 14, JSON.stringify(this.user));
    }
    getNow() {
        return moment().format('X');
    }
    getEnd() {
        let end = moment().endOf('day').format('X');
        let end4 = 3600 * 4;
        if (moment().format('k') < 4) {
            end4 += Number(moment().startOf('day').format('X'));
        }
        else {
            end4 += Number(end);
        }
        return { end, end4 };
    }
    getWeekEnd() {
        return Number(moment().day(7).endOf('day').format('X'));
    }
}

export { GachaData as default };
