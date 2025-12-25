/**
 * Константы услуг подключения
 */

/**
 * Названия услуг для проверки (используются в FirsStepOfForm)
 */
export const SERVICE_TITLES = {
    NEW_CONNECTION: 'Новое подключение',
    ADJACENT_OWNER: 'Подключение к сетям смежного владельца',
    RECONSTRUCTION: 'Реконструкцию существующих сетей без изменения потребляемой нагрузки',
    YARD_NETWORKS: 'Подключение к внутридворовым (внутриплощадочным) сетям',
    CORRECTION: 'Корректировку технических условий',
    ANNULMENT: 'Аннулирование технических условий',
    NETWORK_REMOVAL: 'Вынос сетей',
    METER_INSTALLATION: 'На установку прибора учета',
    FIREFIGHTING: 'Подключение для нужд пожаротушения',
    TEMPORARY_SUPPLY: 'Временное водоснабжение стройплощадки',
    OTHER: 'Иное',
} as const

export type ServiceTitle = (typeof SERVICE_TITLES)[keyof typeof SERVICE_TITLES]

/**
 * Типы подключения (водоснабжение/водоотведение)
 */
export const PROVIDING_TYPES = {
    WATER_SUPPLY: 0,
    WATER_DISPOSAL: 1,
} as const

export type ProvidingType = (typeof PROVIDING_TYPES)[keyof typeof PROVIDING_TYPES]

/**
 * Метки для типов подключения
 */
export const PROVIDING_TYPE_LABELS: Record<ProvidingType, string> = {
    [PROVIDING_TYPES.WATER_SUPPLY]: 'Водоснабжение',
    [PROVIDING_TYPES.WATER_DISPOSAL]: 'Водоотведение',
}

/**
 * Услуги, требующие указания диаметра сетей
 */
export const SERVICES_REQUIRING_DIAMETER = [
    SERVICE_TITLES.RECONSTRUCTION,
    SERVICE_TITLES.NETWORK_REMOVAL,
]

/**
 * Услуги, требующие указания номера и даты ТУ
 */
export const SERVICES_REQUIRING_TC_NUMBER = [
    SERVICE_TITLES.CORRECTION,
    SERVICE_TITLES.ANNULMENT,
]

/**
 * Услуги, для которых обязательны поля пожаротушения
 */
export const SERVICES_REQUIRING_FIREFIGHTING = [
    SERVICE_TITLES.FIREFIGHTING,
]

/**
 * Услуги, показывающие поля смежного владельца
 */
export const SERVICES_WITH_ADJACENT_OWNER = [
    SERVICE_TITLES.ADJACENT_OWNER,
]

