import base from './base.js';
export default class RoleDetail extends base {
    constructor(e: any);
    static get(e: any): Promise<false | {
        skill: {};
        name: any;
        showName: any;
        level: any;
        fetter: any;
        actived_constellation_num: any;
        list: any[];
        text1: string;
        text2: string;
        bg: number;
        set: any[];
        constellations: any;
        uid: any;
        saveId: any;
        tplFile: string;
        pluResPath: string;
        srtempFile: string;
        headImg: any;
        game: string;
        cwd: string;
        yzVersion: string;
        yzName: any;
        genshinLayout: string;
        defaultLayout: string;
        quality: number;
    }>;
    getDetail(): Promise<false | {
        skill: {};
        name: any;
        showName: any;
        level: any;
        fetter: any;
        actived_constellation_num: any;
        list: any[];
        text1: string;
        text2: string;
        bg: number;
        set: any[];
        constellations: any;
        uid: any;
        saveId: any;
        tplFile: string;
        pluResPath: string;
        srtempFile: string;
        headImg: any;
        game: string;
        cwd: string;
        yzVersion: string;
        yzName: any;
        genshinLayout: string;
        defaultLayout: string;
        quality: number;
    }>;
    getAvatar(data: any): Promise<false | {
        name: any;
        showName: any;
        level: any;
        fetter: any;
        actived_constellation_num: any;
        list: any[];
        text1: string;
        text2: string;
        bg: number;
        set: any[];
        constellations: any;
    }>;
    noAvatar(): Promise<void>;
    getSkill(data: {}, avatar: any): {
        id: any;
    };
    checkImg(name: any): Promise<boolean>;
    getData(): Promise<unknown>;
    downImg(name: any, arr: any): Promise<boolean>;
}