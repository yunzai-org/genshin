import { Plugin } from 'yunzai';
export declare class gcLog extends Plugin {
    constructor();
    prefix: any;
    get button(): import("icqq/lib/message/elements.js").ButtonElem;
    accept(): boolean;
    logUrl(): Promise<void>;
    getLog(): Promise<void>;
    exportLog(): false | Promise<any>;
    logJson(): Promise<any>;
    help(): void;
    helpPort(): void;
    logCount(): Promise<void>;
}
