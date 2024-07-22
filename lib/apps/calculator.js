import { plugin, puppeteer } from 'yunzai';
import Calculator from '../model/calculator.js';
import blueprint from '../model/blueprint.js';
import { GSCfg } from 'yunzai-mys';

class calculator extends plugin {
    constructor() {
        super({
            priority: 700,
            rule: [
                {
                    reg: '^#*(星铁)?(.*)(养成|计算)([0-9]|,|，| )*$',
                    fnc: 'Calculator'
                },
                {
                    reg: '^#*(星铁)?角色(养成|计算|养成计算)$',
                    fnc: 'calculatorHelp'
                },
                {
                    reg: '^#*尘歌壶模数(养成|计算|养成计算)$',
                    fnc: 'blueprintHelp'
                },
                {
                    reg: '^#*尘歌壶(模数|养成|养成计算)(\\d{10,15})$',
                    fnc: 'Blueprint'
                }
            ]
        });
    }
    _path = process.cwd().replace(/\\/g, '/');
    async blueprintHelp(e) {
        let msg = '#尘歌壶模数\n指令：#尘歌壶模数\n示例：#尘歌壶模数123456\n参数为模数id(10-15位数字)';
        await e.reply(msg);
        return true;
    }
    async calculatorHelp(e) {
        let msg = `角色养成计算\n指令：${e.isSr ? '*克拉拉养成\n示例：*克拉拉养成75 80 6 9 9 9\n参数为角色、武器、普攻、战技、终结技、天赋' : '#刻晴养成\n示例：#刻晴养成81 90 9 9 9\n参数为角色、武器、技能等级'}`;
        await e.reply(msg);
        return true;
    }
    async Blueprint() {
        let role = this.e.msg.replace(/#/, '').match(/\d+/g);
        let data = await new blueprint(this.e).get(role);
        if (!data)
            return;
        let img = await puppeteer.screenshot('Blueprint', data);
        if (img)
            await this.reply(img);
    }
    async Calculator() {
        let role = GSCfg.getRole(this.e.msg, '#|＃|星铁|养成|计算|[0-9]|,|，| ', this.e.isSr);
        if (!role)
            return false;
        if ([10000005, 10000007, 20000000].includes(Number(role.roleId))) {
            await this.e.reply('暂不支持旅行者养成计算');
            return true;
        }
        let data = await new Calculator(this.e).get(role);
        if (!data)
            return;
        this.renderImg('genshin', `html/calculator/calculator-${data.game}`, data);
    }
}

export { calculator };
