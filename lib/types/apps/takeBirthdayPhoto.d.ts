import { Plugin } from 'yunzai';
export declare class takeBirthdayPhoto extends Plugin {
    constructor();
    get button(): import("icqq/lib/message").ButtonElem;
    birthdaystar(e: any): Promise<boolean>;
    region: any;
    game_biz: any;
    getEHK4EToken(ck: any, uid: any): Promise<any>;
    getServer(uid: any): Promise<"cn_gf01" | "os_usa" | "cn_qd01" | "os_euro" | "os_asia" | "os_cht">;
    getBirthdayStar(uid: any, e_hk4e_token: any, ck: any): Promise<any>;
    getBirthdayStarImg(uid: any, e_hk4e_token: any, ck: any, role_id: any): Promise<any>;
}