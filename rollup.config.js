import typescript from '@rollup/plugin-typescript'
import { defineConfig as createConfig } from 'yunzai/rollup'
export default createConfig({
  plugins: [
    typescript({
      compilerOptions: {
        declaration: true,
        declarationDir: 'lib/types'
      },
      include: ['src/**/*']
    })
  ]
})
