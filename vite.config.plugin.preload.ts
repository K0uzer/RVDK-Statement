/**
 * Vite плагин для автоматического добавления preload для критических чанков
 * 
 * Vite автоматически добавляет preload для entry chunks.
 * Этот плагин добавляет комментарии и может расширяться для дополнительных preload.
 */

import type { Plugin } from 'vite'

export function preloadCriticalChunks(): Plugin {
    return {
        name: 'preload-critical-chunks',
        transformIndexHtml(html: string) {
            // В production Vite уже автоматически добавляет preload для entry chunks
            // Мы добавляем только комментарий для документации
            
            // Добавляем комментарий о preload стратегии
            const preloadComment = `    <!-- Критические чанки (react-vendor, ui-components, api-config) предзагружаются автоматически Vite -->`
            
            if (!html.includes('Критические чанки')) {
                return html.replace(
                    '</head>',
                    `${preloadComment}\n  </head>`,
                )
            }
            
            return html
        },
    }
}

