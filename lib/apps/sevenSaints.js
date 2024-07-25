import { Plugin, puppeteer } from 'yunzai';
import Deck from '../model/deck.js';

class sevenSaints extends Plugin {
    constructor() {
        super({
            name: '七圣召唤卡组查询',
            priority: 0,
            rule: [
                {
                    reg: '^#*七圣(召唤)?查询(牌|卡)组(列表)?[0-9]{0,2}$',
                    fnc: 'deckIndex'
                },
                {
                    reg: '^#*七圣(召唤)?查询(角色|行动)?(卡)?牌(列表)?$',
                    fnc: 'deck_cards'
                }
            ]
        });
        this.button = segment.button([
            { text: '牌组', callback: `#七圣召唤查询牌组` },
            { text: '角色牌', callback: `#七圣召唤查询角色牌` },
            { text: '行动牌', callback: `#七圣召唤查询行动牌` }
        ]);
    }
    async deckIndex() {
        let index = this.e.msg.match(/[0-9]{1,2}/g);
        if (index && index[0]) {
            await this.deck(index[0]);
        }
        else {
            await this.deck_list();
        }
    }
    async deck(id) {
        let data = await new Deck(this.e).getIndex(id);
        if (!data)
            return;
        let img = await puppeteer.screenshot('deck', data);
        if (img)
            await this.reply([img, this.button]);
    }
    async deck_list(id = 0) {
        let data = await new Deck(this.e).getIndex(id, true);
        if (!data)
            return;
        let img = await puppeteer.screenshot('deckList', data);
        if (img)
            await this.reply([img, this.button]);
    }
    async deck_cards(id = 0) {
        if (this.e.msg.includes('角色'))
            id = 1;
        if (this.e.msg.includes('行动'))
            id = 2;
        await this.reply('卡牌数据获取中...');
        let data = await new Deck(this.e).getcard(id);
        if (!data)
            return;
        let img = await puppeteer.screenshot('deckCard', data);
        if (img)
            await this.reply([img, this.button]);
    }
}

export { sevenSaints };
