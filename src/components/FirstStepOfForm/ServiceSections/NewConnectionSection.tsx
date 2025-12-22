/**
 * Секция для услуги "Новое подключение"
 */

import { Field, FieldLabel } from '@/components/ui/field'
import { ServiceCheckboxGroup } from '@/components/ui/service-checkbox'
import { NEW_CONNECTION_OPTIONS } from '../constants'

interface NewConnectionSectionProps {
    selectedValues: string[]
    onToggle: (value: string, type?: 0 | 1) => void
}

export function NewConnectionSection({
    selectedValues,
    onToggle,
}: NewConnectionSectionProps) {
    return (
        <Field className="mt-5 w-full border-b-0">
            <FieldLabel>Новое подключение</FieldLabel>
            <ServiceCheckboxGroup
                title="Тип подключения"
                options={NEW_CONNECTION_OPTIONS}
                selectedValues={selectedValues}
                onToggle={onToggle}
                className="mt-2"
            />
        </Field>
    )
}

