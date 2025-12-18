import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

// Определяем режим сборки для legacy
const isLegacyBuild = process.env.LEGACY_BUILD === 'true'

export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
        tailwindcss(),
        // Плагин для legacy браузеров (включается при LEGACY_BUILD=true)
        isLegacyBuild &&
            legacy({
                // Целевые браузеры для legacy-бандла
                targets: [
                    '> 0.5%',
                    'last 2 versions',
                    'Firefox ESR',
                    'not dead',
                    'IE 11',
                ],
                // Полифилы для старых браузеров
                additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
                // Генерировать современный и legacy бандлы
                modernPolyfills: true,
                // Полифилы для современных браузеров (опционально)
                polyfills: [
                    'es.symbol',
                    'es.symbol.description',
                    'es.symbol.async-iterator',
                    'es.symbol.iterator',
                    'es.array.iterator',
                    'es.array.from',
                    'es.array.includes',
                    'es.array.flat',
                    'es.array.flat-map',
                    'es.object.assign',
                    'es.object.entries',
                    'es.object.from-entries',
                    'es.object.values',
                    'es.promise',
                    'es.promise.finally',
                    'es.string.includes',
                    'es.string.starts-with',
                    'es.string.ends-with',
                    'es.string.pad-start',
                    'es.string.pad-end',
                    'es.string.trim-start',
                    'es.string.trim-end',
                    'es.map',
                    'es.set',
                    'es.weak-map',
                    'es.weak-set',
                    'web.dom-collections.for-each',
                    'web.dom-collections.iterator',
                ],
            }),
    ].filter(Boolean),

    build: {
        // Целевая версия для современных браузеров (legacy plugin сам управляет target)
        target: isLegacyBuild ? undefined : 'esnext',
        // Минификация через terser (требуется для legacy)
        minify: isLegacyBuild ? 'terser' : 'esbuild',
        // Настройки terser
        terserOptions: isLegacyBuild
            ? {
                  compress: {
                      drop_console: true, // Удалить console.log в продакшене
                      drop_debugger: true,
                  },
                  format: {
                      comments: false, // Удалить комментарии
                  },
              }
            : undefined,
        // Разделение чанков
        rollupOptions: {
            output: {
                manualChunks: {
                    // Выносим React в отдельный чанк
                    react: ['react', 'react-dom'],
                    // Выносим UI-библиотеки
                    'radix-ui': [
                        '@radix-ui/react-accordion',
                        '@radix-ui/react-checkbox',
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-select',
                        '@radix-ui/react-tabs',
                    ],
                },
            },
        },
        // Размер предупреждений
        chunkSizeWarningLimit: 1000,
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@/lib': path.resolve(__dirname, './src/lib'),
            '@/hooks': path.resolve(__dirname, './src/hooks'),
            '@/components': path.resolve(__dirname, './src/components'),
            '@/assets': path.resolve(__dirname, './src/assets'),
            '@/styles': path.resolve(__dirname, './src/styles'),
            '@/config': path.resolve(__dirname, './src/config'),
            '@/constants': path.resolve(__dirname, './src/constants'),
            '@/types': path.resolve(__dirname, './src/types'),
            '@/utils': path.resolve(__dirname, './src/utils'),
            '@/api': path.resolve(__dirname, './src/api'),
        },
    },

    // Настройки для dev-сервера
    server: {
        port: 3000,
        open: true,
    },

    // Настройки preview-сервера
    preview: {
        port: 4173,
    },
})
