/**
 * Service Worker для кэширования статических ресурсов
 * 
 * Стратегия кэширования:
 * - Статические ресурсы (JS, CSS) - Cache First
 * - API запросы - Network First
 * - Изображения - Cache First с fallback
 */

const CACHE_NAME = 'rvdk-statement-v1'
const STATIC_CACHE_NAME = 'rvdk-statement-static-v1'

// Ресурсы для предварительного кэширования
const PRECACHE_RESOURCES = [
    '/',
    '/index.html',
    // Критические чанки будут добавлены автоматически при сборке
]

// Установка Service Worker
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...')
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            console.log('[SW] Precaching static resources')
            return cache.addAll(PRECACHE_RESOURCES)
        })
    )
    self.skipWaiting() // Активировать сразу
})

// Активация Service Worker
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...')
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => {
                        // Удаляем старые кэши
                        return (
                            name !== CACHE_NAME &&
                            name !== STATIC_CACHE_NAME
                        )
                    })
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name)
                        return caches.delete(name)
                    })
            )
        })
    )
    return self.clients.claim() // Взять контроль над всеми страницами
})

// Перехват запросов
self.addEventListener('fetch', (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Пропускаем запросы к API (они должны идти напрямую)
    if (url.pathname.startsWith('/api/')) {
        return // Пропускаем, не кэшируем API
    }

    // Стратегия для статических ресурсов (JS, CSS)
    if (
        request.destination === 'script' ||
        request.destination === 'style' ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.css')
    ) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse
                }
                return fetch(request).then((response) => {
                    // Кэшируем только успешные ответы
                    if (response.status === 200) {
                        const responseToCache = response.clone()
                        caches.open(STATIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseToCache)
                        })
                    }
                    return response
                })
            })
        )
        return
    }

    // Стратегия для HTML (Network First)
    if (request.destination === 'document' || url.pathname.endsWith('.html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseToCache = response.clone()
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache)
                    })
                    return response
                })
                .catch(() => {
                    return caches.match(request)
                })
        )
        return
    }

    // Для остальных ресурсов (изображения и т.д.) - Cache First
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse
            }
            return fetch(request).then((response) => {
                if (response.status === 200) {
                    const responseToCache = response.clone()
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseToCache)
                    })
                }
                return response
            })
        })
    )
})

