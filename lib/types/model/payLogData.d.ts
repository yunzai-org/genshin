import base from './base.js';
export declare class PayData {
    #private;
    constructor(authKey?: string);
    getOringinalData(id?: string): Promise<true | {
        errorMsg: string;
    }>;
    getPrimogemLog(id?: string): Promise<true | {
        errorMsg: string;
    }>;
    getUserInfo(): Promise<any>;
    checkResult(ret: any): {
        errorMsg: string;
    };
    filtrateData(): Promise<any>;
    headers: {
        headers: {
            accept: string;
            'accept-language': string;
            'sec-fetch-dest': string;
            'sec-fetch-mode': string;
            'sec-fetch-site': string;
        };
        referrer: string;
        referrerPolicy: string;
        method: string;
        mode: string;
        credentials: string;
    };
    getUrl(api?: string): string;
}
export declare class HtmlData extends base {
    constructor(data?: {});
    crystal: number;
    uid: string;
    monthData: any[];
    price: number[];
    getBarData(): {
        type: any;
        sales: any;
    }[];
    getTopData(crystal?: number): {
        title: string;
        value: any;
    }[];
    getPieData(): any[];
    maxcConsumption(): {
        type: any;
        sales: any;
    };
    sumConsumption(): {
        title: string;
        value: number;
    }[];
}
export declare function renderImg(data: any): Promise<any>;
