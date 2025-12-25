/**
 * Секция для услуги "Подключение к сетям смежного владельца"
 */

import { Field, FieldLabel } from '@/shared/ui'
import { ServiceCheckboxGroup } from '@/shared/ui'
import { WATER_OPTIONS } from '../constants'

interface AdjacentOwnerSectionProps {
    selectedValues: string[]
    onToggle: (value: string, type?: 0 | 1) => void
}

export function AdjacentOwnerSection({
    selectedValues,
    onToggle,
}: AdjacentOwnerSectionProps) {
    return (
        <Field className="mt-5 w-64">
            <FieldLabel>Подключение к сетям смежного владельца</FieldLabel>
            <ServiceCheckboxGroup
                title="Тип подключения"
                options={WATER_OPTIONS.map((o) => ({
                    ...o,
                    id: `adjacent-${o.id}`,
                }))}
                selectedValues={selectedValues}
                onToggle={onToggle}
                className="mt-2"
            />
        </Field>
    )
}

