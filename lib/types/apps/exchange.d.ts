import { Plugin } from 'yunzai';
export declare class exchange extends Plugin {
    constructor();
    getCode(): Promise<any>;
    getData(type: any): Promise<any>;
    getActId(): Promise<any>;
    useCode(): Promise<void>;
}
