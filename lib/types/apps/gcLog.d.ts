import { plugin } from 'yunzai';
export declare class gcLog extends plugin {
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
