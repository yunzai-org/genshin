import { Client, createLogin, Loader } from 'yunzai'
setTimeout(async () => {
  await createLogin()
  await Client.run().then(async () => {
    // 加载插件
    await Loader.load()
  })
}, 0)
