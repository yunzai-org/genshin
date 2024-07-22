import base from './base.js';
export default class RoleBag extends base {
    constructor(e: any);
    static get(e: any): Promise<boolean | {
        list: any[];
        num: number;
        saveId: any;
        uid: any;
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
    }>;
    getData(e: any): Promise<boolean | {
        list: any[];
        num: number;
        saveId: any;
        uid: any;
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
    }>;
    dealData(avatars: any): {
        list: any[];
        num: number;
    };
}
