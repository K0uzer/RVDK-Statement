/**
 * Константы для компонентов FirstStepOfForm
 */

import { PROVIDING_TYPES } from '@/constants/services'

/**
 * Базовые опции для выбора типа подключения (водоснабжение/водоотведение)
 */
export const WATER_OPTIONS = [
    {
        id: 'water-supply',
        label: 'Водоснабжения',
        value: 'Водоснабжения',
        providingType: PROVIDING_TYPES.WATER_SUPPLY as 0 | 1,
    },
    {
        id: 'water-disposal',
        label: 'Водоотведения',
        value: 'Водоотведения',
        providingType: PROVIDING_TYPES.WATER_DISPOSAL as 0 | 1,
    },
]

/**
 * Опции для нового подключения
 */
export const NEW_CONNECTION_OPTIONS = [
    {
        id: 'cold-water',
        label: 'К сетям холодного водоснабжения',
        value: 'К сетям холодного водоснабжения',
        providingType: PROVIDING_TYPES.WATER_SUPPLY as 0 | 1,
    },
    {
        id: 'sewerage',
        label: 'Водоотведения',
        value: 'Водоотведения',
        providingType: PROVIDING_TYPES.WATER_DISPOSAL as 0 | 1,
    },
]

/**
 * Опции для установки приборов учета
 */
export const METER_OPTIONS = [
    { id: 'meter-water', label: 'Воды', value: 'Воды' },
    { id: 'meter-sewerage', label: 'Сточных вод', value: 'Сточных вод' },
]

