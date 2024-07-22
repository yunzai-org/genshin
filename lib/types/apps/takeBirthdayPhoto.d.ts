import { plugin } from 'yunzai';
export declare class takeBirthdayPhoto extends plugin {
    constructor();
    button: any;
    birthdaystar(e: any): Promise<boolean>;
    getEHK4EToken(ck: any, uid: any): Promise<string | false>;
    getServer(uid: any): Promise<"cn_gf01" | "cn_qd01" | "os_usa" | "os_euro" | "os_asia" | "os_cht">;
    getBirthdayStar(uid: any, e_hk4e_token: any, ck: any): Promise<any>;
    getBirthdayStarImg(uid: any, e_hk4e_token: any, ck: any, role_id: any): Promise<any>;
}
