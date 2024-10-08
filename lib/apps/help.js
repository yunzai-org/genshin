import { Plugin, Segment } from 'yunzai';
import { screenshotRender } from '../puppeteer/index.js';
import { parse } from 'yaml';
import { createRequire } from 'react-puppeteer';
import { readFileSync } from 'fs';

const require = createRequire(import.meta.url);
let cache = null;
class help extends Plugin {
    constructor(e) {
        super();
        if (e)
            this.e = e;
        this.event = 'message';
        this.rule = [
            {
                reg: /^(#|\/)云崽帮助/,
                fnc: this.help.name
            }
        ];
    }
    async help() {
        if (cache) {
            this.e.reply(Segment.image(cache));
            return;
        }
        const dir = require('../../resources/assets/yaml/genshin.yaml');
        try {
            const Data = parse(readFileSync(dir, 'utf-8'));
            const Bf = await screenshotRender({
                helpData: Data
            });
            if (Bf && typeof Bf !== 'string') {
                cache = Bf;
            }
            else {
                this.e.reply('出错啦～');
                return;
            }
            this.e.reply(Segment.image(cache));
        }
        catch {
            this.e.reply('出错啦～');
            return;
        }
    }
}

export { help };
