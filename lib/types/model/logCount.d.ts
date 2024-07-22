import base from './base.js';
export default class LogCount extends base {
    constructor(e: any);
    readJson(): {
        list: any[];
        ids: any[];
    };
    count(): Promise<false | {
        saveId: any;
        uid: any;
        pool: any[];
        typeName: any;
        isGroup: any;
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
    getPool(): void;
    getUid(): Promise<any>;
    getPoolCfg(): any;
    analyseHistory(): false | {
        saveId: any;
        uid: any;
        pool: any[];
        typeName: any;
        isGroup: any;
    };
}
