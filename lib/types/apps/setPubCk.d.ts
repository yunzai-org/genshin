import { Plugin } from 'yunzai';
export declare class setPubCk extends Plugin {
    constructor();
    ck: any;
    setPubCk(): Promise<void>;
    pubCk(): Promise<boolean>;
    checkCk(): Promise<boolean>;
    getUserInfo(server?: string): Promise<import("node-fetch").Response>;
    save(data: any): void;
    setUserCk(): Promise<void>;
}
