import { Plugin } from 'yunzai';
export declare class strategy extends Plugin {
    path: string;
    url: string;
    collection_id: number[][];
    source: string[];
    oss: string;
    constructor();
    set: any;
    init(): Promise<void>;
    strategy(): Promise<boolean>;
    strategy_help(): Promise<void>;
    strategy_setting(): Promise<void>;
    getImg(name: any, group: any): Promise<boolean>;
    getData(url: any): Promise<unknown>;
}
