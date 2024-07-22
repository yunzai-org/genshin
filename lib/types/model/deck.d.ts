import base from './base.js';
export default class Deck extends base {
    constructor(e: any);
    getIndex(id: any, list?: boolean): Promise<false | {
        uid: any;
        saveId: any;
        nickname: any;
        level: any;
        Data: any;
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
    getcard(id: any): Promise<{
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
}
