import { plugin } from 'yunzai';
import Note from '../model/note.js';
import { GSCfg } from 'yunzai-mys';

GSCfg.cpCfg('mys', 'set');
class dailyNote extends plugin {
    set = null;
    constructor() {
        super({
            priority: 300,
            rule: [
                {
                    reg: '^#*(原神|星铁)?(体力|树脂|查询体力)$',
                    fnc: 'note'
                }
            ]
        });
        this.set = GSCfg.getConfig('mys', 'set');
    }
    async note() {
        let data = await Note.get(this.e);
        if (!data)
            return;
        this.renderImg('genshin', `html/player/daily-note-${data.game}`, data);
    }
}

export { dailyNote };
