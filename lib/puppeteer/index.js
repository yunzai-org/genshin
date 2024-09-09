import React from 'react';
import { createRequire, render } from 'react-puppeteer';
import Help from './component/help.js';

const require = createRequire(import.meta.url);
const Options = {
    html_head: (React.createElement("link", { rel: "stylesheet", href: require('../../resources/assets/css/help.css') }))
};
const screenshotRender = (Props) => {
    // 生成 html 地址 或 html字符串
    return render({
        join_dir: 'help',
        html_name: `help.html`,
        ...Options,
        html_body: React.createElement(Help, { ...Props })
    });
};

export { Options, screenshotRender };
