import typescript from '@rollup/plugin-typescript'
import { defineConfig as createConfig } from 'yunzai/rollup'
import { defineConfig } from 'rollup'
const configs = createConfig({
  plugins: [
    typescript({
      compilerOptions: {
        declaration: true,
        declarationDir: 'lib/types'
      },
      include: ['src/**/*']
    })
  ],
})
export default defineConfig([
  {
    input: 'yunzai-mys/index.ts',
    file: 'yunzai-mys/index.js',
    include: ['yunzai-mys/**/*'],
    declaration: true,
    declarationDir: 'yunzai-mys/types',
    outDir: 'yunzai-mys/types'
  },
  {
    input: 'yunzai-mys/src/middleware.ts',
    file: 'yunzai-mys/middleware.js',
    include: ['yunzai-mys/src/middleware.ts'],
    declaration: false,
    declarationDir: undefined,
    outDir: undefined
  },
].map(item => {
  return {
    input: item.input,
    output: {
      file: item.file,
      format: 'es',
      sourcemap: false
    },
    plugins: [
      typescript({
        compilerOptions: {
          declaration: item.declaration,
          declarationDir: item.declarationDir,
          outDir: item.outDir
        },
        include: item.include,
        exclude: ['node_modules']
      })
    ],
    onwarn: (warning, warn) => {
      // 忽略与无法解析the导入相关the警告信息
      if (warning.code === 'UNRESOLVED_IMPORT') return
      // 继续使用默认the警告处理
      warn(warning)
    }
  }
}).concat(configs))

