import { join } from 'path'
/**
 * ************
 * 依赖于喵喵插件
 * ************
 */
const components = join(
  process.cwd(),
  './plugins/miao-plugin/components/index.js'
)
const models = join(process.cwd(), './plugins/miao-plugin/models/index.js')
export const { Common, Version, Data } = await import(`file://${components}`)
export const { Character, Weapon, Player } = await import(`file://${models}`)
