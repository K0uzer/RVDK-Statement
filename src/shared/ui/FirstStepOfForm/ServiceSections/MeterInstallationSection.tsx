/**
 * Секция для услуги "Установка прибора учета"
 */

import { Field, FieldLabel } from '@/shared/ui'
import { ServiceCheckboxGroup } from '@/shared/ui'
import { METER_OPTIONS } from '../constants'

interface MeterInstallationSectionProps {
    selectedValues: string[]
    onToggle: (value: string) => void
}

export function MeterInstallationSection({
    selectedValues,
    onToggle,
}: MeterInstallationSectionProps) {
    return (
        <Field className="mt-5 w-64">
            <FieldLabel>На установку прибора учета</FieldLabel>
            <ServiceCheckboxGroup
                title="Тип прибора"
                options={METER_OPTIONS}
                selectedValues={selectedValues}
                onToggle={onToggle}
                className="mt-2"
            />
        </Field>
    )
}

