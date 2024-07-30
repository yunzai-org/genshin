import { Plugin } from 'yunzai';
export declare class exchange extends Plugin {
    constructor();
    deadline: any;
    uid: any;
    now: any;
    actId: any;
    code_ver: any;
    getCode(): Promise<any>;
    getData(type: any): Promise<any>;
    getActId(): Promise<any>;
    useCode(): Promise<void>;
}
