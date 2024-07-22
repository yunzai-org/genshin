import { plugin } from 'yunzai';
export declare class payLog extends plugin {
    dirPath: string;
    authKey: string;
    constructor();
    payLog(e: any): Promise<boolean>;
    getAuthKey(): Promise<boolean>;
    updatePayLog(e: any): Promise<boolean>;
    payLogHelp(e: any): void;
    isMain(id: any, game?: string): Promise<any>;
    writeData(imgData: any): Promise<void>;
}
