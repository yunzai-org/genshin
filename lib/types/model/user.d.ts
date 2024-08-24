import base from './base.js';
export default class User extends base {
    constructor(e: any);
    user(): Promise<any>;
    resetCk(): Promise<void>;
    bing(): Promise<any>;
    delCk(): Promise<string>;
    bingUid(): Promise<any>;
    delUid(index: any): Promise<any>;
    showUid_bak(): Promise<void>;
    showUid(): Promise<any>;
    toggleUid(index: any): Promise<any>;
    loadOldDataV2(): Promise<void>;
    loadOldDataV3(): Promise<boolean>;
    loadOldUid(): Promise<void>;
    loadOldData(data: any): Promise<void>;
    myCk(): Promise<void>;
    checkCkStatus(): Promise<boolean>;
    userAdmin(): Promise<any>;
    bindNoteUser(): Promise<boolean>;
}
