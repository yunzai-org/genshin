import React from 'react'
import { createRequire, Picture } from 'react-puppeteer'
import { Help } from './component/index'
const require = createRequire(import.meta.url)
export class ScreenshotPicture extends Picture {
  constructor() {
    // 继承实例
    super()
    // 启动
    this.Pup.start()
  }
  /**
   *
   * @param uid
   * @param Props
   * @returns
   */
  getHelp(Props: Parameters<typeof Help>[0]) {
    // 生成 html 地址 或 html字符串
    return this.screenshot({
      join_dir: 'help',
      html_name: `help.html`,
      html_head: (
        <>
          <link rel="stylesheet" href={require('../../public/css/help.css')} />
        </>
      ),
      html_body: <Help {...Props} />
    })
  }
}
// 初始化 图片生成对象
export const Screenshot = new ScreenshotPicture()
