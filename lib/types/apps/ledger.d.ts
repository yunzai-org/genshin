import { plugin } from 'yunzai';
export declare class ledger extends plugin {
    constructor();
    init(): Promise<void>;
    ledger(): Promise<void>;
    ledgerTask(): Promise<void>;
    ledgerCount(): Promise<void>;
    ledgerCountHistory(): Promise<void>;
}
