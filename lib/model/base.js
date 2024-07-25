import lodash from 'lodash';
import { ConfigController } from 'yunzai';
import { Common, Version, Character } from '../miao.js';

class base {
    constructor(e = {}) {
        this.e = e;
        this.userId = e?.user_id;
    }
    model = 'genshin';
    _path = process.cwd().replace(/\\/g, '/');
    get prefix() {
        return `Yz:genshin:${this.model}:`;
    }
    async renderImg(tpl, data, cfg = {}) {
        return Common.render('genshin', `html/${tpl}`, data, {
            ...cfg,
            e: this.e
        });
    }
    get screenData() {
        const layoutPath = process.cwd() + '/plugins/genshin/resources/html/layout/';
        let yunzaiName = ConfigController.package.name;
        if (yunzaiName == 'miao-yunzai') {
            yunzaiName = 'Miao-Yunzai';
        }
        else if (yunzaiName == 'yunzai') {
            yunzaiName = 'Yunzai-Bot';
        }
        else if (yunzaiName == 'trss-yunzai') {
            yunzaiName = 'TRSS-Yunzai';
        }
        else {
            yunzaiName = lodash.capitalize(yunzaiName);
        }
        let data = {
            saveId: this.userId,
            cwd: this._path,
            yzVersion: `v${Version.yunzai}`,
            yzName: yunzaiName,
            genshinLayout: layoutPath + 'genshin.html',
            defaultLayout: layoutPath + 'default.html'
        };
        if (this.e?.isSr) {
            let char = Character.get('黑天鹅', 'sr');
            return {
                ...data,
                tplFile: `./plugins/genshin/resources/StarRail/html/${this.model}/${this.model}.html`,
                pluResPath: `${this._path}/plugins/genshin/resources/StarRail/`,
                srtempFile: 'StarRail/',
                headImg: char?.imgs?.banner,
                game: 'sr'
            };
        }
        let char = Character.get('闲云', 'gs');
        return {
            ...data,
            tplFile: `./plugins/genshin/resources/html/${this.model}/${this.model}.html`,
            pluResPath: `${this._path}/plugins/genshin/resources/`,
            headImg: char?.imgs?.banner,
            srtempFile: '',
            game: 'gs'
        };
    }
}

export { base as default };
