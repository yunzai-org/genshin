import { Plugin } from 'yunzai';
export declare class mysNews extends Plugin {
    constructor(e: any);
    file: string;
    init(): Promise<void>;
    news(): Promise<void>;
    mysNewsTask(): Promise<void>;
    setActivityPush(): Promise<boolean>;
    mysSearch(): Promise<boolean>;
    mysUrl(): Promise<void>;
    mysEstimate(): Promise<void>;
    setPush(): Promise<boolean>;
    gids(): 2 | 1 | 6 | 3 | 4 | 8;
}
