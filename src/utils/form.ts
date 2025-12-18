/**
 * Утилиты для работы с формами
 */

import type { RequestFormData } from '@/types'

/**
 * Начальное состояние формы заявки
 */
export const initialFormData: RequestFormData = {
    providingId: 0,
    providingType: 0,
    requestReasonId: 0,
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
    objectiveInfo: {
        number: '',
        date: '',
        name: '',
        address: '',
        cadastralNumber: '',
        area: 0,
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
        coOwnerLegal: {
            name: '',
            inn: '',
            cadastralNumber: '',
            objectiveAddress: '',
        },
        floors: 0,
        height: 0,
        flats: 0,
        settlers: 0,
        commissionPlanedOn: '',
        dm: 0,
        supplyVolumePerDay: 0,
        supplyVolumePerHour: 0,
        supplyVolumePerSecond: 0,
        supplyVolumeInnerFirefightingPerSecond: 0,
        supplyVolumeAutoFirefightingPerSecond: 0,
        supplyVolumeOuterFirefightingPerSecond: 0,
        disposalVolumePerDay: 0,
        disposalVolumePerHour: 0,
        disposalVolumePerSecond: 0,
        hasWaterSupply: false,
        hasWaterDisposal: false,
        exploitationKind: '',
        measuringDeviceLocation: '',
        tcNumber: '',
        tcDate: new Date().toISOString(),
    },
}

/**
 * Очищает объект от пустых строк и null значений
 * Специальные клиентские объекты становятся null если все поля пустые
 */
export function cleanFormData(obj: unknown): unknown {
    if (obj === null || obj === undefined) {
        return obj
    }

    if (typeof obj === 'string') {
        return obj === '' ? null : obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => cleanFormData(item))
    }

    if (typeof obj === 'object') {
        const result: Record<string, unknown> = {}
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

        // Очищаем связанные поля
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

    return obj
}

/**
 * Проверяет, является ли объект "пустым" (все поля null/undefined/пустые строки)
 */
export function isObjectEmpty(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
        return true
    }

    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return false
    }

    for (const key in obj as Record<string, unknown>) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = (obj as Record<string, unknown>)[key]

            if (value !== null && value !== undefined && value !== '') {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    if (!isObjectEmpty(value)) {
                        return false
                    }
                } else {
                    return false
                }
            }
        }
    }

    return true
}

/**
 * Парсит ФИО из строки в объект
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
 */
export type UpdateFormFn = (path: string, value: unknown) => void

/**
 * Создает функцию обновления вложенных полей объекта
 */
export function createUpdateFn<T extends object>(
    setState: React.Dispatch<React.SetStateAction<T>>,
): UpdateFormFn {
    return (path: string, value: unknown) => {
        setState((prev) => {
            const keys = path.split('.')
            const newState = JSON.parse(JSON.stringify(prev))
            let current = newState

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]]
            }
            current[keys[keys.length - 1]] = value

            return newState
        })
    }
}

