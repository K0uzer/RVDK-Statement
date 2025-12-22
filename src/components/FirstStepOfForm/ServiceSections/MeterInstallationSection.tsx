/**
 * Секция для услуги "Установка прибора учета"
 */

import { Field, FieldLabel } from '@/components/ui/field'
import { ServiceCheckboxGroup } from '@/components/ui/service-checkbox'
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

