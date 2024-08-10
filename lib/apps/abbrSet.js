import { GSCfg } from 'yunzai-mys';
import fs, { mkdirSync } from 'node:fs';
import { Plugin, makeForwardMsg } from 'yunzai';
import YAML from 'yaml';
import lodash from 'lodash';
import { dirname } from 'node:path';

const file = './plugins/genshin/config/role.name.yaml';
const str = `神里绫华:
- 龟龟
- 小乌龟`;
if (!fs.existsSync(file)) {
    mkdirSync(dirname(file));
    fs.writeFileSync(file, str);
}
class abbrSet extends Plugin {
    constructor() {
        super();
        this.name = '别名设置';
        this.priority = 600;
        this.rule = [
            {
                reg: '^#(星铁)?(设置|配置)(.*)(别名|昵称)$',
                fnc: 'abbr'
            },
            {
                reg: '^#(星铁)?删除(别名|昵称)(.*)$',
                fnc: 'delAbbr'
            },
            {
                reg: '^#(星铁)?(.*)(别名|昵称)$',
                fnc: 'abbrList'
            }
        ];
    }
    isSr = false;
    async abbr() {
        if (!(await this.checkAuth()))
            return;
        let role = GSCfg.getRole(this.e.msg, '#|星铁|设置|配置|别名|昵称', this.e.isSr);
        if (!role)
            return false;
        this.e.role = role;
        this.isSr = this.e.isSr;
        this.setContext('setAbbr');
        await this.reply(`请发送${role.alias}别名，多个用空格隔开`);
    }
    async checkAuth() {
        if (!this.e.isGroup && !this.e.isMaster) {
            await this.reply('禁止私聊设置角色别名');
            return false;
        }
        let abbrSetAuth = GSCfg.getConfig('mys', 'set').abbrSetAuth;
        if (abbrSetAuth === 0)
            return true;
        if (this.e.isMaster)
            return true;
        if (abbrSetAuth == 1) {
            if (!this.e.bot.gml.has(this.e.group_id)) {
                return false;
            }
            if (!this.e.bot.gml.get(this.e.group_id).get(this.e.user_id)) {
                return false;
            }
            if (!this.e.member.is_admin) {
                this.e.reply('暂无权限，只有管理员才能操作');
                return false;
            }
        }
        return true;
    }
    async setAbbr() {
        if (!this.e.msg || this.e.at || this.e.img) {
            await this.reply('设置错误：请发送正确内容');
            return;
        }
        let { setAbbr = {} } = this.getContext();
        this.finish('setAbbr');
        let role = setAbbr.role;
        let setName = this.e.msg.split(' ');
        let nameArr = GSCfg.getConfig('role', 'name');
        if (!nameArr[role.name]) {
            nameArr[role.name] = [];
        }
        let ret = [];
        for (let name of setName) {
            name = name.replace(/#|星铁|设置|配置|别名|昵称/g, '');
            if (!name)
                continue;
            if (nameArr[role.name].includes(name) ||
                GSCfg.roleNameToID(name, this.isSr)) {
                continue;
            }
            nameArr[role.name].push(name);
            ret.push(name);
        }
        if (ret.length <= 0) {
            await this.reply('设置失败：别名错误或已存在');
            return;
        }
        this.save(nameArr);
        const KEY = this.isSr ? 'sr_nameID' : 'nameID';
        GSCfg[KEY] = false;
        await this.reply(`设置别名成功：${ret.join('、')}`);
    }
    save(data) {
        data = YAML.stringify(data);
        fs.writeFileSync(file, data);
    }
    async delAbbr() {
        let role = GSCfg.getRole(this.e.msg, '#|星铁|删除|别名|昵称', this.e.isSr);
        if (!role)
            return false;
        let nameArr = GSCfg.getConfig('role', 'name');
        if (!nameArr[role.name]) {
            await this.reply('默认别名设置，不能删除！');
            return true;
        }
        nameArr[role.name] = nameArr[role.name].filter(v => {
            if (v == role.alias)
                return false;
            return v;
        });
        this.save(nameArr);
        await this.reply(`设置${role.name}别名成功：${role.alias}`);
    }
    async abbrList() {
        let role = GSCfg.getRole(this.e.msg, '#|星铁|别名|昵称', this.e.isSr);
        if (!role)
            return false;
        let name = GSCfg.getdefSet('role', this.e.isSr ? 'sr_name' : 'name')[role.roleId];
        let nameUser = GSCfg.getConfig('role', 'name')[role.name] ?? [];
        let list = lodash.uniq([...name, ...nameUser]);
        let msg = [];
        for (let i in list) {
            let num = Number(i) + 1;
            msg.push(`${num}.${list[i]}`);
        }
        const MSG = await makeForwardMsg(this.e, [msg.join('\n')], `${role.name}别名，${list.length}个`);
        await this.e.reply(MSG);
    }
}

export { abbrSet };
