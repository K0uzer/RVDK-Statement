/**
 * Секция полей технических условий
 * Используется для корректировки/аннулирования
 */

import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import type { UpdateFormFn } from '@/utils/form'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired } from '@/constants'

interface TcFieldsSectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
}

export function TcFieldsSection({
    selectedServiceName,
    updateCommon,
}: TcFieldsSectionProps) {
    return (
        <Field>
            <RequiredLabel required={isFieldRequired(selectedServiceName, 'tcNumber')}>
                Технические условия №
            </RequiredLabel>
            <Input
                onChange={(e) => {
                    updateCommon('objectiveInfo.number', e.target.value)
                }}
                placeholder="№ документа"
                required={isFieldRequired(selectedServiceName, 'tcNumber')}
            />
            <Input
                onChange={(e) => {
                    updateCommon('objectiveInfo.date', e.target.value)
                }}
                placeholder="от {дата} г."
                type="date"
                required={isFieldRequired(selectedServiceName, 'tcDate')}
            />
        </Field>
    )
}

