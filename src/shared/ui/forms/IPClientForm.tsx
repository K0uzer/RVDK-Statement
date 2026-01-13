/**
 * Форма для индивидуальных предпринимателей
 */

import { FormField, TrusteeFields } from './FormField'
import { Field, FieldLabel } from '@/shared/ui'
import { Input } from '@/shared/ui'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import { parseFullName } from '@/shared/lib/form-utils'

interface IPClientFormProps {
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

export function IPClientForm({
    updateCommon,
    onFirstFieldFilled,
}: IPClientFormProps) {
    const basePath = 'legalClientIP'

    return (
        <div className="space-y-4 sm:w-80 lg:w-96 xl:w-110">
            {/* ФИО ИП */}
            <Field>
                <FieldLabel className="mt-5">
                    Наименование ИП (ФИО)
                    <span className="text-red-500 ml-1">*</span>
                </FieldLabel>
                <Input
                    required
                    placeholder="ИП Иванов Иван Иванович"
                    onChange={(e) => {
                        // Убираем "ИП " из начала если есть
                        const value = e.target.value.replace(/^ИП\s+/i, '')
                        const { firstName, middleName, lastName } =
                            parseFullName(value)
                        updateCommon(`${basePath}.fullName.firstName`, firstName)
                        updateCommon(`${basePath}.fullName.middleName`, middleName)
                        updateCommon(`${basePath}.fullName.lastName`, lastName)
                        onFirstFieldFilled?.()
                    }}
                />
            </Field>

            <FormField
                type='number'
                label="ОГРНИП"
                path={`${basePath}.ogrn`}
                updateCommon={updateCommon}
                placeholder="123456789012345"
                maxLength={15}
                minLength={15}
                required
            />

            <FormField
                label="ИНН"
                path={`${basePath}.inn`}
                updateCommon={updateCommon}
                placeholder="123456789012"
                pattern="^\d{12}$"
                maxLength={12}
                minLength={12}
                required
            />

            <FormField
                label="Адрес регистрации"
                path={`${basePath}.legalAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Пушкина, д. 9"
                required
            />

            <FormField
                label="Фактический адрес"
                path={`${basePath}.factAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Пушкина, д. 9"
            />

            <FormField
                label="Почтовый адрес"
                path={`${basePath}.postalAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, а/я 15"
                required
            />

            <FormField
                label="Телефон"
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
                placeholder="ip@example.ru"
                required
            />

            <TrusteeFields basePath={basePath} updateCommon={updateCommon} />
        </div>
    )
}

export default IPClientForm

