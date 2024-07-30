import { Plugin } from 'yunzai';
export declare class gacha extends Plugin {
    constructor();
    GachaData: any;
    gacha(): Promise<void>;
    checkLimit(): boolean;
    weaponBing(): Promise<void>;
    init(): Promise<void>;
}
