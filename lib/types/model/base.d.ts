export default class base {
    constructor(e?: {});
    model: string;
    _path: string;
    get prefix(): string;
    renderImg(tpl: any, data: any, cfg?: {}): Promise<any>;
    get screenData(): {
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
    };
}
