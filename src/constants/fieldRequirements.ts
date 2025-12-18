/**
 * Конфигурация обязательных полей для каждого типа услуги
 * По ТЗ: разные подпункты требуют разный набор полей
 */

import { SERVICE_TITLES } from './services'

export type FieldRequirement = 'required' | 'optional' | 'allowZero' | 'hidden'

export interface FieldConfig {
    // Технические условия
    tcNumber: FieldRequirement
    tcDate: FieldRequirement

    // Основная информация об объекте
    name: FieldRequirement
    address: FieldRequirement
    cadastralNumber: FieldRequirement
    area: FieldRequirement
    height: FieldRequirement
    commissionDate: FieldRequirement

    // МКД и гостиницы
    floors: FieldRequirement
    flats: FieldRequirement
    settlers: FieldRequirement

    // Водоснабжение
    waterSupplyPerDay: FieldRequirement
    waterSupplyPerHour: FieldRequirement
    waterSupplyPerSecond: FieldRequirement

    // Водоотведение
    waterDisposalPerDay: FieldRequirement
    waterDisposalPerHour: FieldRequirement
    waterDisposalPerSecond: FieldRequirement

    // Пожаротушение
    firefightingInner: FieldRequirement
    firefightingAuto: FieldRequirement
    firefightingOuter: FieldRequirement

    // Смежный владелец
    adjacentOwnerAddress: FieldRequirement
    adjacentOwnerName: FieldRequirement
    adjacentOwnerCadastral: FieldRequirement

    // Дополнительно
    exploitationKind: FieldRequirement
    diameter: FieldRequirement
}

/**
 * Значения по умолчанию (всё опционально)
 */
const defaultConfig: FieldConfig = {
    tcNumber: 'optional',
    tcDate: 'optional',
    name: 'required',
    address: 'required',
    cadastralNumber: 'required',
    area: 'allowZero',
    height: 'optional',
    commissionDate: 'optional',
    floors: 'allowZero',
    flats: 'allowZero',
    settlers: 'allowZero',
    waterSupplyPerDay: 'allowZero',
    waterSupplyPerHour: 'allowZero',
    waterSupplyPerSecond: 'allowZero',
    waterDisposalPerDay: 'allowZero',
    waterDisposalPerHour: 'allowZero',
    waterDisposalPerSecond: 'allowZero',
    firefightingInner: 'optional',
    firefightingAuto: 'optional',
    firefightingOuter: 'optional',
    adjacentOwnerAddress: 'hidden',
    adjacentOwnerName: 'hidden',
    adjacentOwnerCadastral: 'hidden',
    exploitationKind: 'optional',
    diameter: 'hidden',
}

/**
 * Конфигурация полей для каждой услуги
 */
