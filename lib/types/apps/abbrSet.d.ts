import { Plugin } from 'yunzai';
export declare class abbrSet extends Plugin {
    constructor();
    isSr: boolean;
    file: string;
    init(): Promise<void>;
    abbr(): Promise<boolean>;
    checkAuth(): Promise<boolean>;
    setAbbr(): Promise<void>;
    save(data: any): void;
    delAbbr(): Promise<boolean>;
    abbrList(): Promise<boolean>;
}
