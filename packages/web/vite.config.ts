import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

// let internalComponents = new Set(['ElProTable'])
// function isInternalComponent(name: string): boolean {
//   return internalComponents.has(name)
// }

export const ultraResolver: ComponentResolver[] = [
  {
    type: 'component',
    resolve: async (name: string) => {
      if (!name.startsWith('El')) return

      // 解决组件的迁移问题
      // if (isInternalComponent(name)) {
      //   return { name, from: '@/components' }
      // }

      const partialName = kebabCase(name.slice(2)) // ElTable -> table
      return {
        name,
        from: `element-ultra`,
        sideEffects: `element-ultra/components/${partialName}/style/index.mjs`
      }
    }
  },
  {
    type: 'directive',
    resolve: async (name: string) => {
      const directives: Record<
        string,
        { importName: string; styleName: string }
      > = {
        Loading: { importName: 'ElLoadingDirective', styleName: 'loading' },
        Popover: { importName: 'ElPopoverDirective', styleName: 'popover' },
        InfiniteScroll: {
          importName: 'ElInfiniteScroll',
          styleName: 'infinite-scroll'
        }
      }
      const directive = directives[name]
      if (!directive) return

      return {
        name: directive.importName,
        from: 'element-ultra',
        sideEffects: `element-ultra/components/${directive.styleName}/style/index.mjs`
      }
    }
  }
]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: false,
      include: [/\.vue$/, /\.tsx?$/],
      resolvers: [...ultraResolver]
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://43.132.166.200:22333',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
    host: true
  }
})
