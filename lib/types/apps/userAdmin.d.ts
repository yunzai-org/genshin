import { Plugin } from 'yunzai';
export declare class userAdmin extends Plugin {
    User: any;
    button: any;
    constructor(e: any);
    userAdmin(): Promise<boolean>;
    resetCache(): Promise<void>;
    delDisable(): Promise<void>;
}
