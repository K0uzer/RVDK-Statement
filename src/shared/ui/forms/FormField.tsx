/**
 * Переиспользуемый компонент поля формы
 */

import { Input } from '@/shared/ui/input'
import { Field, FieldLabel, FieldDescription } from '@/shared/ui/field'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import { formatPhoneNumber, calculateCursorPosition } from '@/shared/lib/phone-mask'

interface FormFieldProps {
    label: string
    path: string
    updateCommon: UpdateFormFn
    type?: 'text' | 'email' | 'date' | 'number' | 'tel'
    placeholder?: string
    description?: string
    required?: boolean
    min?: number
    onChangeCallback?: () => void
    parseAsNumber?: boolean
    maxLength?: number
    minLength?: number
    pattern?: string
}

export function FormField({
    label,
    path,
    updateCommon,
    type = 'text',
    placeholder,
    description,
    required = false,
    min,
    onChangeCallback,
    parseAsNumber = false,
    maxLength,
    minLength,
    pattern
}: FormFieldProps) {
    return (
        <Field>
            <FieldLabel className="mt-5">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </FieldLabel>
            <Input
                required={required}
                type={type}
                placeholder={placeholder}
                min={min}
                maxLength={maxLength}
                minLength={minLength}
                pattern={pattern}
                onKeyDown={(e) => {
                    // Для телефона: если пользователь вводит 8 в начале, заменяем на 7
                    if (type === 'tel' && e.key === '8') {
                        const input = e.target as HTMLInputElement
                        const digitsOnly = input.value.replace(/\D/g, '')
                        
                        // Если поле пустое или только форматирующие символы, заменяем 8 на 7
                        if (digitsOnly.length === 0) {
                            e.preventDefault()
                            // Вставляем +7 вместо 8
                            const newValue = input.value + '7'
                            const formatted = formatPhoneNumber(newValue)
                            input.value = formatted
                            const cursorPos = calculateCursorPosition(newValue, formatted, formatted.length)
                            input.setSelectionRange(cursorPos, cursorPos)
                            updateCommon(path, formatted)
                            onChangeCallback?.()
                        }
                    }
                }}
                onInput={(e) => {
                    // Применяем маску для телефона
                    if (type === 'tel') {
                        const input = e.target as HTMLInputElement
                        const oldValue = input.value
                        const cursorPosition = input.selectionStart || 0
                        const formatted = formatPhoneNumber(oldValue)
                        
                        // Вычисляем новую позицию курсора с учетом форматирования
                        const newCursorPosition = calculateCursorPosition(
                            oldValue,
                            formatted,
                            cursorPosition,
                        )
                        
                        input.value = formatted
                        input.setSelectionRange(newCursorPosition, newCursorPosition)

                        // Обновляем значение в форме
                        updateCommon(path, formatted)
                        onChangeCallback?.()
                    }
                }}
                onChange={(e) => {
                    // Для телефона onChange уже обработан в onInput
                    if (type !== 'tel') {
                        const value = parseAsNumber
                            ? +e.target.value
                            : e.target.value
                        updateCommon(path, value)
                        onChangeCallback?.()
                    }
                }}
            />
            {description && <FieldDescription>{description}</FieldDescription>}
        </Field>
    )
}

interface TrusteeFieldsProps {
    basePath: string
    updateCommon: UpdateFormFn
}

/**
 * Поля доверенности (переиспользуемые)
 */
export function TrusteeFields({ basePath, updateCommon }: TrusteeFieldsProps) {
    return (
        <Field>
            <FieldLabel className="mt-5">Доверенность</FieldLabel>
            <Input
                type='number'
                placeholder="Номер доверенности"
                onChange={(e) =>
                    updateCommon(`${basePath}.trustee.trustNumber`, e.target.value)
                }
            />
            <Input
                placeholder="ФИО доверенного представителя"
                onChange={(e) =>
                    updateCommon(`${basePath}.trustee.trusteeName`, e.target.value)
                }
            />
            <Input
                type="date"
                placeholder="Дата выдачи"
                onChange={(e) =>
                    updateCommon(`${basePath}.trustee.trustDateFrom`, e.target.value)
                }
            />
            <Input
                type="date"
                placeholder="Срок действия до"
                onChange={(e) =>
                    updateCommon(`${basePath}.trustee.trustDateTo`, e.target.value)
                }
            />
        </Field>
    )
}

export default FormField

