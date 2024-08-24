import base from './base.js';
export default class GachaLog extends base {
    urlKey: any;
    uidKey: any;
    path: any;
    pool: any;
    constructor(e: any);
    static getIcon(name: any, type?: string, game?: string): any;
    logUrl(): Promise<any>;
    dealUrl(url: any): {};
    downFile(): Promise<string | false>;
    checkUrl(param: any): Promise<boolean>;
    logApi(param: any): Promise<unknown>;
    updateLog(): Promise<false | {
        num: any;
    }>;
    getAllLog(ids: any, authkey: any, page?: number, endId?: number): any;
    readJson(): {
        list: any[];
        ids: Map<any, any>;
    };
    creatFile(): void;
    writeJson(data: any): void;
    getLogData(): Promise<any>;
    getAllGcLogData(): Promise<any>;
    getGcLogData(): Promise<{
        allNum: any;
        noFiveNum: number;
        noFourNum: number;
        fiveNum: number;
        fourNum: number;
        fiveAvg: number;
        fourAvg: number;
        wai: number;
        isvalidNum: number;
        maxFour: any;
        weaponNum: number;
        weaponFourNum: number;
        firstTime: any;
        lastTime: any;
        fiveLog: any[];
        upYs: number;
        noWaiRate: number;
    }>;
    getPool(): {
        type: number;
        typeName: string;
    };
    getUid(): Promise<any>;
    analyse(): {
        allNum: any;
        noFiveNum: number;
        noFourNum: number;
        fiveNum: number;
        fourNum: number;
        fiveAvg: number;
        fourAvg: number;
        wai: number;
        isvalidNum: number;
        maxFour: any;
        weaponNum: number;
        weaponFourNum: number;
        firstTime: any;
        lastTime: any;
        fiveLog: any[];
        upYs: number;
        noWaiRate: number;
    };
    checkIsUp(): boolean;
    randData(data: any): {
        saveId: any;
        uid: any;
        type: any;
        typeName: any;
        allNum: any;
        firstTime: any;
        lastTime: any;
        fiveLog: any;
        line: any[];
        hasMore: boolean;
        max: number;
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
    };
    getServer(): "prod_gf_cn" | "cn_gf01" | "prod_official_usa" | "os_usa" | "cn_qd01" | "prod_qd_cn" | "prod_official_euro" | "os_euro" | "prod_official_asia" | "os_asia" | "prod_official_cht" | "os_cht";
}
