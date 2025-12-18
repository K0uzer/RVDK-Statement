/**
 * =============================================================================
 * ТИПЫ ДАННЫХ ПРИЛОЖЕНИЯ
 * Центральный файл с TypeScript интерфейсами
 * =============================================================================
 * 
 * СТРУКТУРА:
 * 1. API Types — типы для данных с сервера
 * 2. Client Types — типы заявителей (физ.лица, юр.лица и т.д.)
 * 3. Co-owner Types — типы смежных владельцев
 * 4. Objective Info — информация о подключаемом объекте
 * 5. Request Form — основной тип формы заявки
 * 6. Form State — типы состояния UI
 * 7. Document Types — типы для загрузки документов
 * 
 * @module types
 */

// ==================== API TYPES ====================
// Типы данных, получаемых с сервера

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
// Типы заявителей (Шаг 3 формы)

/**
 * ФИО (используется для физ.лиц и ИП)
 */
export interface FullName {
    firstName: string   // Имя
    lastName: string    // Фамилия
    middleName: string  // Отчество
}

/**
 * Данные доверенности
 * Заполняется, если заявление подает представитель
 */
export interface Trustee {
    trustNumber: string     // Номер доверенности
    trusteeName: string     // ФИО представителя
    trustDateFrom: string   // Дата выдачи
    trustDateTo: string     // Срок действия до
}

/**
 * Физическое лицо
 * Вкладка "Физ. лица" на Шаге 3
 */
export interface IndividualClient {
    fullName: FullName          // ФИО заявителя
    birthday: string            // Дата рождения
    passportSerial: string      // Серия паспорта
    passportNumber: string      // Номер паспорта
    passportIssueDate: string   // Дата выдачи паспорта
    issuedBy: string            // Кем выдан
    inn: string                 // ИНН (12 цифр)
    snils: string               // СНИЛС (XXX-XXX-XXX XX)
    address: string             // Адрес регистрации
    postalAddress: string       // Почтовый адрес
    phoneNumber: string         // Контактный телефон
    email: string               // Email
    trustee: Trustee            // Данные доверенности
}

/**
 * Юридическое лицо
 * Вкладка "Юр. лица" на Шаге 3
 */
export interface LegalClient {
    nameFull: string        // Полное наименование (ООО "Пример")
    nameShort: string       // Сокращённое наименование
    ogrn: string            // ОГРН (13 цифр)
    inn: string             // ИНН (10 цифр)
    factAddress: string     // Фактический адрес
    legalAddress: string    // Юридический адрес (по ЕГРЮЛ)
    postalAddress: string   // Почтовый адрес
    phoneNumber: string     // Контактный телефон
    email: string           // Email
    trustee: Trustee        // Данные доверенности
}

/**
 * Индивидуальный предприниматель
 * Вкладка "Индивидуальный предпр." на Шаге 3
 */
export interface LegalClientIP {
    fullName: FullName      // ФИО предпринимателя
    ogrn: string            // ОГРНИП (15 цифр)
    inn: string             // ИНН (12 цифр)
    factAddress: string     // Фактический адрес
    legalAddress: string    // Адрес регистрации
    postalAddress: string   // Почтовый адрес
    phoneNumber: string     // Контактный телефон
    email: string           // Email
    trustee: Trustee        // Данные доверенности
}

/**
 * Орган государственной власти / местного самоуправления
 * Вкладка "Орган гос. власти" на Шаге 3
 */
export interface LegalClientGov {
    nameFull: string        // Полное наименование органа
    nameShort: string       // Сокращённое наименование
    actingBasis: string     // Реквизиты нормативного акта
    location: string        // Место нахождения
    postalAddress: string   // Почтовый адрес
    phoneNumber: string     // Контактный телефон
    email: string           // Email
    trustee: Trustee        // Данные доверенности
}

// ==================== CO-OWNER TYPES ====================
// Типы смежных владельцев (для подключения к сетям смежного владельца)

/**
 * Смежный владелец — физическое лицо
 */
