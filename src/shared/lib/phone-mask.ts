/**
 * Утилиты для работы с маской телефона
 */

/**
 * Форматирует номер телефона в формат +7 (XXX) XXX-XX-XX
 * @param value - Введенное значение
 * @returns Отформатированный номер телефона
 */
export function formatPhoneNumber(value: string): string {
    // Удаляем все символы кроме цифр
    let numbers = value.replace(/\D/g, '')
    
    // Если пусто, возвращаем пустую строку
    if (!numbers) {
        return ''
    }
    
    // Если начинается с 8, заменяем на 7
    if (numbers.startsWith('8')) {
        numbers = '7' + numbers.slice(1)
    }
    
    // Если не начинается с 7, добавляем 7
    if (!numbers.startsWith('7')) {
        numbers = '7' + numbers
    }
    
    // Ограничиваем до 11 цифр (7 + 10 цифр)
    numbers = numbers.slice(0, 11)
    
    // Форматируем в зависимости от длины
    if (numbers.length <= 1) {
        return numbers ? `+${numbers}` : ''
    } else if (numbers.length <= 4) {
        return `+${numbers.slice(0, 1)} (${numbers.slice(1)}`
    } else if (numbers.length <= 7) {
        return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4)}`
    } else if (numbers.length <= 9) {
        return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7)}`
    } else {
        return `+${numbers.slice(0, 1)} (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9, 11)}`
    }
}

/**
 * Вычисляет новую позицию курсора после форматирования
 * @param oldValue - Старое значение
 * @param newValue - Новое отформатированное значение
 * @param oldCursorPosition - Старая позиция курсора
 * @returns Новая позиция курсора
 */
export function calculateCursorPosition(
    oldValue: string,
    newValue: string,
    oldCursorPosition: number,
): number {
    // Если новое значение пустое, курсор в начале
    if (!newValue) {
        return 0
    }
    
    // Подсчитываем количество цифр до позиции курсора в старом значении
    const digitsBeforeCursor = oldValue
        .slice(0, oldCursorPosition)
        .replace(/\D/g, '').length
    
    // Если цифр нет, курсор после первого символа (+)
    if (digitsBeforeCursor === 0) {
        return newValue.startsWith('+') ? 1 : 0
    }
    
    // Находим позицию в новом значении, где находится эта же цифра
    let digitCount = 0
    for (let i = 0; i < newValue.length; i++) {
        if (/\d/.test(newValue[i])) {
            digitCount++
            // Если достигли нужного количества цифр, ставим курсор после этой цифры
            if (digitCount === digitsBeforeCursor) {
                // Если следующий символ - форматирующий (скобка, пробел, дефис), ставим курсор после него
                if (i + 1 < newValue.length && /\D/.test(newValue[i + 1])) {
                    return i + 2
                }
                return i + 1
            }
        }
    }
    
    // Если не нашли (все цифры были удалены), возвращаем конец строки
    return newValue.length
}

/**
 * Валидация номера телефона
 * Проверяет формат +7 (XXX) XXX-XX-XX
 */
export const phonePattern = '^\\+7\\s?\\(\\d{3}\\)\\s?\\d{3}-\\d{2}-\\d{2}$'
