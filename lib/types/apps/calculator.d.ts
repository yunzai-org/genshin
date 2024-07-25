import { Plugin } from 'yunzai';
export declare class calculator extends Plugin {
    constructor();
    _path: string;
    blueprintHelp(e: any): Promise<boolean>;
    calculatorHelp(e: any): Promise<boolean>;
    Blueprint(): Promise<void>;
    Calculator(): Promise<boolean>;
}
