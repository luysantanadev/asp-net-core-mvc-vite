import {defineConfig} from 'vite'
import path from 'path'
import fg from 'fast-glob'
import {viteStaticCopy} from 'vite-plugin-static-copy'

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
        viteStaticCopy({
            targets: [
                {
                    src: path.resolve(__dirname, 'wwwroot/src/img/**/*'),
                    dest: path.resolve(__dirname, 'wwwroot/dist/img')
                },
                // {
                //     src: path.resolve(__dirname, 'wwwroot/src/fonts/*'),
                //     dest: path.resolve(__dirname, 'wwwroot/dist/fonts')
                // }
            ]
        })
    ]
})
