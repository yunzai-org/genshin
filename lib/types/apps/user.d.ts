import { Plugin } from 'yunzai';
import User from '../model/user.js';
export declare class user extends Plugin {
    constructor(e: any);
    get User(): User;
    init(): Promise<void>;
    accept(): boolean;
    saveUid(): void;
    saveSrUid(): void;
    noLogin(): Promise<void>;
    ckCode(): Promise<void>;
    ckHelp(): Promise<void>;
    bingCk(): Promise<void>;
    delCk(): Promise<void>;
    bingUid(): Promise<void>;
    showUid(): Promise<void>;
    delUid(): Promise<boolean>;
    myCk(): Promise<void>;
    loadOldData(): Promise<void>;
    checkCkStatus(): Promise<void>;
    bindNoteUser(): Promise<void>;
}
