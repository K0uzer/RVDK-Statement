/**
 * Декларативная конфигурация типов заявок
 */

import type { RequestType } from '@/entities/request'

/**
 * Конфигурация типа заявки
 */
export interface RequestTypeConfig {
    type: RequestType
    label: string
    description: string
    processingDays: number
    responseDays: number
    endpoint: (data: unknown) => Promise<{ id: string }>
}

/**
 * Конфигурация всех типов заявок
 */
export function getRequestTypeConfig(
    api: {
        createTcRequest: (data: unknown) => Promise<{ id: string }>
        createDpRequest: (data: unknown) => Promise<{ id: string }>
    },
    config: {
        processing: {
            tu: { statusUpdate: number; response: number }
            dp: { statusUpdate: number; response: number }
        }
    },
): Record<RequestType, RequestTypeConfig> {
    return {
        tu: {
            type: 'tu',
            label: 'Технические условия',
            description: 'Заявка на получение технических условий',
            processingDays: config.processing.tu.statusUpdate,
            responseDays: config.processing.tu.response,
            endpoint: api.createTcRequest,
        },
        dp: {
            type: 'dp',
            label: 'Договор подключения',
            description: 'Заявка на заключение договора о подключении',
            processingDays: config.processing.dp.statusUpdate,
            responseDays: config.processing.dp.response,
            endpoint: api.createDpRequest,
        },
    }
}

