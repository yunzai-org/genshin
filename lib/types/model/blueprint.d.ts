import base from './base.js';
export default class blueprint extends base {
    constructor(e: any);
    mysApi: any;
    model: string;
    checkMsg: string;
    get(role: any): Promise<false | {
        tplFile: string;
        pluResPath: string;
        srtempFile: string;
        headImg: any;
        game: string;
        saveId: any;
        cwd: string;
        yzVersion: string;
        yzName: any;
        genshinLayout: string;
        defaultLayout: string;
        uid: any;
        share_code: any;
        blueprint: any;
        computes: any;
    }>;
    getBody(data: any): Promise<false | {
        list: any[];
    }>;
    computes(body: any): Promise<any>;
}
