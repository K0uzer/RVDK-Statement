/**
 * Компонент для рендеринга массива полей формы
 * Устраняет дублирование кода в формах заявителей
 */

import { FormField } from './FormField'
import type { UpdateFormFn } from '@/utils/form'
import type { FieldConfig } from '@/utils/formFields'

interface FormFieldsRendererProps {
    fields: FieldConfig[]
    basePath?: string
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

/**
 * Рендерит массив полей формы из конфигурации
 * 
 * @example
 * const fields = getIndividualClientFields('individualClient')
 * <FormFieldsRenderer 
 *   fields={fields} 
 *   updateCommon={updateCommon}
 *   onFirstFieldFilled={handleStart}
 * />
 */
export function FormFieldsRenderer({
    fields,
    basePath = '',
    updateCommon,
    onFirstFieldFilled,
}: FormFieldsRendererProps) {
    return (
        <>
            {fields.map((field, index) => (
                <FormField
                    key={field.path}
                    label={field.label}
                    path={basePath ? `${basePath}.${field.path}` : field.path}
                    updateCommon={updateCommon}
                    type={field.type}
                    placeholder={field.placeholder}
                    description={field.description}
                    required={field.required}
                    min={field.min}
                    parseAsNumber={field.parseAsNumber}
                    // Вызываем callback только для первого поля
                    onChangeCallback={index === 0 ? onFirstFieldFilled : undefined}
                />
            ))}
        </>
    )
}

export default FormFieldsRenderer

