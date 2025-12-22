/**
 * Утилиты для регистрации Service Worker
 */

/**
 * Регистрирует Service Worker для кэширования ресурсов
 * Вызывается в main.tsx после монтирования приложения
 * 
 * Примечание: Service Worker работает только на HTTPS или localhost
 */
export function registerServiceWorker() {
    // Service Worker работает только на HTTPS или localhost
    const isSecureContext = 
        window.location.protocol === 'https:' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'

    if (!isSecureContext) {
        console.warn(
            '[SW] Service Worker requires HTTPS or localhost. Skipping registration.',
        )
        return
    }

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log(
                        '[SW] Service Worker registered:',
                        registration.scope,
                    )

                    // Проверяем обновления каждые 60 секунд
                    setInterval(() => {
                        registration.update()
                    }, 60000)

                    // Обработка обновлений
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (
                                    newWorker.state === 'installed' &&
                                    navigator.serviceWorker.controller
                                ) {
                                    // Новый Service Worker доступен
                                    console.log(
                                        '[SW] New service worker available',
                                    )
                                    // Можно показать уведомление пользователю
                                }
                            })
                        }
                    })
                })
                .catch((error) => {
                    console.error('[SW] Service Worker registration failed:', error)
                })
        })
    }
}

/**
 * Отменяет регистрацию Service Worker (для разработки)
 */
export function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister()
        })
    }
}

