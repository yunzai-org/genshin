import { Plugin } from 'yunzai';
export declare class gcLog extends Plugin {
    constructor();
    init(): Promise<void>;
    accept(): boolean;
    logUrl(): Promise<void>;
    getLog(): Promise<void>;
    exportLog(): false | Promise<any>;
    logJson(): Promise<any>;
    help(): void;
    helpPort(): void;
    logCount(): Promise<void>;
}
