import React from 'react';
import { BOT_NAME, ConfigController } from 'yunzai';
import { createRequire } from 'react-puppeteer';

const require = createRequire(import.meta.url);
function Help({ helpData }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container", id: "container" },
            React.createElement("div", { className: "head_box" },
                React.createElement("div", { className: "id_text" },
                    BOT_NAME,
                    " Genshin"),
                React.createElement("h2", { className: "day_text" },
                    "\u4F7F\u7528\u8BF4\u660E V",
                    ConfigController?.package?.version ?? '4'),
                React.createElement("img", { className: "genshin_logo", src: require('../../../public/img/原神.png') })),
            helpData.map((val, index) => (React.createElement("div", { key: index, className: "data_box" },
                React.createElement("div", { className: "tab_lable" }, val.group),
                React.createElement("div", { className: "list" }, val.list.map((item, index) => (React.createElement("div", { className: "item", key: index },
                    React.createElement("img", { className: "item-img", src: require(`../../../public/img/icon/${item.icon}.png`) }),
                    React.createElement("div", { className: "title" },
                        React.createElement("div", { className: "text" }, item.title),
                        React.createElement("div", { className: "dec" }, item.desc))))))))),
            React.createElement("div", { className: "logo" },
                "Created By ",
                BOT_NAME))));
}

export { Help as default };
