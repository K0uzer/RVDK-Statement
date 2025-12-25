/**
 * Секция водоотведения
 * Объём в м³/сутки, м³/час, л/с
 */

import { Input } from '@/shared/ui'
import { Field } from '@/shared/ui'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired } from '@/shared/config/constants'

interface WaterDisposalSectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
}

export function WaterDisposalSection({
    selectedServiceName,
    updateCommon,
}: WaterDisposalSectionProps) {
    return (
        <Field>
            <RequiredLabel required={isFieldRequired(selectedServiceName, 'waterDisposalPerDay')}>
                Водоотведение
            </RequiredLabel>
            <div className="grid grid-cols-3 gap-2">
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.disposalVolumePerDay', +e.target.value)
                    }}
                    placeholder="м³/сутки"
                    type="number"
                    min={0}
                />
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.disposalVolumePerHour', +e.target.value)
                    }}
                    placeholder="м³/час"
                    type="number"
                    min={0}
                />
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.disposalVolumePerSecond', +e.target.value)
                    }}
                    placeholder="л/с"
                    type="number"
                    min={0}
                />
            </div>
        </Field>
    )
}

