/**
 * Секция для услуги "Вынос сетей"
 */

import { Field, FieldLabel } from '@/components/ui/field'
import { ServiceCheckboxGroup } from '@/components/ui/service-checkbox'
import { InputWithTooltip } from '@/components/ui/input-with-tooltip'
import { WATER_OPTIONS } from '../constants'

interface NetworkRemovalSectionProps {
    selectedValues: string[]
    diameter: string
    onToggle: (value: string, type?: 0 | 1) => void
    onDiameterChange: (value: string) => void
}

export function NetworkRemovalSection({
    selectedValues,
    diameter,
    onToggle,
    onDiameterChange,
}: NetworkRemovalSectionProps) {
    return (
        <Field className="mt-5 w-full">
            <FieldLabel>Вынос сетей</FieldLabel>
            <div className="flex flex-col gap-3 mt-2">
                <ServiceCheckboxGroup
                    title="Тип сетей"
                    options={WATER_OPTIONS.map((o) => ({
                        ...o,
                        id: `removal-${o.id}`,
                    }))}
                    selectedValues={selectedValues}
                    onToggle={onToggle}
                />

                {selectedValues.length > 0 && (
                    <InputWithTooltip
                        placeholder={`Укажите диаметр ${selectedValues[0].toLowerCase()} (мм)`}
                        tooltip="Диаметр выносимых сетей в миллиметрах"
                        type="number"
                        value={diameter}
                        onChange={onDiameterChange}
                    />
                )}
            </div>
        </Field>
    )
}

