import { defineConfig } from 'vite'
import path from 'path'
import fg from 'fast-glob'

const input = fg.sync('wwwroot/src/js/**/*.js').reduce((entries, file) => {
    // Remove o prefixo e extensão para nomear a entrada
    const name = file
        .replace('wwwroot/src/js/', '')
        .replace(/\.js$/, '')
    entries[name] = path.resolve(__dirname, file)
    return entries
}, {})

export default defineConfig({
    root: 'wwwroot/src',
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        manifest: true,
        assetsDir: '.',
        rollupOptions: {
            input
        }
    },
    server: {
        origin: 'https://localhost:5001',
        port: 5173,
        strictPort: true,
        cors: {
            origin: "*",
        }
    }
})
