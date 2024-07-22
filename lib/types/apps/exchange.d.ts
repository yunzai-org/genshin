import { plugin } from 'yunzai';
export declare class exchange extends plugin {
    constructor();
    getCode(): Promise<any>;
    getData(type: any): Promise<any>;
    getActId(): Promise<any>;
    useCode(): Promise<void>;
}
