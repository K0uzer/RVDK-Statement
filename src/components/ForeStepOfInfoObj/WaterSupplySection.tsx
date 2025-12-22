/**
 * Секция водоснабжения
 * Объём в м³/сутки, м³/час, л/с
 */

import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import type { UpdateFormFn } from '@/utils/form'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired } from '@/constants'

interface WaterSupplySectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
}

export function WaterSupplySection({
    selectedServiceName,
    updateCommon,
}: WaterSupplySectionProps) {
    return (
        <Field>
            <RequiredLabel required={isFieldRequired(selectedServiceName, 'waterSupplyPerDay')}>
                Водоснабжение
            </RequiredLabel>
            <div className="grid grid-cols-3 gap-2">
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.supplyVolumePerDay', +e.target.value)
                    }}
                    placeholder="м³/сутки"
                    type="number"
                    min={0}
                />
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.supplyVolumePerHour', +e.target.value)
                    }}
                    placeholder="м³/час"
                    type="number"
                    min={0}
                />
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.supplyVolumePerSecond', +e.target.value)
                    }}
                    placeholder="л/с"
                    type="number"
                    min={0}
                />
            </div>
        </Field>
    )
}

