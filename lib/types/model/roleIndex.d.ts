import base from './base.js';
export default class RoleIndex extends base {
    constructor(e: any);
    e: any;
    static get(e: any): Promise<false | {
        uid: any;
        saveId: any;
        activeDay: string;
        line: ({
            lable: string;
            num: any;
            extra: any;
            color?: undefined;
        } | {
            lable: string;
            num: string;
            color: string;
            extra?: undefined;
        })[][];
        basicInfo: any;
        avatars: any;
        abyss: {};
        headIndexStyle: any;
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
        quality: number;
    }>;
    getIndex(): Promise<false | {
        uid: any;
        saveId: any;
        activeDay: string;
        line: ({
            lable: string;
            num: any;
            extra: any;
            color?: undefined;
        } | {
            lable: string;
            num: string;
            color: string;
            extra?: undefined;
        })[][];
        basicInfo: any;
        avatars: any;
        abyss: {};
        headIndexStyle: any;
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
        quality: number;
    }>;
    dealData(data: any): {
        uid: any;
        saveId: any;
        activeDay: string;
        line: ({
            lable: string;
            num: any;
            extra: any;
            color?: undefined;
        } | {
            lable: string;
            num: string;
            color: string;
            extra?: undefined;
        })[][];
        basicInfo: any;
        avatars: any;
        abyss: {};
        headIndexStyle: any;
    };
    abyssAll(roleArr: any, resAbyss: any): {};
    dayCount(num: any): string;
    roleCard(): Promise<false | {
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
        name: any;
        user_id: any;
        line: {
            lable: string;
            num: any;
        }[][];
        avatars: any;
        bg: number;
    }>;
    roleCardData(res: any): {
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
        name: any;
        user_id: any;
        line: {
            lable: string;
            num: any;
        }[][];
        avatars: any;
        bg: number;
    };
    roleExplore(): Promise<false | {
        gamename: any;
        avatar: string;
        gameavatar: any;
        gamelevel: any;
        gamefwq: any;
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
        activeDay: string;
        line: ({
            lable: string;
            num: any;
            extra?: undefined;
            color?: undefined;
        } | {
            lable: string;
            num: any;
            extra: any;
            color?: undefined;
        } | {
            lable: string;
            num: string;
            color: string;
            extra?: undefined;
        })[][];
        explor: any[];
        basicInfo: any;
        headIndexStyle: any;
    }>;
    roleExploreData(res: any): Promise<{
        gamename: any;
        avatar: string;
        gameavatar: any;
        gamelevel: any;
        gamefwq: any;
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
        activeDay: string;
        line: ({
            lable: string;
            num: any;
            extra?: undefined;
            color?: undefined;
        } | {
            lable: string;
            num: any;
            extra: any;
            color?: undefined;
        } | {
            lable: string;
            num: string;
            color: string;
            extra?: undefined;
        })[][];
        explor: any[];
        basicInfo: any;
        headIndexStyle: any;
    }>;
    headIndexStyle: any;
    initFile(): {};
}
