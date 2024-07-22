import { plugin } from 'yunzai';
export declare class userAdmin extends plugin {
    User: any;
    button: any;
    constructor(e: any);
    userAdmin(): Promise<boolean>;
    resetCache(): Promise<void>;
    delDisable(): Promise<void>;
}
