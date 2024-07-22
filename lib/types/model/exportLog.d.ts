import base from './base.js';
export default class ExportLog extends base {
    constructor(e: any);
    exportJson(): Promise<boolean>;
    getUid(): Promise<any>;
    getAllList(): {
        list: any[];
    };
    loadJson(json: any): any;
    logJson(): Promise<boolean>;
    dealJson(list: any): {};
}