export interface CoOwnerIndividual {
    address: string             // Адрес смежного владельца
    fullName: FullName          // ФИО
    cadastralNumber: string     // Кадастровый номер участка
    objectiveAddress: string    // Адрес участка
}

/**
 * Смежный владелец — юридическое лицо
 */
export interface CoOwnerLegal {
    name: string                // Наименование организации
    inn: string                 // ИНН
    cadastralNumber: string     // Кадастровый номер участка
    objectiveAddress: string    // Адрес участка
}

// ==================== OBJECTIVE INFO ====================
// Информация о подключаемом объекте (Шаг 4 формы)

/**
 * Информация о подключаемом объекте
 * Основной раздел Шага 4
 */
export interface ObjectiveInfo {
    // --- Идентификация ---
    number: string              // Номер ТУ (для корректировки/аннулирования)
    date: string                // Дата выдачи ТУ
    name: string                // Наименование объекта
    address: string             // Адрес объекта
    cadastralNumber: string     // Кадастровый номер участка
    area: number                // Площадь участка (м²)
    
    // --- Смежные владельцы ---
    coOwnerIndividual: CoOwnerIndividual  // Смежный владелец (физ.лицо)
    coOwnerLegal: CoOwnerLegal            // Смежный владелец (юр.лицо)
    
    // --- Характеристики объекта ---
    floors: number              // Количество этажей
    height: number              // Высота объекта (м)
    flats: number               // Количество квартир (для МКД)
    settlers: number            // Количество жителей
    commissionPlanedOn: string  // Планируемый срок ввода в эксплуатацию
    dm: number                  // Диаметр сетей (мм) — для реконструкции/выноса
    
    // --- Нагрузка водоснабжения ---
    supplyVolumePerDay: number      // м³/сутки
    supplyVolumePerHour: number     // м³/час
    supplyVolumePerSecond: number   // л/с
    
    // --- Пожаротушение ---
    supplyVolumeInnerFirefightingPerSecond: number  // Внутреннее (л/с)
    supplyVolumeAutoFirefightingPerSecond: number   // Автоматическое (л/с)
    supplyVolumeOuterFirefightingPerSecond: number  // Наружное (л/с)
    
    // --- Нагрузка водоотведения ---
    disposalVolumePerDay: number    // м³/сутки
    disposalVolumePerHour: number   // м³/час
    disposalVolumePerSecond: number // л/с
    
    // --- Текущее состояние подключения ---
    hasWaterSupply: boolean     // Объект подключен к водоснабжению?
    hasWaterDisposal: boolean   // Объект подключен к водоотведению?
    
    // --- Дополнительно ---
    exploitationKind: string        // Вид разрешенного использования
    measuringDeviceLocation: string // Расположение прибора учета
    tcNumber: string                // Номер ТУ (если получены ранее)
    tcDate: string                  // Дата ТУ
}

// ==================== REQUEST FORM ====================
// Основная структура данных формы

/**
 * Полные данные формы заявки
 * Отправляется на сервер при создании заявки
 * 
 * ВАЖНО: При отправке пустые поля заменяются на null
 * (см. cleanFormData в utils/form.ts)
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

// ==================== FORM STATE ====================
// Типы для управления состоянием UI

/**
 * Тип заявителя (вкладки на Шаге 3)
 */
export type ClientType = 'individual' | 'legal' | 'ip' | 'gov'

/**
 * Тип заявки
 * - tu: Технические условия (срок 7 дней)
 * - dp: Договор подключения (срок 20 дней)
 */
export type RequestType = 'tu' | 'dp'

/**
 * Состояние формы (для отладки и аналитики)
 */
export interface FormState {
    requestType: RequestType
    clientType: ClientType
    selectedServiceId: string
    step: number
}

// ==================== DOCUMENT TYPES ====================
// Типы для загрузки документов (Шаг 5)

/**
 * Загруженный документ
 */
export interface DocumentFile {
    type: string        // Тип документа (passport, landDocs и т.д.)
    files: File[]       // Массив файлов
    required: boolean   // Обязателен ли документ
}

/**
 * Карта загруженных документов
 * Ключ — ID документа, значение — массив файлов
 */
export type DocumentsMap = Record<string, File[]>
