/**
 * Конфигурация приложения
 * 
 * FSD: shared/config - общие конфигурации
 */

export const config = {
    api: {
        baseUrl: import.meta.env.VITE_API_URL || 'http://172.201.236.227:82/api',
        endpoints: {
            providings: '/Providing/get-providings',
            requestReasons: '/RequestReason/get-request-reasons',
            createTcRequest: '/Request/create-tc-request',
            createDpRequest: '/Request/create-dp-request',
        },
    },
    /**
     * Сроки обработки заявок (рабочие дни)
     */
    processing: {
        tu: {
            statusUpdate: 3, // дней до обновления статуса
            response: 7, // дней до ответа
        },
        dp: {
            statusUpdate: 3,
            response: 20,
        },
    },
} as const

export type Config = typeof config

