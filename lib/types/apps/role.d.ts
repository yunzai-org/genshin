import { Plugin } from 'yunzai';
export declare class role extends Plugin {
    constructor();
    init(): Promise<void>;
    accept(): boolean;
    abyss(): Promise<void>;
    abyssFloor(): Promise<void>;
    weapon(): Promise<void>;
    roleCard(): Promise<void>;
    roleExplore(): Promise<void>;
}
