/**
 * =============================================================================
 * УТИЛИТЫ ДЛЯ РАБОТЫ С ФОРМАМИ
 * =============================================================================
 * 
 * Этот модуль содержит:
 * 1. initialFormData — начальное состояние формы заявки
 * 2. cleanFormData — очистка данных перед отправкой на сервер
 * 3. isObjectEmpty — проверка пустоты объекта
 * 4. parseFullName — парсинг ФИО из строки
 * 5. createUpdateFn — фабрика функций для обновления вложенных полей
 * 
 * @module utils/form
 */

import type { RequestFormData } from '@/types'

// ==================== НАЧАЛЬНОЕ СОСТОЯНИЕ ====================

/**
 * Начальное состояние формы заявки
 * 
 * Все строковые поля инициализируются пустыми строками,
 * числовые — нулями, булевы — false.
 * 
 * При отправке на сервер пустые поля преобразуются в null
 * функцией cleanFormData()
 */
export const initialFormData: RequestFormData = {
    // Выбранная услуга (Шаг 1)
    providingId: 0,
    providingType: 0,  // 0 = водоснабжение, 1 = водоотведение
    
    // Основание обращения (Шаг 2)
    requestReasonId: 0,
    
    // Данные физического лица (Шаг 3, вкладка "Физ. лица")
    individualClient: {
        fullName: {
            firstName: '',
            lastName: '',
            middleName: '',
        },
        birthday: '',
        passportSerial: '',
        passportNumber: '',
        passportIssueDate: '',
        issuedBy: '',
        inn: '',
        snils: '',
        address: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    
    // Данные юридического лица (Шаг 3, вкладка "Юр. лица")
    legalClient: {
        nameFull: '',
        nameShort: '',
        ogrn: '',
        inn: '',
        factAddress: '',
        legalAddress: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    
    // Данные ИП (Шаг 3, вкладка "Индивидуальный предпр.")
    legalClientIP: {
        fullName: {
            firstName: '',
            lastName: '',
            middleName: '',
        },
        ogrn: '',
        inn: '',
        factAddress: '',
        legalAddress: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    
    // Данные гос. органа (Шаг 3, вкладка "Орган гос. власти")
    legalClientGov: {
        nameFull: '',
        nameShort: '',
        actingBasis: '',
        location: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    
    // Информация об объекте (Шаг 4)
    objectiveInfo: {
        number: '',              // Номер ТУ
        date: '',                // Дата ТУ
        name: '',                // Наименование объекта
        address: '',             // Адрес объекта
        cadastralNumber: '',     // Кадастровый номер
        area: 0,                 // Площадь (м²)
        
        // Смежный владелец — физ. лицо
        coOwnerIndividual: {
            address: '',
            fullName: {
                firstName: '',
                lastName: '',
                middleName: '',
            },
            cadastralNumber: '',
            objectiveAddress: '',
        },
        
        // Смежный владелец — юр. лицо
        coOwnerLegal: {
            name: '',
            inn: '',
            cadastralNumber: '',
            objectiveAddress: '',
        },
        
        // Характеристики объекта
        floors: 0,               // Этажность
        height: 0,               // Высота (м)
        flats: 0,                // Количество квартир
        settlers: 0,             // Количество жителей
        commissionPlanedOn: '',  // Срок ввода в эксплуатацию
        dm: 0,                   // Диаметр сетей (мм)
        
        // Нагрузка водоснабжения
        supplyVolumePerDay: 0,
        supplyVolumePerHour: 0,
        supplyVolumePerSecond: 0,
        
        // Пожаротушение
        supplyVolumeInnerFirefightingPerSecond: 0,
        supplyVolumeAutoFirefightingPerSecond: 0,
        supplyVolumeOuterFirefightingPerSecond: 0,
        
        // Нагрузка водоотведения
        disposalVolumePerDay: 0,
        disposalVolumePerHour: 0,
        disposalVolumePerSecond: 0,
        
        // Текущее состояние
        hasWaterSupply: false,
        hasWaterDisposal: false,
        
        // Дополнительно
        exploitationKind: '',
        measuringDeviceLocation: '',
        tcNumber: '',
        tcDate: new Date().toISOString(),
    },
}

// ==================== ОЧИСТКА ДАННЫХ ====================

/**
 * Очищает объект формы перед отправкой на сервер
 * 
 * Логика очистки:
 * 1. Пустые строки ('') → null
 * 2. Пустые клиентские объекты → null
 * 3. Связанные поля coOwner очищаются если клиент не выбран
 * 
 * @example
 * const cleanedData = cleanFormData(formData)
 * // { individualClient: null, legalClient: { nameFull: "ООО Пример", ... }, ... }
 * 
 * @param obj - Объект для очистки
 * @returns Очищенный объект
 */
export function cleanFormData(obj: unknown): unknown {
    // null и undefined возвращаем как есть
    if (obj === null || obj === undefined) {
        return obj
    }

    // Пустые строки преобразуем в null
    if (typeof obj === 'string') {
        return obj === '' ? null : obj
    }

    // Массивы обрабатываем рекурсивно
    if (Array.isArray(obj)) {
        return obj.map((item) => cleanFormData(item))
    }

    // Объекты обрабатываем рекурсивно
    if (typeof obj === 'object') {
        const result: Record<string, unknown> = {}
        
        // Ключи клиентских объектов — проверяем на пустоту
        const clientObjectKeys = [
            'individualClient',
            'legalClient',
            'legalClientIP',
            'legalClientGov',
        ]

        for (const key in obj as Record<string, unknown>) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const cleanedValue = cleanFormData(
                    (obj as Record<string, unknown>)[key],
                )

                // Клиентские объекты: если все поля пустые — ставим null
                if (clientObjectKeys.includes(key) && cleanedValue !== null) {
                    if (isObjectEmpty(cleanedValue)) {
                        result[key] = null
                    } else {
                        result[key] = cleanedValue
                    }
                } else {
                    result[key] = cleanedValue
                }
            }
        }

        // Связанная логика: если клиент null, очищаем соответствующего coOwner
        if (result.legalClient === null) {
            if (
                result.objectiveInfo &&
                typeof result.objectiveInfo === 'object'
            ) {
                ;(
                    result.objectiveInfo as Record<string, unknown>
                ).coOwnerLegal = null
            }
        }

        if (result.individualClient === null) {
            if (
                result.objectiveInfo &&
                typeof result.objectiveInfo === 'object'
            ) {
                ;(
                    result.objectiveInfo as Record<string, unknown>
                ).coOwnerIndividual = null
            }
        }

        return result
    }

    // Остальные типы (числа, boolean) возвращаем как есть
    return obj
}

/**
 * Проверяет, является ли объект "пустым"
 * 
 * Объект считается пустым если все его поля:
 * - null
 * - undefined
 * - пустая строка ''
 * - или вложенные пустые объекты
 * 
 * @param obj - Объект для проверки
 * @returns true если объект пуст
 */
export function isObjectEmpty(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
        return true
    }

    // Не-объекты (числа, строки) — не пусты
    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return false
    }

    // Проверяем каждое поле объекта
    for (const key in obj as Record<string, unknown>) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = (obj as Record<string, unknown>)[key]

            // Если есть не-пустое значение
            if (value !== null && value !== undefined && value !== '') {
                // Вложенный объект — проверяем рекурсивно
                if (typeof value === 'object' && !Array.isArray(value)) {
                    if (!isObjectEmpty(value)) {
                        return false
                    }
                } else {
                    // Примитив с значением — объект не пуст
                    return false
                }
            }
        }
    }

    return true
}

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

