/**
 * Декларативная обработка ошибок
 */

/**
 * Конфигурация обработки ошибки
 */
export interface ErrorHandlerConfig {
    extractMessage: (error: unknown) => string | null
    logError?: (error: unknown) => void
    showToUser?: (message: string) => void
}

/**
 * Стандартная конфигурация обработки ошибок API
 */
export const API_ERROR_HANDLER: ErrorHandlerConfig = {
    extractMessage: (error: unknown) => {
        const apiError = error as {
            response?: {
                data?: { message?: string; errors?: string[] }
                statusText?: string
            }
            message?: string
        }

        return (
            apiError.response?.data?.message ||
            apiError.response?.data?.errors?.[0] ||
            apiError.response?.statusText ||
            apiError.message ||
            null
        )
    },
    logError: (error: unknown) => {
        console.error('API Error:', error)
    },
    showToUser: (message: string) => {
        alert(`Ошибка: ${message}`)
    },
}

/**
 * Обрабатывает ошибку на основе конфигурации
 * 
 * @param error - Ошибка для обработки
 * @param config - Конфигурация обработчика
 * @returns Сообщение об ошибке или null
 */
export function handleError(
    error: unknown,
    config: ErrorHandlerConfig = API_ERROR_HANDLER,
): string {
    config.logError?.(error)
    const message = config.extractMessage(error) || 'Произошла ошибка'
    config.showToUser?.(message)
    return message
}

