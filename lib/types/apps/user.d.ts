import { plugin } from 'yunzai';
export declare class user extends plugin {
    User: any;
    constructor(e: any);
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
