/**
 * Секция признаков подключения
 * Чекбоксы для водоснабжения и водоотведения
 */

import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { useState } from 'react'
import type { UpdateFormFn } from '@/utils/form'

interface ConnectionStatusSectionProps {
    updateCommon: UpdateFormFn
}

export function ConnectionStatusSection({
    updateCommon,
}: ConnectionStatusSectionProps) {
    const [isSupply, setIsSupply] = useState(false)
    const [isWaterDisposal, setIsWaterDisposal] = useState(false)

    return (
        <>
            <Field>
                <FieldLabel className="mt-3">
                    Объект присоединен к сетям водоснабжения?
                </FieldLabel>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={isSupply}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterSupply', !isSupply)
                                setIsSupply(!isSupply)
                            }}
                            id="waterSupplyYes"
                        />
                        <label htmlFor="waterSupplyYes">Да</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={!isSupply}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterSupply', isSupply)
                                setIsSupply(!isSupply)
                            }}
                            id="waterSupplyNo"
                        />
                        <label htmlFor="waterSupplyNo">Нет</label>
                    </div>
                </div>
            </Field>

            <Field>
                <FieldLabel className="mt-3">
                    Объект присоединен к сетям водоотведения?
                </FieldLabel>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={isWaterDisposal}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterDisposal', !isWaterDisposal)
                                setIsWaterDisposal(!isWaterDisposal)
                            }}
                            id="sewerYes"
                        />
                        <label htmlFor="sewerYes">Да</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={!isWaterDisposal}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterDisposal', isWaterDisposal)
                                setIsWaterDisposal(!isWaterDisposal)
                            }}
                            id="sewerNo"
                        />
                        <label htmlFor="sewerNo">Нет</label>
                    </div>
                </div>
            </Field>
        </>
    )
}

