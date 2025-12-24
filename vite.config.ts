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
                    // ВАЖНО: Порядок проверок критичен для правильной загрузки зависимостей
                    
                    // 1. React и React DOM в отдельный чанк (загружается первым)
                    if (id.includes('react') || id.includes('react-dom')) {
                        return 'react-vendor'
                    }

                    // 2. Все Radix UI компоненты (зависят от React)
                    if (id.includes('@radix-ui')) {
                        return 'radix-ui'
                    }

                    // 3. Axios и HTTP-логика (не зависит от React)
                    if (id.includes('axios')) {
                        return 'http-client'
                    }

                    // 4. React-специфичные библиотеки (должны загружаться после React)
                    // Библиотеки, которые явно зависят от React
                    const reactDependentLibs = [
                        'react-hook-form',
                        'react-dropzone',
                        'react-day-picker',
                        'react-resizable-panels',
                        'embla-carousel-react',
                        'recharts',
                        'sonner',
                        'next-themes',
                        'lucide-react',
                        'class-variance-authority',
                        'tailwind-merge',
                        'cmdk',
                        'input-otp',
                        'vaul',
                    ]
                    
                    // Если библиотека зависит от React, включаем её в react-vendor
                    // чтобы гарантировать, что React загрузится первым
                    if (reactDependentLibs.some(lib => id.includes(lib))) {
                        return 'react-vendor'
                    }

                    // 5. UI компоненты (shadcn) - зависят от React
                    if (id.includes('/components/ui/')) {
                        return 'ui-components'
                    }

                    // 6. Формы заявителей
                    if (id.includes('/components/forms/')) {
                        return 'form-components'
                    }

                    // 7. Шаги формы (lazy loaded)
                    if (id.includes('/components/FirstStepOfForm') ||
                        id.includes('/components/TwoStepOfAccordion') ||
                        id.includes('/components/ThreeStepOfGroupButton') ||
                        id.includes('/components/ForeStepOfInfoObj') ||
                        id.includes('/components/DocumentsUploadForm') ||
                        id.includes('/components/SuccessPage')) {
                        return 'form-steps'
                    }

                    // 8. Утилиты и константы
                    if (id.includes('/utils/') || id.includes('/constants/')) {
                        return 'utils'
                    }

                    // 9. API и конфигурация
                    if (id.includes('/api/') || id.includes('/config/')) {
                        return 'api-config'
                    }

                    // 10. Хуки
                    if (id.includes('/hooks/')) {
                        return 'hooks'
                    }

                    // 11. Остальные node_modules
                    // ВАЖНО: По умолчанию все библиотеки из node_modules идут в react-vendor,
                    // кроме явно не-React библиотек (axios, date-fns, zod, tailwindcss)
                    // Это гарантирует, что React загрузится первым
                    if (id.includes('node_modules')) {
                        // Список библиотек, которые точно НЕ зависят от React
                        const nonReactLibs = ['axios', 'date-fns', 'zod', 'tailwindcss']
                        
                        // Если это не-React библиотека, идем в vendor
                        if (nonReactLibs.some(lib => id.includes(lib))) {
                            return 'vendor'
                        }
                        
                        // Все остальные библиотеки из node_modules идут в react-vendor
                        // чтобы гарантировать правильный порядок загрузки
                        return 'react-vendor'
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
