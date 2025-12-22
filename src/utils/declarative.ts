/**
 * Утилиты для декларативного программирования
 */

import type React from 'react'

/**
 * Рендерит компонент на основе конфигурации
 * 
 * @param config - Конфигурация с условием и компонентом
 * @param state - Состояние для проверки условия
 * @returns Компонент или null
 */
export function renderIf<T>(
    config: {
        condition: (state: T) => boolean
        component: React.ReactNode
    },
    state: T,
): React.ReactNode {
    return config.condition(state) ? config.component : null
}

/**
 * Рендерит первый компонент, условие которого выполнено
 * 
 * @param configs - Массив конфигураций с условиями
 * @param state - Состояние для проверки условий
 * @returns Первый подходящий компонент или null
 */
export function renderFirstMatch<T>(
    configs: Array<{
        condition: (state: T) => boolean
        component: React.ReactNode
    }>,
    state: T,
): React.ReactNode {
    const match = configs.find((config) => config.condition(state))
    return match ? match.component : null
}

/**
 * Создаёт функцию для безопасного извлечения значения из объекта по пути
 * 
 * @example
 * const getValue = createPathGetter('user.profile.name')
 * const name = getValue(data) // data.user.profile.name
 */
export function createPathGetter<T = unknown>(path: string) {
    return (obj: unknown): T | undefined => {
        return path.split('.').reduce<unknown>((current, key) => {
            if (current && typeof current === 'object' && key in current) {
                return (current as Record<string, unknown>)[key]
            }
            return undefined
        }, obj) as T | undefined
    }
}

/**
 * Создаёт функцию для безопасной установки значения по пути
 * 
 * @example
 * const setValue = createPathSetter('user.profile.name')
 * const newData = setValue(data, 'John')
 */
export function createPathSetter<T = unknown>(path: string) {
    return (obj: T, value: unknown): T => {
        const keys = path.split('.')
        const newObj = JSON.parse(JSON.stringify(obj)) as T
        let current = newObj as Record<string, unknown>

        for (let i = 0; i < keys.length - 1; i++) {
            if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
                current[keys[i]] = {}
            }
            current = current[keys[i]] as Record<string, unknown>
        }

        current[keys[keys.length - 1]] = value
        return newObj
    }
}

/**
 * Создаёт маппинг из массива объектов
 * 
 * @example
 * const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
 * const userMap = createMap(users, 'id') // { 1: {...}, 2: {...} }
 */
export function createMap<T, K extends keyof T>(
    items: T[],
    key: K,
): Record<string | number, T> {
    return items.reduce(
        (acc, item) => {
            const keyValue = item[key]
            if (keyValue !== null && keyValue !== undefined) {
                acc[String(keyValue)] = item
            }
            return acc
        },
        {} as Record<string | number, T>,
    )
}

/**
 * Группирует массив объектов по ключу
 * 
 * @example
 * const users = [{ role: 'admin', name: 'John' }, { role: 'user', name: 'Jane' }]
 * const grouped = groupBy(users, 'role') // { admin: [...], user: [...] }
 */
export function groupBy<T, K extends keyof T>(
    items: T[],
    key: K,
): Record<string, T[]> {
    return items.reduce(
        (acc, item) => {
            const keyValue = String(item[key] ?? '')
            if (!acc[keyValue]) {
                acc[keyValue] = []
            }
            acc[keyValue].push(item)
            return acc
        },
        {} as Record<string, T[]>,
    )
}

