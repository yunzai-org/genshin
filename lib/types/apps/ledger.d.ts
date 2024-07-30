import { Plugin } from 'yunzai';
export declare class ledger extends Plugin {
    constructor();
    prefix: any;
    get button(): any;
    ledger(): Promise<void>;
    ledgerTask(): Promise<void>;
    ledgerCount(): Promise<void>;
    ledgerCountHistory(): Promise<void>;
}
