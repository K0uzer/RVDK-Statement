/**
 * Стили приложения
 * 
 * FSD: shared/styles - общие стили
 * 
 * Импортируются в правильном порядке:
 * 1. reset.css - сброс стилей браузера
 * 2. index.css - базовые стили приложения
 * 3. style.css - Tailwind CSS и темы
 */

// Сброс стилей браузера (загружается первым)
import './reset.css'

// Базовые стили приложения
import './index.css'

// Tailwind CSS и темы (загружается последним)
import './style.css'
