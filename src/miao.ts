import { join } from "path"
const components = join(process.cwd(), './miao-plugin/components/index.js')
const models = join(process.cwd(), './miao-plugin/models/index.js')
export const { Common, Version, Data } = await import(`fill://${components}`)
export const { Character, Weapon, Player } = await import(`file:://${models}`)