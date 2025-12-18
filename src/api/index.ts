/**
 * API сервис для работы с бэкендом
 */

import axios, { AxiosError, AxiosInstance } from 'axios'
import { config } from '@/config'
import type { ServiceT, AccordionT, RequestFormData } from '@/types'

// Создаём инстанс axios с базовыми настройками
const apiClient: AxiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000,
})

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message)
        return Promise.reject(error)
    },
)

/**
 * API методы
 */
export const api = {
    /**
     * Получить список услуг подключения
     */
    async getProvidingServices(): Promise<ServiceT[]> {
        const response = await apiClient.get<ServiceT[]>(
            config.api.endpoints.providings,
        )
        return response.data
    },

    /**
     * Получить список оснований обращения
     */
    async getRequestReasons(): Promise<AccordionT[]> {
        const response = await apiClient.get<AccordionT[]>(
            config.api.endpoints.requestReasons,
        )
        return response.data
    },

    /**
     * Создать заявку на ТУ
     */
    async createTcRequest(data: RequestFormData): Promise<{ id: string }> {
        const response = await apiClient.post(
            config.api.endpoints.createTcRequest,
            data,
        )
        return response.data
    },

    /**
     * Создать заявку на ДП
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

