import YAML from 'yaml';
import chokidar from 'chokidar';
import { existsSync, readFileSync, mkdirSync, copyFileSync } from 'node:fs';
import lodash from 'lodash';
import { NoteUser } from 'yunzai-mys';
import { join } from 'node:path';

class MysCfg {
    isSr = false;
    nameID = new Map();
    sr_nameID = new Map();
    defSetPath = './plugins/genshin/defSet/';
    defSet = {};
    configPath = './plugins/genshin/config/';
    config = {};
    watcher = { config: {}, defSet: {} };
    ignore = ['mys.pubCk', 'gacha.set', 'bot.help', 'role.name'];
    get element() {
        return {
            ...this.getdefSet('element', 'role'),
            ...this.getdefSet('element', 'weapon')
        };
    }
    getdefSet(app, name) {
        return this.getYaml(app, name, 'defSet');
    }
    getConfig(app, name) {
        if (this.ignore.includes(`${app}.${name}`)) {
            return this.getYaml(app, name, 'config');
        }
        return {
            ...this.getdefSet(app, name),
            ...this.getYaml(app, name, 'config')
        };
    }
    getYaml(app, name, type) {
        const file = this.getFilePath(app, name, type);
        const key = `${app}.${name}`;
        if (this[type][key])
            return this[type][key];
        if (!existsSync(file))
            return false;
        try {
            const data = readFileSync(file, 'utf8');
            this[type][key] = YAML.parse(data);
        }
        catch (error) {
            logger.error(`[${app}][${name}] 格式错误 ${error}`);
            return false;
        }
        this.watch(file, app, name, type);
        return this[type][key];
    }
    getFilePath(app, name, type) {
        if (type == 'defSet') {
            return `${this.defSetPath}${app}/${name}.yaml`;
        }
        else {
            return `${this.configPath}${app}.${name}.yaml`;
        }
    }
    watch(file, app, name, type = 'defSet') {
        let key = `${app}.${name}`;
        if (this.watcher[type][key])
            return;
        const watcher = chokidar.watch(file);
        watcher.on('change', () => {
            delete this[type][key];
            logger.mark(`[修改配置文件][${type}][${app}][${name}]`);
            if (this[`change_${app}${name}`]) {
                this[`change_${app}${name}`]();
            }
        });
        this.watcher[type][key] = watcher;
    }
    getBingCk = async (game = 'gs') => {
        let ck = {};
        let ckQQ = {};
        let noteCk = {};
        await NoteUser.forEach(async function (user) {
            let qq = user.qq + '';
            let tmp = {};
            lodash.forEach(user.mysUsers, mys => {
                let uids = mys.getUids(game);
                lodash.forEach(uids, uid => {
                    let ckData = mys.getCkInfo(game);
                    ckData.qq = qq;
                    if (!ck[uid]) {
                        ck[uid] = ckData;
                        ckQQ[qq] = ckData;
                    }
                    tmp[uid] = ckData;
                });
            });
            noteCk[qq] = tmp;
        });
        return { ck, ckQQ, noteCk };
    };
    async change_myspubCk() {
        logger.info('错误行为，尝试进行循环引用！');
        logger.info('这是设计错误，请等待修复....');
    }
    getGachaSet(groupId = '') {
        const config = this.getYaml('gacha', 'set', 'config');
        const def = config.default;
        if (config[groupId]) {
            return { ...def, ...config[groupId] };
        }
        return def;
    }
    cpCfg(app, name) {
        if (!existsSync('./plugins/genshin/config')) {
            mkdirSync('./plugins/genshin/config');
        }
        let set = `./plugins/genshin/config/${app}.${name}.yaml`;
        if (!existsSync(set)) {
            copyFileSync(`./plugins/genshin/defSet/${app}/${name}.yaml`, set);
        }
    }
    getWeaponDataByWeaponHash(_) {
        logger.info('gsCfg.getWeaponDataByWeaponHash() 已废弃');
        return {};
    }
    getAllAbbr() {
        logger.info('gsCfg.getAllAbbr() 已废弃');
        return {};
    }
    getBingCkSingle(_) {
        logger.info('gsCfg.getBingCkSingle() 已废弃');
        return {};
    }
    saveBingCk(_, __) {
        logger.info('gsCfg.saveBingCk() 已废弃');
    }
    getElementByRoleName(_) {
        logger.info('gsCfg.getElementByRoleName() 已废弃');
        return '';
    }
    getSkillDataByskillId(_, __) {
        logger.info('gsCfg.getSkillDataByskillId() 已废弃');
        return {};
    }
    fightPropIdToName(_) {
        logger.info('gsCfg.fightPropIdToName() 已废弃');
        return '';
    }
    getRoleTalentByTalentId(_) {
        logger.info('gsCfg.getRoleTalentByTalentId 已废弃');
        return {};
    }
    getAbbr() {
        logger.info('gsCfg.getAbbr() 已经废弃');
    }
    getMsgUid(msg) {
        const ret = /([1-9]|18)[0-9]{8}/g.exec(msg);
        if (!ret)
            return false;
        return ret[0];
    }
    _getAbbr() {
        if (this[this.isSr ? 'sr_nameID' : 'nameID'])
            return;
        this.nameID = new Map();
        this.sr_nameID = new Map();
        let nameArr = this.getdefSet('role', 'name');
        let sr_nameArr = this.getdefSet('role', 'sr_name');
        let nameArrUser = this.getConfig('role', 'name');
        let nameID = {};
        for (let i in nameArr) {
            nameID[nameArr[i][0]] = i;
            for (let abbr of nameArr[i]) {
                this.nameID.set(String(abbr), i);
            }
        }
        for (let i in sr_nameArr) {
            nameID[sr_nameArr[i][0]] = i;
            for (let abbr of sr_nameArr[i]) {
                this.sr_nameID.set(String(abbr), i);
            }
        }
        for (let i in nameArrUser) {
            for (let abbr of nameArrUser[i]) {
                this.nameID.set(String(abbr), nameID[i]);
            }
        }
    }
    _roleNameToID(keyword, isSr) {
        if (isSr)
            this.isSr = isSr;
        if (!isNaN(keyword))
            keyword = Number(keyword);
        this._getAbbr();
        const key = this.isSr ? 'sr_nameID' : 'nameID';
        if (typeof this[key] != 'boolean') {
            let roelId = this[key].get(String(keyword));
            return roelId || false;
        }
        return false;
    }
}
class GsCfg extends MysCfg {
    Weapon = null;
    Character = null;
    async init() {
        const dir = join(process.cwd(), './plugins/miao-plugin/models/index.js');
        if (existsSync(dir)) {
            const { Character: C, Weapon: W } = await import(`file://${dir}`);
            this.Character = C;
            this.Weapon = W;
        }
    }
    constructor() {
        super();
        this.init();
    }
    shortName(name, isWeapon = false) {
        const obj = (isWeapon ? this.Weapon : this.Character).get(name);
        return obj.abbr || obj.name || '';
    }
    getRole(msg, filterMsg = '', isSr = false) {
        let alias = msg.replace(/#|老婆|老公|([1-9]|18)[0-9]{8}/g, '').trim();
        if (filterMsg) {
            alias = alias.replace(new RegExp(filterMsg, 'g'), '').trim();
        }
        this.isSr = isSr;
        let char = this.Character.get(alias, isSr ? 'sr' : 'gs');
        if (!char) {
            return false;
        }
        let uid = this.getMsgUid(msg) || '';
        return {
            roleId: char.id,
            uid,
            alias,
            game: char.game,
            name: char.name
        };
    }
    roleIdToName(id) {
        let char = this.Character.get(id);
        return char?.name || '';
    }
    roleNameToID(keyword, isSr) {
        const char = this.Character.get(keyword, isSr ? 'sr' : 'gs');
        return char?.id || false;
    }
    _getRole(msg, filterMsg = '', _ = false) {
        let alias = msg.replace(/#|老婆|老公|([1-9]|18)[0-9]{8}/g, '').trim();
        if (filterMsg) {
            alias = alias.replace(new RegExp(filterMsg, 'g'), '').trim();
        }
        let roleId = this._roleNameToID(alias);
        if (!roleId)
            return false;
        let uid = this.getMsgUid(msg) || '';
        return {
            roleId,
            uid,
            alias,
            name: this.roleIdToName(roleId)
        };
    }
}
var gsCfg = new GsCfg();

export { MysCfg, gsCfg as default };
