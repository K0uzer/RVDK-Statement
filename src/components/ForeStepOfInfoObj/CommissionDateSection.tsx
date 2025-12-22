/**
 * Секция срока ввода в эксплуатацию
 */

import { Input } from '@/components/ui/input'
import { Field } from '@/components/ui/field'
import type { UpdateFormFn } from '@/utils/form'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired, isFieldVisible } from '@/constants'

interface CommissionDateSectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
}

export function CommissionDateSection({
    selectedServiceName,
    updateCommon,
}: CommissionDateSectionProps) {
    if (!isFieldVisible(selectedServiceName, 'commissionDate')) {
        return null
    }

    return (
        <Field>
            <RequiredLabel required={isFieldRequired(selectedServiceName, 'commissionDate')}>
                Планируемый срок ввода в эксплуатацию
            </RequiredLabel>
            <Input
                type="date"
                onChange={(e) => {
                    updateCommon('objectiveInfo.commissionPlanedOn', e.target.value)
                }}
            />
        </Field>
    )
}

