export declare class MysCfg {
    isSr: boolean;
    nameID: typeof Map.prototype | false;
    sr_nameID: typeof Map.prototype | false;
    defSetPath: string;
    defSet: {};
    configPath: string;
    config: {};
    watcher: {
        config: {};
        defSet: {};
    };
    ignore: string[];
    get element(): any;
    getdefSet(app: any, name: any): any;
    getConfig(app: any, name: any): any;
    getYaml(app: any, name: any, type: any): any;
    getFilePath(app: any, name: any, type: any): string;
    watch(file: any, app: any, name: any, type?: string): void;
    getBingCk: (game?: string) => Promise<{
        ck: {};
        ckQQ: {};
        noteCk: {};
    }>;
    change_myspubCk(): Promise<void>;
    getGachaSet(groupId?: string): any;
    cpCfg(app: any, name: any): void;
    getWeaponDataByWeaponHash(_: any): {};
    getAllAbbr(): {};
    getBingCkSingle(_: any): {};
    saveBingCk(_: any, __: any): void;
    getElementByRoleName(_: any): string;
    getSkillDataByskillId(_: any, __: any): {};
    fightPropIdToName(_: any): string;
    getRoleTalentByTalentId(_: any): {};
    getAbbr(): void;
    getMsgUid(msg: any): string | false;
    _getAbbr(): void;
    _roleNameToID(keyword: any, isSr?: boolean): any;
}
declare class GsCfg extends MysCfg {
    Weapon: any;
    Character: any;
    init(): Promise<void>;
    constructor();
    shortName(name: any, isWeapon?: boolean): any;
    getRole(msg: any, filterMsg?: string, isSr?: boolean): false | {
        roleId: any;
        uid: string;
        alias: any;
        game: any;
        name: any;
    };
    roleIdToName(id: any): any;
    roleNameToID(keyword: any, isSr: any): any;
    _getRole(msg: any, filterMsg?: string, _?: boolean): false | {
        roleId: any;
        uid: string;
        alias: any;
        name: any;
    };
}
declare const _default: GsCfg;
export default _default;
