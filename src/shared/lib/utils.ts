/**
 * Переиспользуемые утилиты
 * 
 * FSD: shared/lib - общие утилиты и библиотеки
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

