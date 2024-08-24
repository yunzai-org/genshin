import base from './base.js';
export default class MysNews extends base {
    constructor(e: any);
    getNews(gid: any): Promise<any>;
    render(param: any): any;
    newsDetail(postId: any, gid: any): Promise<{
        saveId: any;
        dataConent: any;
        data: any;
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
    postApi(type: any, data: any): string;
    postData(type: any, data: any): Promise<any>;
    detalData(data: any, gid: any): Promise<any>;
    mysEmoticon(gid: any): Promise<Map<any, any>>;
    mysSearch(): Promise<any>;
    mysUrl(): Promise<any>;
    mysEstimate(keyword: any, uid: any): Promise<any>;
    replyMsg(img: any, title: any): any;
    mysNewsTask(): Promise<void>;
    ActivityPush(): Promise<void>;
    getDate(): Promise<string>;
    getGsActivity(): Promise<any[]>;
    getSrActivity(): Promise<any[]>;
    calculateRemainingTime(startDate: any, endDate: any): Promise<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>;
    sendNews(botId: any, groupId: any, typeName: any, postId: any, gid: any): Promise<any>;
    game(gid: any): "" | "崩坏三" | "原神" | "崩坏二" | "未定事件簿" | "崩坏星穹铁道" | "绝区零";
}
