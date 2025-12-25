/**
 * Секция характеристик здания
 * Этажность, высота, квартиры, жители
 */

import { Input } from '@/shared/ui'
import { Field, FieldDescription } from '@/shared/ui'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired, isFieldVisible } from '@/shared/config/constants'

interface BuildingCharacteristicsSectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
}

export function BuildingCharacteristicsSection({
    selectedServiceName,
    updateCommon,
}: BuildingCharacteristicsSectionProps) {
    return (
        <>
            {isFieldVisible(selectedServiceName, 'floors') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'floors')}>
                        Количество этажей
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.floors', +e.target.value)
                        }}
                        placeholder="Количество этажей"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            {isFieldVisible(selectedServiceName, 'height') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'height')}>
                        Высота объекта (м)
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.height', +e.target.value)
                        }}
                        placeholder="Высота объекта"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            {isFieldVisible(selectedServiceName, 'flats') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'flats')}>
                        Количество квартир (для МКД)
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.flats', +e.target.value)
                        }}
                        placeholder="Количество квартир"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            {isFieldVisible(selectedServiceName, 'settlers') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'settlers')}>
                        Количество жителей
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.settlers', +e.target.value)
                        }}
                        placeholder="Количество жителей"
                        type="number"
                        min={0}
                    />
                    <FieldDescription>
                        Обязательно для МКД, гостиниц
                    </FieldDescription>
                </Field>
            )}
        </>
    )
}

