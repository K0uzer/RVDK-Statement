/**
 * Форма для юридических лиц
 */

import { FormField, TrusteeFields } from './FormField'
import type { UpdateFormFn } from '@/shared/lib/form-utils'

interface LegalClientFormProps {
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

export function LegalClientForm({
    updateCommon,
    onFirstFieldFilled,
}: LegalClientFormProps) {
    const basePath = 'legalClient'

    return (
        <div className="space-y-4 sm:w-80 lg:w-96 xl:w-110">
            <FormField
                label="Полное наименование организации"
                path={`${basePath}.nameFull`}
                updateCommon={updateCommon}
                placeholder="Общество с ограниченной ответственностью «Пример»"
                required
                onChangeCallback={onFirstFieldFilled}
            />

            <FormField
                label="Сокращённое наименование"
                path={`${basePath}.nameShort`}
                updateCommon={updateCommon}
                placeholder="ООО «Пример»"
                required
            />

            <FormField
                type='number'
                label="ОГРН"
                path={`${basePath}.ogrn`}
                updateCommon={updateCommon}
                placeholder="1234567890123"
                maxLength={13}
                minLength={13}
                required
            />

            <FormField
                type='number'
                label="ИНН"
                path={`${basePath}.inn`}
                updateCommon={updateCommon}
                placeholder="1234567890"
                maxLength={10}
                required
            />

            <FormField
                label="Место нахождения (по ЕГРЮЛ)"
                path={`${basePath}.legalAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Ленина, д. 1"
                required
            />

            <FormField
                label="Фактический адрес"
                path={`${basePath}.factAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Ленина, д. 1"
                required
            />

            <FormField
                label="Почтовый адрес"
                path={`${basePath}.postalAddress`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, а/я 10"
                required
            />

            <FormField
                label="Контактный телефон"
                path={`${basePath}.phoneNumber`}
                updateCommon={updateCommon}
                type="tel"
                placeholder="+7 863 123-45-67"
                required
            />

            <FormField
                label="Email"
                path={`${basePath}.email`}
                updateCommon={updateCommon}
                type="email"
                placeholder="info@company.ru"
                required
            />

            <TrusteeFields basePath={basePath} updateCommon={updateCommon} />
        </div>
    )
}

export default LegalClientForm

