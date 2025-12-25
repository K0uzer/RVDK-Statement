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
                    if (id.includes('/shared/ui/') && !id.includes('/shared/ui/forms/') && !id.includes('/shared/ui/FirstStepOfForm') && !id.includes('/shared/ui/ForeStepOfInfoObj') && !id.includes('/shared/ui/SuccessPage') && !id.includes('/shared/ui/TwoStepOfAccordion')) {
                        return 'ui-components'
                    }

                    // 6. Формы заявителей
                    if (id.includes('/shared/ui/forms/')) {
                        return 'form-components'
                    }

                    // 7. FSD слои - widgets
                    if (id.includes('/widgets/')) {
                        return 'widgets'
                    }

                    // 8. FSD слои - features
                    if (id.includes('/features/')) {
                        return 'features'
                    }

                    // 9. FSD слои - pages
                    if (id.includes('/pages/')) {
                        return 'pages'
                    }

                    // 10. Шаги формы (legacy, lazy loaded)
                    if (id.includes('/shared/ui/FirstStepOfForm') ||
                        id.includes('/shared/ui/TwoStepOfAccordion') ||
                        id.includes('/shared/ui/ForeStepOfInfoObj') ||
                        id.includes('/shared/ui/DocumentsUploadForm') ||
                        id.includes('/shared/ui/SuccessPage') ||
                        id.includes('/shared/ui/ClientInfoStep') ||
                        id.includes('/shared/ui/DialogForm')) {
                        return 'form-steps'
                    }

                    // 11. FSD слои - entities
                    if (id.includes('/entities/')) {
                        return 'entities'
                    }

                    // 12. FSD слои - shared
                    if (id.includes('/shared/')) {
                        return 'shared'
                    }

                    // 13. Утилиты и константы (legacy)
                    if (id.includes('/utils/') || id.includes('/constants/')) {
                        return 'utils'
                    }

                    // 14. API и конфигурация (legacy)
                    if (id.includes('/api/') || id.includes('/config/')) {
                        return 'api-config'
                    }

                    // 15. Хуки (legacy)
                    if (id.includes('/hooks/')) {
                        return 'hooks'
                    }

                    // 11. Остальные node_modules
                    // ВАЖНО: По умолчанию все библиотеки из node_modules идут в react-vendor,
                    // кроме явно не-React библиотек (axios уже обработан выше)
                    // Это гарантирует, что React загрузится первым
                    if (id.includes('node_modules')) {
                        // Список библиотек, которые точно НЕ зависят от React
                        // axios уже обработан выше, остальные идут в react-vendor
                        const nonReactLibs = ['date-fns', 'zod', 'tailwindcss', '@tailwindcss']
                        
                        // Если это не-React библиотека, объединяем с другими утилитами
                        if (nonReactLibs.some(lib => id.includes(lib))) {
                            // Не создаем отдельный vendor чанк, отправляем в react-vendor
                            // чтобы избежать пустых чанков
                            return 'react-vendor'
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
                   
                   // ==================== FSD СЛОИ ====================
                   // Основные FSD алиасы (рекомендуется использовать)
                   '@/app': path.resolve(__dirname, './src/app'),
                   '@/pages': path.resolve(__dirname, './src/pages'),
                   '@/widgets': path.resolve(__dirname, './src/widgets'),
                   '@/features': path.resolve(__dirname, './src/features'),
                   '@/entities': path.resolve(__dirname, './src/entities'),
                   '@/shared': path.resolve(__dirname, './src/shared'),
                   
                   // ==================== СТАРЫЕ АЛИАСЫ ====================
                   // @deprecated Используйте FSD алиасы вместо этих
                   // Оставлены для обратной совместимости
                   '@/assets': path.resolve(__dirname, './src/assets'),
                   '@/styles': path.resolve(__dirname, './src/styles'),
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
