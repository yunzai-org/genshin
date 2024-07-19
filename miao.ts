const components = '../miao-plugin/components/index.js'
const models = '../miao-plugin/models/index.js'
export const { Common, Version, Data } = await import(components)
export const { Character, Weapon, Player } = await import(models)