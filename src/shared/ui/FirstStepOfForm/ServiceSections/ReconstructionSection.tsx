/**
 * Секция для услуги "Реконструкция существующих сетей"
 */

import { Field, FieldLabel } from '@/shared/ui'
import { ServiceCheckboxGroup } from '@/shared/ui'
import { InputWithTooltip } from '@/shared/ui'
import { WATER_OPTIONS } from '../constants'

interface ReconstructionSectionProps {
    selectedValues: string[]
    diameter: string
    onToggle: (value: string) => void
    onDiameterChange: (value: string) => void
}

export function ReconstructionSection({
    selectedValues,
    diameter,
    onToggle,
    onDiameterChange,
}: ReconstructionSectionProps) {
    return (
        <Field className="mt-5 w-full">
            <FieldLabel>
                Реконструкция существующих сетей без изменения
                потребляемой нагрузки
            </FieldLabel>
            <div className="flex flex-col gap-3 mt-2">
                <ServiceCheckboxGroup
                    title="Тип сетей"
                    options={WATER_OPTIONS.map((o) => ({
                        ...o,
                        id: `recon-${o.id}`,
                    }))}
                    selectedValues={selectedValues}
                    onToggle={onToggle}
                />

                {selectedValues.length > 0 && (
                    <InputWithTooltip
                        placeholder={`Укажите диаметр ${selectedValues[0].toLowerCase()} (мм)`}
                        tooltip="Диаметр существующих сетей в миллиметрах"
                        type="number"
                        value={diameter}
                        onChange={onDiameterChange}
                    />
                )}
            </div>
        </Field>
    )
}

