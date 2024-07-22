import base from './base.js';
export default class WeaponModel extends base {
    constructor(e: any);
    e: any;
    model: string;
    static get(e: any): Promise<boolean | {
        list: any[];
        count: {
            five: number;
            four: number;
            three: number;
            单手剑: number;
            双手剑: number;
            长柄武器: number;
            弓: number;
            法器: number;
        };
        saveId: any;
        uid: any;
        tplFile: string;
        pluResPath: string;
        srtempFile: string;
        headImg: any;
        game: string;
        cwd: string;
        yzVersion: string;
        yzName: any;
        genshinLayout: string;
        defaultLayout: string;
    }>;
    getData(e: any): Promise<boolean | {
        list: any[];
        count: {
            five: number;
            four: number;
            three: number;
            单手剑: number;
            双手剑: number;
            长柄武器: number;
            弓: number;
            法器: number;
        };
        saveId: any;
        uid: any;
        tplFile: string;
        pluResPath: string;
        srtempFile: string;
        headImg: any;
        game: string;
        cwd: string;
        yzVersion: string;
        yzName: any;
        genshinLayout: string;
        defaultLayout: string;
    }>;
    dealData(avatars: any): {
        list: any[];
        count: {
            five: number;
            four: number;
            three: number;
            单手剑: number;
            双手剑: number;
            长柄武器: number;
            弓: number;
            法器: number;
        };
    };
}
