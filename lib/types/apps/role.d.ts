import { plugin } from 'yunzai';
export declare class role extends plugin {
    constructor();
    init(): Promise<void>;
    accept(): boolean;
    abyss(): Promise<void>;
    abyssFloor(): Promise<void>;
    weapon(): Promise<void>;
    roleCard(): Promise<void>;
    roleExplore(): Promise<void>;
}
