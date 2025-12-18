/**
 * Форма для физических лиц
 */

import { FormField, TrusteeFields } from './FormField'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { UpdateFormFn } from '@/utils/form'
import { parseFullName } from '@/utils/form'

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
            {/* ФИО */}
            <Field>
                <FieldLabel className="mt-5">
                    Ф.И.О. (последнее – при наличии)
                    <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <Input
                    required
                    placeholder="Иванов Иван Иванович"
                    onChange={(e) => {
                        const { firstName, middleName, lastName } = parseFullName(
                            e.target.value,
                        )
                        updateCommon(`${basePath}.fullName.firstName`, firstName)
                        updateCommon(`${basePath}.fullName.middleName`, middleName)
                        updateCommon(`${basePath}.fullName.lastName`, lastName)
                        onFirstFieldFilled?.()
                    }}
                />
            </Field>

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
                required
            />

            <FormField
                label="Паспорт номер"
                path={`${basePath}.passportNumber`}
                updateCommon={updateCommon}
                placeholder="000000"
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
                label="ИНН"
                path={`${basePath}.inn`}
                updateCommon={updateCommon}
                placeholder="123456789012"
                required
            />

            <FormField
                label="СНИЛС"
                path={`${basePath}.snils`}
                updateCommon={updateCommon}
                placeholder="123-456-789 00"
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
                placeholder="+7 999 123-45-67"
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

