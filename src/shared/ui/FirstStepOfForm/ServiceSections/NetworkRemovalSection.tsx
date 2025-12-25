/**
 * Секция для услуги "Вынос сетей"
 */

import { Field, FieldLabel } from '@/shared/ui'
import { ServiceCheckboxGroup } from '@/shared/ui'
import { InputWithTooltip } from '@/shared/ui'
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

