import {defineConfig, normalizePath} from 'vite'
import path from 'path'
import fg from 'fast-glob'
import {viteStaticCopy} from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'

const entradas = fg.sync('wwwroot/src/js/**/*.js').reduce((entrada, file) => {
    const nomeArquivo = file
        .replace('wwwroot/src/js/', '')
        .replace(/\.js$/, '')
    entrada[nomeArquivo] = path.resolve(__dirname, file)
    return entrada
}, {})

export default defineConfig({
    appType: 'custom',
    root: 'wwwroot/src',
    base: '/dist/',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        manifest: true,
        assetsDir: '',
        rollupOptions: {
            input: entradas
        }
    },
    server: {
        port: 5173,
        strictPort: true,
        cors: {
            origin: "*",
        }
    },
    plugins: [
        vue(),
        viteStaticCopy({
            targets: [
                {
                    src: normalizePath(path.resolve(__dirname, './wwwroot/src/img/**/*')),
                    dest: normalizePath(path.resolve(__dirname, './wwwroot/dist/img'))
                },
                // {
                //     src: path.resolve(__dirname, 'wwwroot/src/fonts/*'),
                //     dest: path.resolve(__dirname, 'wwwroot/dist/fonts')
                // }
            ]
        })
    ]
})
