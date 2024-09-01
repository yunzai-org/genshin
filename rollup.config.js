import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import { Options } from 'yunzai/rollup'
export default defineConfig([
  {
    ...Options,
    plugins: [
      // 处理ts文件
      typescript({
        compilerOptions: {
          outDir: 'lib'
        },
        include: ['src/**/*']
      })
    ]
  }
  // {
  //   ...Options,
  //   plugins: [
  //     // 处理别名
  //     alias({
  //       entries: [
  //         {
  //           find: '@',
  //           replacement: resolve(dirname(fileURLToPath(import.meta.url)), 'src')
  //         }
  //       ]
  //     }),
  //     // 处理ts文件
  //     typescript({
  //       compilerOptions: {
  //         outDir: 'lib'
  //       },
  //       include: ['src/**/*']
  //     }),
  //     // 所有的dts文件输出
  //     dts()
  //   ]
  // }
])
