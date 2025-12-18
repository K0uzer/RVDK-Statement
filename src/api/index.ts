/**
 * =============================================================================
 * API СЕРВИС
 * Модуль для взаимодействия с бэкендом АО «Ростовводоканал»
 * =============================================================================
 * 
 * Базовый URL настраивается через переменную окружения VITE_API_URL
 * или берётся из конфига по умолчанию.
 * 
 * ENDPOINTS:
 * - GET  /Providing/get-providings      → Список услуг подключения
 * - GET  /RequestReason/get-request-reasons → Список оснований обращения
 * - POST /Request/create-tc-request     → Создание заявки на ТУ
 * - POST /Request/create-dp-request     → Создание заявки на ДП
 * 
 * @module api
 */

import axios, { AxiosError, AxiosInstance } from 'axios'
import { config } from '@/config'
import type { ServiceT, AccordionT, RequestFormData } from '@/types'

// ==================== НАСТРОЙКА AXIOS ====================

/**
 * Инстанс axios с преднастроенными параметрами
 * 
 * - baseURL: берётся из конфигурации (см. src/config/index.ts)
 * - headers: JSON по умолчанию
 * - timeout: 30 секунд для избежания бесконечного ожидания
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 секунд
})

/**
 * Интерцептор ответов для централизованной обработки ошибок
 * 
 * При ошибке:
 * 1. Логирует детали в консоль
 * 2. Пробрасывает ошибку дальше для обработки в компонентах
 */
apiClient.interceptors.response.use(
    // Успешный ответ — просто возвращаем
    (response) => response,
    // Ошибка — логируем и пробрасываем
    (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    },
)

// ==================== API МЕТОДЫ ====================

/**
 * Объект с методами API
 * Использование: import { api } from '@/api'; await api.getProvidingServices()
 */
export const api = {
    /**
     * Получить список услуг подключения
     * 
     * Возвращает массив услуг для выпадающего списка на Шаге 1:
     * - Новое подключение
     * - Подключение к сетям смежного владельца
     * - Реконструкция сетей
     * - И т.д.
     * 
     * @returns Promise<ServiceT[]> - Массив услуг
     */
    async getProvidingServices(): Promise<ServiceT[]> {
        const response = await apiClient.get<ServiceT[]>(
            config.api.endpoints.providings,
        )
        return response.data
    },

    /**
     * Получить список оснований обращения
     * 
     * Возвращает массив оснований для Шага 2:
     * - Правообладатель земельного участка
     * - Лицо с разрешением на использование земель
     * - Лицо с договором о комплексном развитии
     * - И т.д.
     * 
     * @returns Promise<AccordionT[]> - Массив оснований
     */
    async getRequestReasons(): Promise<AccordionT[]> {
        const response = await apiClient.get<AccordionT[]>(
            config.api.endpoints.requestReasons,
        )
        return response.data
    },

    /**
     * Создать заявку на технические условия (ТУ)
     * 
     * Отправляет полную форму заявки на сервер.
     * Срок рассмотрения: 7 рабочих дней
     * 
     * @param data - Данные формы (очищенные от пустых значений)
     * @returns Promise<{ id: string }> - ID созданной заявки
     */
    async createTcRequest(data: RequestFormData): Promise<{ id: string }> {
        const response = await apiClient.post(
            config.api.endpoints.createTcRequest,
            data,
        )
        return response.data
    },

    /**
     * Создать заявку на договор подключения (ДП)
     * 
     * Отправляет полную форму заявки на сервер.
     * Срок рассмотрения: 20 рабочих дней
     * 
     * @param data - Данные формы (очищенные от пустых значений)
     * @returns Promise<{ id: string }> - ID созданной заявки
     */
    async createDpRequest(data: RequestFormData): Promise<{ id: string }> {
        const response = await apiClient.post(
            config.api.endpoints.createDpRequest,
            data,
        )
        return response.data
    },
}

export default api
