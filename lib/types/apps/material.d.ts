import { Plugin } from 'yunzai';
export declare class material extends Plugin {
    constructor();
    path: string;
    pathOther: string;
    srPath: string;
    srPathOther: string;
    url: string;
    collection_id: number[];
    srCollection_id: number[];
    special: string[];
    oss: string;
    init(): Promise<void>;
    material(): Promise<any>;
    getImg(name: any): Promise<boolean>;
    getImgOther(name: any): Promise<boolean>;
    getImgOther2(name: any): Promise<boolean>;
    getImgSr(name: any): Promise<boolean>;
    getImgOtherSr(name: any): Promise<boolean>;
    getImgOther2Sr(name: any): Promise<boolean>;
    getData(collectionId: any): Promise<unknown>;
}
