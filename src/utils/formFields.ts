/**
 * =============================================================================
 * УТИЛИТЫ ДЛЯ ГЕНЕРАЦИИ ПОЛЕЙ ФОРМ
 * Устранение дублирования кода в формах заявителей
 * =============================================================================
 * 
 * Общие конфигурации полей для разных типов заявителей
 */

/**
 * Конфигурация поля формы
 */
export interface FieldConfig {
    label: string
    path: string
    type?: 'text' | 'email' | 'date' | 'number' | 'tel'
    placeholder?: string
    description?: string
    required?: boolean
    min?: number
    parseAsNumber?: boolean
}

/**
 * Создаёт массив конфигураций полей для физического лица
 */
export function getIndividualClientFields(basePath: string): FieldConfig[] {
    return [
        {
            label: 'Дата рождения',
            path: `${basePath}.birthday`,
            type: 'date',
            required: true,
        },
        {
            label: 'Паспорт серия',
            path: `${basePath}.passportSerial`,
            placeholder: '0000',
            required: true,
        },
        {
            label: 'Паспорт номер',
            path: `${basePath}.passportNumber`,
            placeholder: '000000',
            required: true,
        },
        {
            label: 'Кем выдан',
            path: `${basePath}.issuedBy`,
            placeholder: 'ОВД района...',
            required: true,
        },
        {
            label: 'Дата выдачи паспорта',
            path: `${basePath}.passportIssueDate`,
            type: 'date',
            required: true,
        },
        {
            label: 'ИНН',
            path: `${basePath}.inn`,
            placeholder: '123456789012',
            required: true,
        },
        {
            label: 'СНИЛС',
            path: `${basePath}.snils`,
            placeholder: '123-456-789 00',
            required: true,
        },
        {
            label: 'Адрес регистрации',
            path: `${basePath}.address`,
            placeholder: 'г. Ростов-на-Дону, ул. Ленина, д. 1',
            required: true,
        },
        {
            label: 'Почтовый адрес',
            path: `${basePath}.postalAddress`,
            placeholder: 'г. Ростов-на-Дону, ул. Ленина, д. 1',
            required: true,
        },
        {
            label: 'Контактный телефон',
            path: `${basePath}.phoneNumber`,
            type: 'tel',
            placeholder: '+7 999 123-45-67',
            required: true,
        },
        {
            label: 'Email',
            path: `${basePath}.email`,
            type: 'email',
            placeholder: 'example@mail.ru',
            required: true,
        },
    ]
}

/**
 * Создаёт массив конфигураций полей для юридического лица
 */
export function getLegalClientFields(basePath: string): FieldConfig[] {
    return [
        {
            label: 'Полное наименование организации',
            path: `${basePath}.nameFull`,
            placeholder: 'Общество с ограниченной ответственностью «Пример»',
            required: true,
        },
        {
            label: 'Сокращённое наименование',
            path: `${basePath}.nameShort`,
            placeholder: 'ООО «Пример»',
            required: true,
        },
        {
            label: 'ОГРН',
            path: `${basePath}.ogrn`,
            placeholder: '1234567890123',
            required: true,
        },
        {
            label: 'ИНН',
            path: `${basePath}.inn`,
            placeholder: '1234567890',
            required: true,
        },
        {
            label: 'Место нахождения (по ЕГРЮЛ)',
            path: `${basePath}.legalAddress`,
            placeholder: 'г. Ростов-на-Дону, ул. Ленина, д. 1',
            required: true,
        },
        {
            label: 'Фактический адрес',
            path: `${basePath}.factAddress`,
            placeholder: 'г. Ростов-на-Дону, ул. Ленина, д. 1',
            required: true,
        },
        {
            label: 'Почтовый адрес',
            path: `${basePath}.postalAddress`,
            placeholder: 'г. Ростов-на-Дону, а/я 10',
            required: true,
        },
        {
            label: 'Контактный телефон',
            path: `${basePath}.phoneNumber`,
            type: 'tel',
            placeholder: '+7 863 123-45-67',
            required: true,
        },
        {
            label: 'Email',
            path: `${basePath}.email`,
            type: 'email',
            placeholder: 'info@company.ru',
            required: true,
        },
    ]
}

/**
 * Создаёт массив конфигураций полей для ИП
 */
export function getIPClientFields(basePath: string): FieldConfig[] {
    return [
        {
            label: 'ОГРНИП',
            path: `${basePath}.ogrn`,
            placeholder: '123456789012345',
            required: true,
        },
        {
            label: 'ИНН',
            path: `${basePath}.inn`,
            placeholder: '123456789012',
            required: true,
        },
        {
            label: 'Адрес регистрации',
            path: `${basePath}.legalAddress`,
            placeholder: 'г. Ростов-на-Дону, ул. Пушкина, д. 9',
            required: true,
        },
        {
            label: 'Фактический адрес',
            path: `${basePath}.factAddress`,
            placeholder: 'г. Ростов-на-Дону, ул. Пушкина, д. 9',
        },
        {
            label: 'Почтовый адрес',
            path: `${basePath}.postalAddress`,
            placeholder: 'г. Ростов-на-Дону, а/я 15',
            required: true,
        },
        {
            label: 'Телефон',
            path: `${basePath}.phoneNumber`,
            type: 'tel',
            placeholder: '+7 999 111-22-33',
            required: true,
        },
        {
            label: 'Email',
            path: `${basePath}.email`,
            type: 'email',
            placeholder: 'ip@example.ru',
            required: true,
        },
    ]
}

/**
 * Создаёт массив конфигураций полей для гос. органа
 */
export function getGovClientFields(basePath: string): FieldConfig[] {
    return [
        {
            label: 'Полное наименование органа',
            path: `${basePath}.nameFull`,
            placeholder: 'Администрация города Ростова-на-Дону',
            required: true,
        },
        {
            label: 'Сокращённое наименование',
            path: `${basePath}.nameShort`,
            placeholder: 'Администрация г. Ростова-на-Дону',
            required: true,
        },
        {
            label: 'Реквизиты нормативного акта',
            path: `${basePath}.actingBasis`,
            placeholder: 'Устав города, Постановление №XX от __.__.____',
            required: true,
            description:
                'Нормативный правовой акт, в соответствии с которым осуществляется деятельность органа',
        },
        {
            label: 'Место нахождения',
            path: `${basePath}.location`,
            placeholder: 'г. Ростов-на-Дону, ул. Большая Садовая, д. 47',
            required: true,
        },
        {
            label: 'Почтовый адрес',
            path: `${basePath}.postalAddress`,
            placeholder: '344002, г. Ростов-на-Дону, ул. Большая Садовая, д. 47',
            required: true,
        },
        {
            label: 'Контактный телефон',
            path: `${basePath}.phoneNumber`,
            type: 'tel',
            placeholder: '+7 863 240-00-00',
            required: true,
        },
        {
            label: 'Email',
            path: `${basePath}.email`,
            type: 'email',
            placeholder: 'info@rostov-gorod.ru',
            required: true,
        },
    ]
}

/**
 * Общие поля для всех типов заявителей (доверенность)
 */
export const TRUSTEE_FIELDS: FieldConfig[] = [
    {
        label: 'Номер доверенности',
        path: 'trustNumber',
        placeholder: '123456',
    },
    {
        label: 'ФИО доверенного представителя',
        path: 'trusteeName',
        placeholder: 'Иванов Иван Иванович',
    },
    {
        label: 'Дата выдачи',
        path: 'trustDateFrom',
        type: 'date',
    },
    {
        label: 'Срок действия до',
        path: 'trustDateTo',
        type: 'date',
    },
]

