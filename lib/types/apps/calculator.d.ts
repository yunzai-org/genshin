import { plugin } from 'yunzai';
export declare class calculator extends plugin {
    constructor();
    _path: string;
    blueprintHelp(e: any): Promise<boolean>;
    calculatorHelp(e: any): Promise<boolean>;
    Blueprint(): Promise<void>;
    Calculator(): Promise<boolean>;
}
