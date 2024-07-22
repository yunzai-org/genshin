import { plugin } from 'yunzai';
export declare class gacha extends plugin {
    constructor();
    gacha(): Promise<void>;
    checkLimit(): boolean;
    weaponBing(): Promise<void>;
    init(): Promise<void>;
}