export const FIELD_REQUIREMENTS: Record<string, Partial<FieldConfig>> = {
    // Подпункт 1: Новое подключение
    [SERVICE_TITLES.NEW_CONNECTION]: {
        name: 'required',
        address: 'required',
        height: 'required',
        cadastralNumber: 'required',
        commissionDate: 'required',
        area: 'allowZero',
        floors: 'allowZero',
        settlers: 'allowZero',
        flats: 'allowZero',
        waterSupplyPerDay: 'allowZero',
        waterSupplyPerHour: 'allowZero',
        waterSupplyPerSecond: 'allowZero',
        waterDisposalPerDay: 'allowZero',
        waterDisposalPerHour: 'allowZero',
        waterDisposalPerSecond: 'allowZero',
        tcNumber: 'optional',
        firefightingInner: 'optional',
        firefightingAuto: 'optional',
        firefightingOuter: 'optional',
    },

    // Подпункт 2: Пожаротушение
    [SERVICE_TITLES.FIREFIGHTING]: {
        name: 'required',
        address: 'required',
        height: 'required',
        cadastralNumber: 'required',
        commissionDate: 'required',
        // Пожаротушение обязательно БЕЗ нулей
        firefightingInner: 'required',
        firefightingAuto: 'required',
        firefightingOuter: 'required',
        area: 'allowZero',
        floors: 'allowZero',
        settlers: 'allowZero',
        flats: 'allowZero',
        // Водоснабжение/водоотведение не обязательно
        waterSupplyPerDay: 'optional',
        waterSupplyPerHour: 'optional',
        waterSupplyPerSecond: 'optional',
        waterDisposalPerDay: 'optional',
        waterDisposalPerHour: 'optional',
        waterDisposalPerSecond: 'optional',
    },

    // Подпункт 3: Временное водоснабжение стройплощадки
    [SERVICE_TITLES.TEMPORARY_SUPPLY]: {
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        area: 'required',
        // Водоснабжение обязательно БЕЗ нулей
        waterSupplyPerDay: 'required',
        waterSupplyPerHour: 'required',
        waterSupplyPerSecond: 'required',
        // Остальное не обязательно
        height: 'optional',
        commissionDate: 'optional',
        floors: 'optional',
        flats: 'optional',
        settlers: 'optional',
        waterDisposalPerDay: 'optional',
        waterDisposalPerHour: 'optional',
        waterDisposalPerSecond: 'optional',
        firefightingInner: 'optional',
        firefightingAuto: 'optional',
        firefightingOuter: 'optional',
    },

    // Подпункт 4 и 9: Реконструкция / Вынос сетей
    [SERVICE_TITLES.RECONSTRUCTION]: {
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        area: 'required',
        diameter: 'required',
        // Остальное не обязательно
        height: 'optional',
        commissionDate: 'optional',
        floors: 'optional',
        flats: 'optional',
        settlers: 'optional',
        waterSupplyPerDay: 'optional',
        waterSupplyPerHour: 'optional',
        waterSupplyPerSecond: 'optional',
        waterDisposalPerDay: 'optional',
        waterDisposalPerHour: 'optional',
        waterDisposalPerSecond: 'optional',
    },

    [SERVICE_TITLES.NETWORK_REMOVAL]: {
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        area: 'required',
        diameter: 'required',
        height: 'optional',
        commissionDate: 'optional',
        floors: 'optional',
        flats: 'optional',
        settlers: 'optional',
    },

    // Подпункт 5: Подключение к сетям смежного владельца
    [SERVICE_TITLES.ADJACENT_OWNER]: {
        name: 'required',
        address: 'required',
        height: 'required',
        cadastralNumber: 'required',
        commissionDate: 'required',
        // Смежный владелец ОБЯЗАТЕЛЕН
        adjacentOwnerAddress: 'required',
        adjacentOwnerName: 'required',
        adjacentOwnerCadastral: 'allowZero',
        area: 'allowZero',
        floors: 'allowZero',
        settlers: 'allowZero',
        flats: 'allowZero',
        waterSupplyPerDay: 'allowZero',
        waterSupplyPerHour: 'allowZero',
        waterSupplyPerSecond: 'allowZero',
        waterDisposalPerDay: 'allowZero',
        waterDisposalPerHour: 'allowZero',
        waterDisposalPerSecond: 'allowZero',
        firefightingInner: 'optional',
        firefightingAuto: 'optional',
        firefightingOuter: 'optional',
    },

    // Подпункт 6: Подключение к внутридворовым сетям
    [SERVICE_TITLES.YARD_NETWORKS]: {
        name: 'required',
        address: 'required',
        height: 'required',
        cadastralNumber: 'required',
        commissionDate: 'required',
        area: 'allowZero',
        floors: 'allowZero',
        settlers: 'allowZero',
        flats: 'allowZero',
        waterSupplyPerDay: 'allowZero',
        waterSupplyPerHour: 'allowZero',
        waterSupplyPerSecond: 'allowZero',
        waterDisposalPerDay: 'allowZero',
        waterDisposalPerHour: 'allowZero',
        waterDisposalPerSecond: 'allowZero',
    },

    // Подпункт 7 и 8: Корректировка / Аннулирование ТУ
    [SERVICE_TITLES.CORRECTION]: {
        tcNumber: 'required',
        tcDate: 'required',
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        // Остальное не обязательно
        height: 'optional',
        area: 'optional',
        commissionDate: 'optional',
        floors: 'optional',
        flats: 'optional',
        settlers: 'optional',
        waterSupplyPerDay: 'optional',
        waterDisposalPerDay: 'optional',
    },

    [SERVICE_TITLES.ANNULMENT]: {
        tcNumber: 'required',
        tcDate: 'required',
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        height: 'optional',
        area: 'optional',
        commissionDate: 'optional',
    },

    // Подпункт 10: Установка прибора учета
    [SERVICE_TITLES.METER_INSTALLATION]: {
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        area: 'required',
        // Водоснабжение обязательно БЕЗ нулей
        waterSupplyPerDay: 'required',
        waterSupplyPerHour: 'required',
        waterSupplyPerSecond: 'required',
        height: 'optional',
        commissionDate: 'optional',
        floors: 'optional',
        flats: 'optional',
        settlers: 'optional',
    },

    // Подпункт 11: Иное
    [SERVICE_TITLES.OTHER]: {
        name: 'required',
        address: 'required',
        cadastralNumber: 'required',
        // Всё остальное не обязательно
        height: 'optional',
        area: 'optional',
        commissionDate: 'optional',
        floors: 'optional',
        flats: 'optional',
        settlers: 'optional',
        waterSupplyPerDay: 'optional',
        waterDisposalPerDay: 'optional',
    },
}

/**
 * Получить конфигурацию полей для услуги
 */
export function getFieldConfig(serviceName: string): FieldConfig {
    const serviceConfig = FIELD_REQUIREMENTS[serviceName] || {}
    return { ...defaultConfig, ...serviceConfig }
}

/**
 * Проверить, требуется ли поле
 */
export function isFieldRequired(
    serviceName: string,
    fieldName: keyof FieldConfig,
): boolean {
    const config = getFieldConfig(serviceName)
    return config[fieldName] === 'required'
}

/**
 * Проверить, видимо ли поле
 */
export function isFieldVisible(
    serviceName: string,
    fieldName: keyof FieldConfig,
): boolean {
    const config = getFieldConfig(serviceName)
    return config[fieldName] !== 'hidden'
}

/**
 * Проверить, допустим ли ноль в поле
 */
export function isZeroAllowed(
    serviceName: string,
    fieldName: keyof FieldConfig,
): boolean {
    const config = getFieldConfig(serviceName)
    return config[fieldName] === 'allowZero' || config[fieldName] === 'optional'
}

