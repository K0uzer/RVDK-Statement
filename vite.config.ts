import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'
import { preloadCriticalChunks } from './vite.config.plugin.preload'

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
        // Плагин для автоматического preload критических чанков
        preloadCriticalChunks(),
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
        // Разделение чанков для оптимизации загрузки
        rollupOptions: {
            output: {
                // Preload для критических чанков
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
                manualChunks: (id) => {
                    // React и React DOM в отдельный чанк
                    if (id.includes('react') || id.includes('react-dom')) {
                        return 'react-vendor'
                    }

                    // Все Radix UI компоненты в один чанк
                    if (id.includes('@radix-ui')) {
                        return 'radix-ui'
                    }

                    // Axios и HTTP-логика
                    if (id.includes('axios')) {
                        return 'http-client'
                    }

                    // UI компоненты (shadcn)
                    if (id.includes('/components/ui/')) {
                        return 'ui-components'
                    }

                    // Формы заявителей
                    if (id.includes('/components/forms/')) {
                        return 'form-components'
                    }

                    // Шаги формы (lazy loaded)
                    if (id.includes('/components/FirstStepOfForm') ||
                        id.includes('/components/TwoStepOfAccordion') ||
                        id.includes('/components/ThreeStepOfGroupButton') ||
                        id.includes('/components/ForeStepOfInfoObj') ||
                        id.includes('/components/DocumentsUploadForm') ||
                        id.includes('/components/SuccessPage')) {
                        return 'form-steps'
                    }

                    // Утилиты и константы
                    if (id.includes('/utils/') || id.includes('/constants/')) {
                        return 'utils'
                    }

                    // API и конфигурация
                    if (id.includes('/api/') || id.includes('/config/')) {
                        return 'api-config'
                    }

                    // Хуки
                    if (id.includes('/hooks/')) {
                        return 'hooks'
                    }

                    // Остальные node_modules
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
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
