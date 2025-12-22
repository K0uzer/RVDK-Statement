// Полифилы для старых браузеров (загружаются первыми)
import './polyfills'

import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/style.css'
import App from './App.tsx'
import { registerServiceWorker } from './utils/serviceWorker'

// Проверка поддержки браузера
const checkBrowserSupport = () => {
    const isLegacyBrowser =
        !window.fetch ||
        !window.Promise ||
        !Array.prototype.includes ||
        !Object.assign

    if (isLegacyBrowser) {
        console.warn(
            'Обнаружен устаревший браузер. Некоторые функции могут работать некорректно.',
        )
    }
}

checkBrowserSupport()

// Ждем полной загрузки DOM перед монтированием
const initApp = () => {
    const rootElement = document.getElementById('root')
    
    if (!rootElement) {
        console.error('[App] Root element not found!')
        // Показываем сообщение об ошибке пользователю
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; text-align: center;">
                <div>
                    <h1 style="color: #dc2626; margin-bottom: 16px;">Ошибка инициализации приложения</h1>
                    <p style="color: #6b7280; margin-bottom: 24px;">Не удалось найти корневой элемент. Пожалуйста, обновите страницу.</p>
                    <button onclick="window.location.reload()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Обновить страницу
                    </button>
                </div>
            </div>
        `
        return
    }
    
    try {
        console.log('[App] Mounting React application...')
        createRoot(rootElement).render(<App />)
        console.log('[App] React application mounted successfully')
        
        // Регистрируем Service Worker для кэширования (только в production)
        if (import.meta.env.PROD) {
            registerServiceWorker()
        }
    } catch (error) {
        console.error('[App] Error mounting React application:', error)
        rootElement.innerHTML = `
            <div style="padding: 20px; text-align: center;">
                <h2 style="color: #dc2626; margin-bottom: 16px;">Ошибка загрузки приложения</h2>
                <p style="color: #6b7280; margin-bottom: 24px;">${error instanceof Error ? error.message : 'Неизвестная ошибка'}</p>
                <button onclick="window.location.reload()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Обновить страницу
                </button>
            </div>
        `
    }
}

// Запускаем приложение после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp)
} else {
    // DOM уже загружен
    initApp()
}
