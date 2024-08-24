import { Plugin } from 'yunzai';
export declare class role extends Plugin {
    constructor();
    prefix: any;
    get button(): import("icqq/lib/message/elements.js").ButtonElem;
    init(): Promise<void>;
    accept(): boolean;
    abyss(): Promise<void>;
    abyssFloor(): Promise<void>;
    weapon(): Promise<void>;
    roleCard(): Promise<void>;
    roleExplore(): Promise<void>;
}
