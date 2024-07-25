import { Plugin } from 'yunzai';
export declare class ledger extends Plugin {
    constructor();
    init(): Promise<void>;
    ledger(): Promise<void>;
    ledgerTask(): Promise<void>;
    ledgerCount(): Promise<void>;
    ledgerCountHistory(): Promise<void>;
}