/**
 * Парсит ФИО из строки в объект
 * 
 * Разбивает строку по пробелам:
 * - Первое слово → firstName (Фамилия в нашем случае)
 * - Второе слово → middleName (Имя)
 * - Третье слово → lastName (Отчество)
 * 
 * @example
 * parseFullName('Иванов Иван Иванович')
 * // { firstName: 'Иванов', middleName: 'Иван', lastName: 'Иванович' }
 * 
 * @param value - Строка с ФИО
 * @returns Объект с разобранным ФИО
 */
export function parseFullName(value: string): {
    firstName: string
    middleName: string
    lastName: string
} {
    const parts = value.trim().split(/\s+/)
    return {
        firstName: parts[0] || '',
        middleName: parts[1] || '',
        lastName: parts[2] || '',
    }
}

/**
 * Тип функции обновления данных формы
 * Используется для типизации updateCommon
 */
export type UpdateFormFn = (path: string, value: unknown) => void

/**
 * Создает функцию для обновления вложенных полей объекта по пути
 * 
 * Позволяет обновлять глубоко вложенные поля через точечную нотацию:
 * updateCommon('individualClient.fullName.firstName', 'Иван')
 * 
 * @example
 * const [formData, setFormData] = useState(initialFormData)
 * const updateCommon = createUpdateFn(setFormData)
 * 
 * // Обновление вложенного поля
 * updateCommon('objectiveInfo.address', 'г. Ростов-на-Дону, ул. Ленина, 1')
 * 
 * @param setState - Функция setState из useState
 * @returns Функция обновления с сигнатурой (path, value) => void
 */
export function createUpdateFn<T extends object>(
    setState: React.Dispatch<React.SetStateAction<T>>,
): UpdateFormFn {
    return (path: string, value: unknown) => {
        setState((prev) => {
            // Разбиваем путь на части: 'a.b.c' → ['a', 'b', 'c']
            const keys = path.split('.')
            
            // Создаём глубокую копию объекта
            const newState = JSON.parse(JSON.stringify(prev))
            
            // Навигация к нужному полю
            let current = newState
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]]
            }
            
            // Устанавливаем значение
            current[keys[keys.length - 1]] = value

            return newState
        })
    }
}
