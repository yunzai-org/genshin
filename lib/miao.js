import { join } from 'path';

const components = join(process.cwd(), './plugins/miao-plugin/components/index.js');
const models = join(process.cwd(), './plugins/miao-plugin/models/index.js');
const { Data } = await import(`file://${components}`);
const { Character, Weapon, Player } = await import(`file://${models}`);

export { Character, Data, Player, Weapon };
