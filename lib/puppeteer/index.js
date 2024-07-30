import React from 'react';
import { createRequire, Picture } from 'react-puppeteer';
import Help from './component/help.js';

const require = createRequire(import.meta.url);
class ScreenshotPicture extends Picture {
    constructor() {
        super();
        this.Pup.start();
    }
    getHelp(Props) {
        return this.screenshot({
            join_dir: 'help',
            html_name: `help.html`,
            html_head: (React.createElement(React.Fragment, null,
                React.createElement("link", { rel: "stylesheet", href: require('../../public/css/help.css') }))),
            html_body: React.createElement(Help, { ...Props })
        });
    }
}
const Screenshot = new ScreenshotPicture();

export { Screenshot, ScreenshotPicture };
