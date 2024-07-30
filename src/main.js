import { Client, createLogin, Loader } from 'yunzai'
setTimeout(async () => {
  await createLogin()
  await Client.run().then(async () => {
    /**
     * 调用接口
     * 解析 src/index.ts 为插件即可
     */

    // 加载插件
    await Loader.load()
  })
}, 0)
