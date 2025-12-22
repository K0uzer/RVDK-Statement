/**
 * Декларативная конфигурация начального экрана
 */

import type { RequestType } from '@/types'

/**
 * Конфигурация кнопки начального экрана
 */
export interface InitialScreenButton {
    label: string
    variant?: 'default' | 'outline'
    requestType: RequestType
    isReady?: boolean
}

/**
 * Конфигурация начального экрана
 */
export const INITIAL_SCREEN_CONFIG: InitialScreenButton[] = [
    {
        label: 'Подать заявку на ТУ',
        variant: 'default',
        requestType: 'tu',
        isReady: false,
    },
    {
        label: 'Подать заявку на договор подключения',
        variant: 'default',
        requestType: 'dp',
        isReady: false,
    },
    {
        label: 'Заявка ТУ готова (только документы)',
        variant: 'outline',
        requestType: 'tu',
        isReady: true,
    },
    {
        label: 'Заявка ДП готова (только документы)',
        variant: 'outline',
        requestType: 'dp',
        isReady: true,
    },
] as const

