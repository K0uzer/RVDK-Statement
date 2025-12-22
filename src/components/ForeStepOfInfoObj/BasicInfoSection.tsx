/**
 * Секция основной информации об объекте
 * Название, адрес, кадастр, площадь
 */

import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import type { UpdateFormFn } from '@/utils/form'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired } from '@/constants'

interface BasicInfoSectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

export function BasicInfoSection({
    selectedServiceName,
    updateCommon,
    onFirstFieldFilled,
}: BasicInfoSectionProps) {
    return (
        <>
            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'name')}>
                    Наименование объекта
                </RequiredLabel>
                <Input
                    type="text"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.name', e.target.value)
                        onFirstFieldFilled?.()
                    }}
                    placeholder="Наименование объекта"
                    required={isFieldRequired(selectedServiceName, 'name')}
                />
            </Field>

            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'address')}>
                    Адрес подключаемого объекта
                </RequiredLabel>
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.address', e.target.value)
                    }}
                    placeholder="г. Ростов-на-Дону, ул. ..."
                    required={isFieldRequired(selectedServiceName, 'address')}
                />
            </Field>

            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'cadastralNumber')}>
                    Кадастровый номер
                </RequiredLabel>
                <Input
                    type="text"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.cadastralNumber', e.target.value)
                    }}
                    placeholder="00:00:0000000:0000"
                    required={isFieldRequired(selectedServiceName, 'cadastralNumber')}
                />
            </Field>

            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'area')}>
                    Площадь земельного участка (м²)
                </RequiredLabel>
                <Input
                    type="number"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.area', +e.target.value)
                    }}
                    placeholder="Площадь земельного участка"
                    min={0}
                    required={isFieldRequired(selectedServiceName, 'area')}
                />
            </Field>
        </>
    )
}

