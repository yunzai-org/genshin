import React from 'react'
import { createRequire, render } from 'react-puppeteer'
import { Help } from './component/index'
const require = createRequire(import.meta.url)
export const Options = {
  html_head: (
    <link
      rel="stylesheet"
      href={require('../../resources/assets/css/help.css')}
    />
  )
}
export const screenshotRender = (Props: Parameters<typeof Help>[0]) => {
  // 生成 html 地址 或 html字符串
  return render({
    join_dir: 'help',
    html_name: `help.html`,
    ...Options,
    html_body: <Help {...Props} />
  })
}
