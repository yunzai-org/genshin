import { Plugin } from 'yunzai';
import Ledger from '../model/ledger.js';
import fs from 'node:fs';

const file = ['./data/NoteData', './data/SR_NoteData'];
for (let i of file) {
    if (!fs.existsSync(i)) {
        fs.mkdirSync(i);
    }
}
class ledger extends Plugin {
    constructor() {
        super({
            name: '札记查询',
            priority: 300,
            rule: [
                {
                    reg: '^(#原石|#*札记|#*(星铁)?星琼)([0-9]|[一二两三四五六七八九十]+)*月*$',
                    fnc: 'ledger'
                },
                {
                    reg: '^#(原石|(星铁)?星琼)任务$',
                    permission: 'master',
                    fnc: 'ledgerTask'
                },
                {
                    reg: '^#*(原石|札记|(星铁)?星琼)统计$',
                    fnc: 'ledgerCount'
                },
                {
                    reg: '^#*(去年|今年|\\d{4}年)(原石|札记|(星铁)?星琼)统计$',
                    fnc: 'ledgerCountHistory'
                }
            ]
        });
    }
    get button() {
        this.prefix = this.e?.isSr ? '*星琼' : '#原石';
        return global.segment.button([
            { text: '记录', callback: this.prefix },
            { text: '统计', callback: `${this.prefix}统计` }
        ]);
    }
    async ledger() {
        let data = await new Ledger(this.e).get();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', `html/ledger/ledger-${data.game}`, data, {
                retType: 'base64'
            }),
            this.button
        ]);
    }
    async ledgerTask() {
        let ledger = new Ledger(this.e);
        await ledger.ledgerTask(!!this?.e?.msg);
    }
    async ledgerCount() {
        let data = await new Ledger(this.e).ledgerCount();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', `html/ledger/ledger-count-${data.game}`, data, { retType: 'base64' }),
            this.button
        ]);
    }
    async ledgerCountHistory() {
        let data = await new Ledger(this.e).ledgerCountHistory();
        if (!data)
            return;
        this.reply([
            await this.renderImg('genshin', `html/ledger/ledger-count-${data.game}`, data, { retType: 'base64' }),
            this.button
        ]);
    }
}

export { ledger };
