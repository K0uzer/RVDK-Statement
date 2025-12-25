/**
 * Секция срока ввода в эксплуатацию
 */

import { Input } from '@/shared/ui'
import { Field } from '@/shared/ui'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired, isFieldVisible } from '@/shared/config/constants'

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

