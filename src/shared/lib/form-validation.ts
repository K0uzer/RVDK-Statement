/**
 * Валидация формы заявки
 * 
 * FSD: shared/lib - функции валидации для каждого блока формы
 */

import type { RequestFormData, ClientType } from '@/entities/request'

// ==================== ТИПЫ ====================

export interface ValidationResult {
    isValid: boolean
    errors: string[]
}

export interface FormValidationState {
    step1: ValidationResult      // Выбор услуги
    step1_1: ValidationResult    // Детали услуги
    step2: ValidationResult      // Основание обращения
    step3: ValidationResult      // Сведения о заявителе
    step4: ValidationResult       // Информация об объекте
}

// ==================== ВАЛИДАЦИЯ ШАГА 1: ВЫБОР УСЛУГИ ====================

/**
 * Валидация выбора услуги
 * Услуга должна быть выбрана (providingId > 0)
 */
export function validateStep1(formData: RequestFormData): ValidationResult {
    const errors: string[] = []

    if (!formData.providingId || formData.providingId === 0) {
        errors.push('Необходимо выбрать услугу подключения')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

// ==================== ВАЛИДАЦИЯ ШАГА 1.1: ДЕТАЛИ УСЛУГИ ====================

/**
 * Валидация деталей услуги
 * Проверяет обязательные поля в зависимости от типа услуги
 */
export function validateStep1_1(_formData: RequestFormData): ValidationResult {
    const errors: string[] = []

    // Для некоторых услуг могут быть дополнительные обязательные поля
    // Пока считаем, что если услуга выбрана, детали валидны
    // Можно расширить логику в зависимости от требований

    return {
        isValid: errors.length === 0,
        errors,
    }
}

// ==================== ВАЛИДАЦИЯ ШАГА 2: ОСНОВАНИЕ ОБРАЩЕНИЯ ====================

/**
 * Валидация основания обращения
 * Основание должно быть выбрано (requestReasonId > 0)
 */
export function validateStep2(formData: RequestFormData): ValidationResult {
    const errors: string[] = []

    if (!formData.requestReasonId || formData.requestReasonId === 0) {
        errors.push('Необходимо выбрать основание обращения')
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

// ==================== ВАЛИДАЦИЯ ШАГА 3: СВЕДЕНИЯ О ЗАЯВИТЕЛЕ ====================

/**
 * Валидация данных заявителя
 * Проверяет обязательные поля в зависимости от типа заявителя
 */
export function validateStep3(
    formData: RequestFormData,
    clientType: ClientType,
): ValidationResult {
    const errors: string[] = []

    switch (clientType) {
        case 'individual': {
            const client = formData.individualClient
            if (!client) {
                errors.push('Данные физического лица не заполнены')
                break
            }

            // Проверка ФИО
            if (!client.fullName?.firstName?.trim()) {
                errors.push('Необходимо указать фамилию')
            }
            if (!client.fullName?.lastName?.trim()) {
                errors.push('Необходимо указать имя')
            }
            if (!client.fullName?.middleName?.trim()) {
                errors.push('Необходимо указать отчество')
            }

            // Проверка даты рождения
            if (!client.birthday?.trim()) {
                errors.push('Необходимо указать дату рождения')
            }

            // Проверка паспорта
            if (!client.passportSerial?.trim()) {
                errors.push('Необходимо указать серию паспорта')
            }
            if (!client.passportNumber?.trim()) {
                errors.push('Необходимо указать номер паспорта')
            }
            if (!client.issuedBy?.trim()) {
                errors.push('Необходимо указать кем выдан паспорт')
            }
            if (!client.passportIssueDate?.trim()) {
                errors.push('Необходимо указать дату выдачи паспорта')
            }

            // Проверка ИНН
            if (!client.inn?.trim()) {
                errors.push('Необходимо указать ИНН')
            }

            // Проверка СНИЛС
            if (!client.snils?.trim()) {
                errors.push('Необходимо указать СНИЛС')
            }

            // Проверка адреса
            if (!client.address?.trim()) {
                errors.push('Необходимо указать адрес регистрации')
            }
            if (!client.postalAddress?.trim()) {
                errors.push('Необходимо указать почтовый адрес')
            }

            // Проверка контактов
            if (!client.phoneNumber?.trim()) {
                errors.push('Необходимо указать контактный телефон')
            }
            if (!client.email?.trim()) {
                errors.push('Необходимо указать email')
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
                errors.push('Неверный формат email')
            }

            break
        }

        case 'legal': {
            const client = formData.legalClient
            if (!client) {
                errors.push('Данные юридического лица не заполнены')
                break
            }

            // Проверка названия
            if (!client.nameFull?.trim() && !client.nameShort?.trim()) {
                errors.push('Необходимо указать полное или краткое наименование')
            }

            // Проверка ИНН
            if (!client.inn?.trim()) {
                errors.push('Необходимо указать ИНН')
            }

            // Проверка ОГРН
            if (!client.ogrn?.trim()) {
                errors.push('Необходимо указать ОГРН')
            }

            // Проверка адресов
            if (!client.legalAddress?.trim()) {
                errors.push('Необходимо указать юридический адрес')
            }
            if (!client.postalAddress?.trim()) {
                errors.push('Необходимо указать почтовый адрес')
            }

            // Проверка контактов
            if (!client.phoneNumber?.trim()) {
                errors.push('Необходимо указать контактный телефон')
            }
            if (!client.email?.trim()) {
                errors.push('Необходимо указать email')
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
                errors.push('Неверный формат email')
            }

            break
        }

        case 'ip': {
            const client = formData.legalClientIP
            if (!client) {
                errors.push('Данные индивидуального предпринимателя не заполнены')
                break
            }

            // Проверка ФИО
            if (!client.fullName?.firstName?.trim()) {
                errors.push('Необходимо указать фамилию')
            }
            if (!client.fullName?.lastName?.trim()) {
                errors.push('Необходимо указать имя')
            }
            if (!client.fullName?.middleName?.trim()) {
                errors.push('Необходимо указать отчество')
            }

            // Проверка ИНН
            if (!client.inn?.trim()) {
                errors.push('Необходимо указать ИНН')
            }

            // Проверка ОГРН или ОГРНИП
            if (!client.ogrn?.trim() && !client.ogrnip?.trim()) {
                errors.push('Необходимо указать ОГРН или ОГРНИП')
            }

            // Проверка адресов
            if (!client.legalAddress?.trim()) {
                errors.push('Необходимо указать адрес регистрации')
            }
            if (!client.postalAddress?.trim()) {
                errors.push('Необходимо указать почтовый адрес')
            }

            // Проверка контактов
            if (!client.phoneNumber?.trim()) {
                errors.push('Необходимо указать контактный телефон')
            }
            if (!client.email?.trim()) {
                errors.push('Необходимо указать email')
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
                errors.push('Неверный формат email')
            }

            break
        }

        case 'gov': {
            const client = formData.legalClientGov
            if (!client) {
                errors.push('Данные органа государственной власти не заполнены')
                break
            }

            // Проверка названия
            if (!client.nameFull?.trim() && !client.nameShort?.trim()) {
                errors.push('Необходимо указать полное или краткое наименование')
            }

            // Проверка адресов
            if (!client.legalAddress?.trim()) {
                errors.push('Необходимо указать юридический адрес')
            }
            if (!client.postalAddress?.trim()) {
                errors.push('Необходимо указать почтовый адрес')
            }

            // Проверка контактов
            if (!client.phoneNumber?.trim()) {
                errors.push('Необходимо указать контактный телефон')
            }
            if (!client.email?.trim()) {
                errors.push('Необходимо указать email')
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
                errors.push('Неверный формат email')
            }

            break
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    }
}

// ==================== ВАЛИДАЦИЯ ШАГА 4: ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ ====================

/**
 * Валидация информации об объекте
 * Проверяет обязательные поля
 */
export function validateStep4(formData: RequestFormData): ValidationResult {
    const errors: string[] = []
    const objectiveInfo = formData.objectiveInfo

    if (!objectiveInfo) {
        errors.push('Информация об объекте не заполнена')
        return {
            isValid: false,
            errors,
        }
    }

    // Адрес объекта - обязательное поле
    if (!objectiveInfo.address?.trim()) {
        errors.push('Необходимо указать адрес объекта')
    }

    // Остальные поля могут быть условно обязательными в зависимости от услуги
    // Пока проверяем только базовые обязательные поля

    return {
        isValid: errors.length === 0,
        errors,
    }
}

// ==================== ВАЛИДАЦИЯ ВСЕЙ ФОРМЫ ====================

/**
 * Валидирует все шаги формы
 * 
 * @param formData - Данные формы
 * @param clientType - Тип заявителя (для шага 3)
 * @returns Состояние валидации всех шагов
 */
export function validateAllSteps(
    formData: RequestFormData,
    clientType: ClientType,
): FormValidationState {
    return {
        step1: validateStep1(formData),
        step1_1: validateStep1_1(formData),
        step2: validateStep2(formData),
        step3: validateStep3(formData, clientType),
        step4: validateStep4(formData),
    }
}

