/**
 * Хук для отправки заявки
 * 
 * FSD: features/submit-request/model - логика отправки заявки
 */

import { useState, useCallback } from 'react'
import { api } from '@/entities/request/api'
import { cleanFormData } from '@/shared/lib/form-utils'
import { handleError } from '@/shared/lib/error-handling'
import { getRequestTypeConfig } from '@/shared/config/requestTypes'
import { config } from '@/shared/config'
import type { RequestFormData, RequestType } from '@/entities/request'

interface UseSubmitRequestReturn {
    isSubmitting: boolean
    submitRequest: (data: RequestFormData, requestType: RequestType) => Promise<{ id: string } | null>
}

/**
 * Хук для отправки заявки на сервер
 */
export function useSubmitRequest(): UseSubmitRequestReturn {
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitRequest = useCallback(
        async (
            data: RequestFormData,
            requestType: RequestType,
        ): Promise<{ id: string } | null> => {
            setIsSubmitting(true)

            try {
                // Очищаем данные: пустые строки → null, пустые объекты → null
                const cleanedData = cleanFormData(
                    JSON.parse(JSON.stringify(data)),
                ) as RequestFormData

                console.log('Отправка данных:', cleanedData)

                // Декларативный выбор endpoint на основе конфигурации
                const requestConfig = getRequestTypeConfig(
                    {
                        createTcRequest: (data: unknown) =>
                            api.createTcRequest(data as RequestFormData),
                        createDpRequest: (data: unknown) =>
                            api.createDpRequest(data as RequestFormData),
                    },
                    config,
                )
                const currentConfig = requestConfig[requestType]

                const response = await currentConfig.endpoint(cleanedData)

                console.log('Успешно:', response)
                return response
            } catch (err: unknown) {
                // Декларативная обработка ошибок
                handleError(err)
                return null
            } finally {
                setIsSubmitting(false)
            }
        },
        [],
    )

    return {
        isSubmitting,
        submitRequest,
    }
}

