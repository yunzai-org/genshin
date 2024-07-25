import { Plugin } from 'yunzai';
export declare class gacha extends Plugin {
    constructor();
    gacha(): Promise<void>;
    checkLimit(): boolean;
    weaponBing(): Promise<void>;
    init(): Promise<void>;
}
