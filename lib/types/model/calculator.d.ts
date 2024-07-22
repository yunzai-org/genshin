import base from './base.js';
export default class Calculator extends base {
    constructor(e: any);
    get(role: any): Promise<false | {
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
        uid: any;
        dataCharacter: any;
        setSkill: any;
        skillList: any;
        computes: {};
    }>;
    getSet(): Promise<boolean>;
    getBody(): Promise<any>;
    getSkillId(roleId: any): Promise<any>;
    computes(body: any): Promise<{}>;
}
