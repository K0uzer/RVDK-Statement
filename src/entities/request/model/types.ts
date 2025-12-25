/**
 * Типы для сущности Request (Заявка)
 * 
 * FSD: entities/request/model - типы и модели заявки
 */

// ==================== API TYPES ====================

/**
 * Услуга подключения (из GET /Providing/get-providings)
 * 
 * @property id - Уникальный идентификатор услуги
 * @property name - Название услуги (напр. "Новое подключение")
 * @property applyingFor - Тип: 0 = водоснабжение, 1 = водоотведение
 */
export interface ServiceT {
    id: number
    name: string
    applyingFor: 0 | 1
}

/**
 * Основание обращения (из GET /RequestReason/get-request-reasons)
 * 
 * @property id - Уникальный идентификатор основания
 * @property name - Полный текст основания
 * @property applyingFor - Применимость: 0 = ТУ, 1 = ДП
 */
export interface AccordionT {
    id: number
    name: string
    applyingFor: 0 | 1
}

// ==================== CLIENT TYPES ====================

/**
 * ФИО (для физических лиц)
 */
export interface FullName {
    lastName: string
    firstName: string
    middleName: string
}

/**
 * Доверенное лицо
 */
export interface Trustee {
    fullName?: FullName
    position?: string
    document?: string
    trustNumber?: string
    trusteeName?: string
    trustDateFrom?: string
    trustDateTo?: string
}

/**
 * Физическое лицо
 */
export interface IndividualClient {
    fullName?: FullName
    firstName?: string
    lastName?: string
    middleName?: string
    birthday?: string
    birthDate?: string
    passportSeries?: string
    passportSerial?: string
    passportNumber?: string
    passportIssuedBy?: string
    issuedBy?: string
    passportIssueDate?: string
    inn?: string
    registrationAddress?: string
    actualAddress?: string
    address?: string
    postalAddress?: string
    phone?: string
    phoneNumber?: string
    email?: string
    snils?: string
    trustee?: Trustee
}

/**
 * Юридическое лицо
 */
export interface LegalClient {
    name?: string
    nameFull?: string
    nameShort?: string
    inn: string
    kpp?: string
    ogrn: string
    legalAddress?: string
    factAddress?: string
    actualAddress?: string
    postalAddress?: string
    phone?: string
    phoneNumber?: string
    email: string
    director?: FullName
    trustee?: Trustee
}

/**
 * Индивидуальный предприниматель
 */
export interface LegalClientIP {
    fullName?: FullName
    firstName?: string
    lastName?: string
    middleName?: string
    inn: string
    ogrn?: string
    ogrnip?: string
    registrationAddress?: string
    factAddress?: string
    legalAddress?: string
    actualAddress?: string
    postalAddress?: string
    phone?: string
    phoneNumber?: string
    email: string
    trustee?: Trustee
}

/**
 * Орган государственной власти
 */
export interface LegalClientGov {
    name?: string
    nameFull?: string
    nameShort?: string
    inn?: string
    kpp?: string
    ogrn?: string
    actingBasis?: string
    location?: string
    legalAddress?: string
    actualAddress?: string
    postalAddress?: string
    phone?: string
    phoneNumber?: string
    email: string
    director?: FullName
    trustee?: Trustee
}

/**
 * Тип заявителя (вкладки на Шаге 3)
 */
export type ClientType = 'individual' | 'legal' | 'ip' | 'gov'

// ==================== OBJECTIVE INFO TYPES ====================

/**
 * Информация о подключаемом объекте
 */
export interface ObjectiveInfo {
    // Основная информация
    address: string
    cadastralNumber?: string
    landArea?: number
    buildingArea?: number
    number?: string
    date?: string
    name?: string
    area?: number
    
    // Характеристики здания
    buildingType?: string
    floors?: number
    apartments?: number
    height?: number
    flats?: number
    settlers?: number
    commissionPlanedOn?: string
    dm?: number
    
    // Водоснабжение
    waterSupplyRequired?: boolean
    waterSupplyCapacity?: number
    waterSupplySource?: string
    supplyVolumePerDay?: number
    supplyVolumePerHour?: number
    supplyVolumePerSecond?: number
    hasWaterSupply?: boolean
    
    // Водоотведение
    waterDisposalRequired?: boolean
    waterDisposalCapacity?: number
    waterDisposalDestination?: string
    disposalVolumePerDay?: number
    disposalVolumePerHour?: number
    disposalVolumePerSecond?: number
    hasWaterDisposal?: boolean
    
    // Пожарная безопасность
    firefightingRequired?: boolean
    firefightingCapacity?: number
    supplyVolumeInnerFirefightingPerSecond?: number
    supplyVolumeAutoFirefightingPerSecond?: number
    supplyVolumeOuterFirefightingPerSecond?: number
    
    // Дополнительно
    exploitationKind?: string
    measuringDeviceLocation?: string
    tcNumber?: string
    tcDate?: string
    
    // Смежные владельцы
    hasAdjacentOwners?: boolean
    adjacentOwners?: Array<{
        name: string
        address: string
    }>
    coOwnerIndividual?: {
        address: string
        fullName: FullName
        cadastralNumber: string
        objectiveAddress: string
    }
    coOwnerLegal?: {
        address?: string
        name: string
        inn?: string
        cadastralNumber: string
        objectiveAddress: string
    }
    
    // Дата ввода в эксплуатацию
    commissionDate?: string
    
    // Статус подключения
    connectionStatus?: string
    
    // Поля для ТУ
    tuFields?: {
        // Дополнительные поля для ТУ
    }
}

// ==================== REQUEST FORM ====================

/**
 * Полные данные формы заявки
 * Отправляется на сервер при создании заявки
 * 
 * ВАЖНО: При отправке пустые поля заменяются на null
 */
export interface RequestFormData {
    providingId: number             // ID выбранной услуги
    providingType: 0 | 1            // 0 = водоснабжение, 1 = водоотведение
    requestReasonId: number         // ID основания обращения
    
    // Данные заявителя (заполняется только один из четырёх)
    individualClient: IndividualClient | null   // Физ. лицо
    legalClient: LegalClient | null             // Юр. лицо
    legalClientIP: LegalClientIP | null         // ИП
    legalClientGov: LegalClientGov | null       // Гос. орган
    
    objectiveInfo: ObjectiveInfo    // Информация об объекте
}

/**
 * Тип заявки: ТУ (технические условия) или ДП (договор подключения)
 */
export type RequestType = 'tu' | 'dp'
