/**
 * Переиспользуемый компонент поля формы
 */

import { Input } from '@/shared/ui/input'
import { Field, FieldLabel, FieldDescription } from '@/shared/ui/field'
import type { UpdateFormFn } from '@/shared/lib/form-utils'

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
                onChange={(e) => {
                    const value = parseAsNumber
                        ? +e.target.value
                        : e.target.value
                    updateCommon(path, value)
                    onChangeCallback?.()
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

