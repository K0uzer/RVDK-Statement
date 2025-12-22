/**
 * Утилиты для preload критических ресурсов
 * 
 * Preload позволяет браузеру начать загрузку ресурсов заранее,
 * до того как они понадобятся
 */

/**
 * Добавляет preload для критических чанков
 * Вызывается после загрузки основного бандла
 */
export function preloadCriticalChunks() {
    // Критические чанки, которые нужны сразу после загрузки
    const criticalChunks = [
        // React vendor (всегда нужен)
        'react-vendor',
        // UI компоненты (используются на всех страницах)
        'ui-components',
        // API конфигурация (нужна для запросов)
        'api-config',
    ]

    criticalChunks.forEach((chunkName) => {
        // В production Vite генерирует имена чанков с хешами
        // Здесь мы добавляем preload для известных паттернов
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'script'
        link.href = `/assets/${chunkName}-[hash].js` // Vite заменит на реальный путь
        link.crossOrigin = 'anonymous'
        
        // Добавляем только если чанк ещё не загружен
        if (!document.querySelector(`link[href*="${chunkName}"]`)) {
            document.head.appendChild(link)
        }
    })
}

/**
 * Prefetch для следующих шагов формы (загружаем заранее)
 */
export function prefetchFormSteps() {
    // Prefetch для шагов формы, которые будут нужны вскоре
    const formSteps = [
        'form-steps', // Все шаги формы
    ]

    formSteps.forEach((chunkName) => {
        const link = document.createElement('link')
        link.rel = 'prefetch'
        link.as = 'script'
        link.href = `/assets/${chunkName}-[hash].js`
        link.crossOrigin = 'anonymous'
        
        if (!document.querySelector(`link[href*="${chunkName}"]`)) {
            document.head.appendChild(link)
        }
    })
}

