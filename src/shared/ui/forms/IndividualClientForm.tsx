/**
 * Форма для физических лиц
 */

import { FormField, TrusteeFields } from './FormField'
import { FullNameField } from './FullNameField'
import type { UpdateFormFn } from '@/shared/lib/form-utils'

interface IndividualClientFormProps {
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

export function IndividualClientForm({
    updateCommon,
    onFirstFieldFilled,
}: IndividualClientFormProps) {
    const basePath = 'individualClient'

    return (
        <div className="space-y-4 sm:w-80 lg:w-96 xl:w-110">
            <FullNameField
                basePath={basePath}
                updateCommon={updateCommon}
                onFirstFieldFilled={onFirstFieldFilled}
            />

            <FormField
                label="Дата рождения"
                path={`${basePath}.birthday`}
                updateCommon={updateCommon}
                type="date"
                required
            />

            <FormField
                label="Паспорт серия"
                path={`${basePath}.passportSerial`}
                updateCommon={updateCommon}
                placeholder="0000"
                pattern="^\d{4}$"
                required
            />

            <FormField
                label="Паспорт номер"
                path={`${basePath}.passportNumber`}
                updateCommon={updateCommon}
                placeholder="000000"
                pattern="^\d{6}$"
                required
            />

            <FormField
                label="Кем выдан"
                path={`${basePath}.issuedBy`}
                updateCommon={updateCommon}
                placeholder="ОВД района..."
                required
            />

            <FormField
                label="Дата выдачи паспорта"
                path={`${basePath}.passportIssueDate`}
                updateCommon={updateCommon}
                type="date"
                required
            />

            <FormField
                type='number'
                label="ИНН"
                path={`${basePath}.inn`}
                updateCommon={updateCommon}
                placeholder="123456789012"
                maxLength={12}
                minLength={12}
                required
            />

            <FormField
                label="СНИЛС"
                path={`${basePath}.snils`}
                updateCommon={updateCommon}
                placeholder="123-456-789 00"
                pattern="^\d{3}-\d{3}-\d{3}\s\d{2}$"
                required
            />

            <FormField
                label="Адрес регистрации"
                path={`${basePath}.address`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Ленина, д. 1"
                required
            />

            <FormField
                label="Почтовый адрес"
                path={`${basePath}.postalAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Ленина, д. 1"
                required
            />

            <FormField
                label="Контактный телефон"
                path={`${basePath}.phoneNumber`}
                updateCommon={updateCommon}
                type="tel"
                placeholder="+7 (XXX) XXX-XX-XX"
                pattern="^\+7\s?\(\d{3}\)\s?\d{3}-\d{2}-\d{2}$"
                required
            />

            <FormField
                label="Email"
                path={`${basePath}.email`}
                updateCommon={updateCommon}
                type="email"
                placeholder="example@mail.ru"
                required
            />

            <TrusteeFields basePath={basePath} updateCommon={updateCommon} />
        </div>
    )
}

export default IndividualClientForm

