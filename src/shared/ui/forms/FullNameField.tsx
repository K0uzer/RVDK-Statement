/**
 * Компонент поля ФИО с парсингом
 */

import { Field, FieldLabel } from '@/shared/ui'
import { Input } from '@/shared/ui'
import { parseFullName } from '@/shared/lib/form-utils'
import type { UpdateFormFn } from '@/shared/lib/form-utils'

interface FullNameFieldProps {
    basePath: string
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

export function FullNameField({
    basePath,
    updateCommon,
    onFirstFieldFilled,
}: FullNameFieldProps) {
    return (
        <Field>
            <FieldLabel className="mt-5">
                Ф.И.О. (последнее – при наличии)
                <span className="text-red-500 ml-1">*</span>
            </FieldLabel>
            <Input
                required
                placeholder="Иванов Иван Иванович"
                onChange={(e) => {
                    const { firstName, middleName, lastName } = parseFullName(
                        e.target.value,
                    )
                    updateCommon(`${basePath}.fullName.firstName`, firstName)
                    updateCommon(`${basePath}.fullName.middleName`, middleName)
                    updateCommon(`${basePath}.fullName.lastName`, lastName)
                    onFirstFieldFilled?.()
                }}
            />
        </Field>
    )
}

