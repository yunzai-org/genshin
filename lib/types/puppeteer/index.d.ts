import { Picture } from 'react-puppeteer';
import { Help } from './component/index';
export declare class ScreenshotPicture extends Picture {
    constructor();
    getHelp(Props: Parameters<typeof Help>[0]): Promise<string | false | Buffer>;
}
export declare const Screenshot: ScreenshotPicture;
