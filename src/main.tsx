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

const rootElement = document.getElementById('root')

if (rootElement) {
    createRoot(rootElement).render(<App />)
    
    // Регистрируем Service Worker для кэширования (только в production)
    if (import.meta.env.PROD) {
        registerServiceWorker()
    }
} else {
    console.error('Root element not found')
}
