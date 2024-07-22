import base from './base.js';
export default class GachaData extends base {
    constructor(e: any);
    static init(e: any): Promise<GachaData>;
    static getImg(name: any, type?: string): any;
    run(): Promise<{
        list: any;
        info: string;
        nowFive: number;
        nowFour: number;
        poolName: string;
        isWeapon: boolean;
        bingWeapon: any;
        lifeNum: any;
        tplFile: string;
        pluResPath: string;
        srtempFile: string;
        headImg: any;
        game: string;
        saveId: any;
        cwd: string;
        yzVersion: string;
        yzName: any;
        genshinLayout: string;
        defaultLayout: string;
        name: any;
        quality: number;
    }>;
    get key(): string;
    getTpye(): void;
    getPool(): Promise<void>;
    userData(): Promise<any>;
    lottery(save?: boolean): any;
    lottery5(): boolean;
    lottery4(): boolean;
    lottery3(): boolean;
    probability(): any;
    getBingWeapon(sortName?: boolean): any;
    lotteryInfo(): {
        info: string;
        nowFive: number;
        nowFour: number;
        poolName: string;
        isWeapon: boolean;
        bingWeapon: any;
        lifeNum: any;
    };
    saveUser(): Promise<void>;
    getNow(): string;
    getEnd(): {
        end: string;
        end4: number;
    };
    getWeekEnd(): number;
}
