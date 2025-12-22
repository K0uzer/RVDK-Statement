/**
 * Декларативная конфигурация вкладок типов заявителей
 */

import type { ClientType } from '@/types'
import type { ComponentType } from 'react'

/**
 * Конфигурация одной вкладки типа заявителя
 */
export interface ClientTabConfig {
    value: string
    label: string
    clientType: ClientType
    component: ComponentType<any>
}

/**
 * Маппинг значений вкладок на типы клиентов
 */
export const CLIENT_TYPE_MAP: Record<string, ClientType> = {
    fiz: 'individual',
    ur: 'legal',
    ind: 'ip',
    gos: 'gov',
} as const

/**
 * Конфигурация всех вкладок заявителей
 * 
 * @param components - Компоненты форм для каждого типа заявителя
 * @returns Массив конфигураций вкладок
 */
export function createClientTabsConfig(components: {
    IndividualClientForm: ComponentType<any>
    LegalClientForm: ComponentType<any>
    IPClientForm: ComponentType<any>
    GovClientForm: ComponentType<any>
}): ClientTabConfig[] {
    return [
        {
            value: 'fiz',
            label: 'Физ. лица',
            clientType: 'individual',
            component: components.IndividualClientForm,
        },
        {
            value: 'ur',
            label: 'Юр. лица',
            clientType: 'legal',
            component: components.LegalClientForm,
        },
        {
            value: 'ind',
            label: 'Индивидуальный предпр.',
            clientType: 'ip',
            component: components.IPClientForm,
        },
        {
            value: 'gos',
            label: 'Орган гос. власти',
            clientType: 'gov',
            component: components.GovClientForm,
        },
    ]
}

