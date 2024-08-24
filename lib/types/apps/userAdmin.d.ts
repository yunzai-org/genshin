import { Plugin } from 'yunzai';
import User from '../model/user.js';
export declare class userAdmin extends Plugin {
    constructor(e: any);
    get User(): User;
    get button(): import("icqq/lib/message/elements.js").ButtonElem;
    userAdmin(): Promise<boolean>;
    resetCache(): Promise<void>;
    delDisable(): Promise<void>;
}
