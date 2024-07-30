import { Plugin } from 'yunzai';
import fs from 'node:fs';
import { GSCfg } from 'yunzai-mys';
import RoleIndex from '../model/roleIndex.js';
import Abyss from '../model/abyss.js';
import WeaponModel from '../model/weapon.js';

class role extends Plugin {
    constructor() {
        super({
            name: '角色查询',
            priority: 200,
            rule: [
                {
                    reg: '^(#*角色3|#*角色卡片|角色)$',
                    fnc: 'roleCard'
                },
                {
                    reg: '^#[上期|往期|本期]*(深渊|深境|深境螺旋)[上期|往期|本期]*[ |0-9]*$',
                    fnc: 'abyss'
                },
                {
                    reg: '^#*[上期|往期|本期]*(深渊|深境|深境螺旋)[上期|往期|本期]*[第]*(9|10|11|12|九|十|十一|十二)层[ |0-9]*$',
                    fnc: 'abyssFloor'
                },
                {
                    reg: '^#[五星|四星|5星|4星]*武器[ |0-9]*$',
                    fnc: 'weapon'
                },
                {
                    reg: '^#(宝箱|成就|尘歌壶|家园|探索|探险|声望|探险度|探索度)[ |0-9]*$',
                    fnc: 'roleExplore'
                }
            ]
        });
    }
    prefix;
    get button() {
        this.prefix = this.e?.isSr ? '*' : '#';
        return global.segment.button([
            { text: '角色', callback: `${this.prefix}角色` },
            { text: '探索', callback: `${this.prefix}探索` },
            { text: '武器', callback: `${this.prefix}武器` },
            { text: '深渊', callback: `${this.prefix}深渊` }
        ]);
    }
    async init() {
        let pubCk = './plugins/genshin/config/mys.pubCk.yaml';
        if (!fs.existsSync(pubCk)) {
            fs.copyFileSync('./plugins/genshin/defSet/mys/pubCk.yaml', pubCk);
        }
        let set = './plugins/genshin/config/mys.set.yaml';
        if (!fs.existsSync(set)) {
            fs.copyFileSync('./plugins/genshin/defSet/mys/set.yaml', set);
        }
    }
    accept() {
        if (!this.e.msg)
            return;
        if (!/^#(.*)$/.test(this.e.msg))
            return;
        let role = GSCfg.getRole(this.e.msg);
        if (role) {
            this.e.msg = '#角色详情';
            if (role.uid)
                this.e.msg += role.uid;
            this.e.roleId = role.roleId;
            this.e.roleName = role.alias;
            return true;
        }
    }
    async abyss() {
        let data = await new Abyss(this.e).getAbyss();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', 'html/abyss/abyss', data, {
                retType: 'base64'
            }),
            this.button
        ]);
    }
    async abyssFloor() {
        let data = await new Abyss(this.e).getAbyssFloor();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', 'html/abyss/abyss-floor', data, {
                retType: 'base64'
            }),
            this.button
        ]);
    }
    async weapon() {
        let data = await WeaponModel.get(this.e);
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', 'html/avatar/weapon', data, {
                retType: 'base64'
            }),
            this.button
        ]);
    }
    async roleCard() {
        let data = await new RoleIndex(this.e).roleCard();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', 'html/player/role-card', data, {
                retType: 'base64'
            }),
            this.button
        ]);
    }
    async roleExplore() {
        let data = await new RoleIndex(this.e).roleExplore();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', 'html/player/role-explore', data, {
                retType: 'base64'
            }),
            this.button
        ]);
    }
}

export { role };
