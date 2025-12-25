/**
 * Секция для услуги "Подключение к внутридворовым сетям"
 */

import { Field, FieldLabel } from '@/shared/ui'
import { ServiceCheckboxGroup } from '@/shared/ui'
import { WATER_OPTIONS } from '../constants'

interface YardNetworksSectionProps {
    selectedValues: string[]
    onToggle: (value: string, type?: 0 | 1) => void
}

export function YardNetworksSection({
    selectedValues,
    onToggle,
}: YardNetworksSectionProps) {
    return (
        <Field className="mt-5 w-64">
            <FieldLabel>
                Подключение к внутридворовым (внутриплощадочным) сетям
            </FieldLabel>
            <ServiceCheckboxGroup
                title="Тип подключения"
                options={WATER_OPTIONS.map((o) => ({
                    ...o,
                    id: `yard-${o.id}`,
                }))}
                selectedValues={selectedValues}
                onToggle={onToggle}
                className="mt-2"
            />
        </Field>
    )
}

