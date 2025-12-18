/**
 * Форма для органов государственной власти и местного самоуправления
 */

import { FormField, TrusteeFields } from './FormField'
import type { UpdateFormFn } from '@/utils/form'

interface GovClientFormProps {
    updateCommon: UpdateFormFn
    onFirstFieldFilled?: () => void
}

export function GovClientForm({
    updateCommon,
    onFirstFieldFilled,
}: GovClientFormProps) {
    const basePath = 'legalClientGov'

    return (
        <div className="space-y-4 sm:w-80 lg:w-96 xl:w-110">
            <FormField
                label="Полное наименование органа"
                path={`${basePath}.nameFull`}
                updateCommon={updateCommon}
                placeholder="Администрация города Ростова-на-Дону"
                required
                onChangeCallback={onFirstFieldFilled}
            />

            <FormField
                label="Сокращённое наименование"
                path={`${basePath}.nameShort`}
                updateCommon={updateCommon}
                placeholder="Администрация г. Ростова-на-Дону"
                required
            />

            <FormField
                label="Реквизиты нормативного акта"
                path={`${basePath}.actingBasis`}
                updateCommon={updateCommon}
                placeholder="Устав города, Постановление №XX от __.__.____"
                required
                description="Нормативный правовой акт, в соответствии с которым осуществляется деятельность органа"
            />

            <FormField
                label="Место нахождения"
                path={`${basePath}.location`}
                updateCommon={updateCommon}
                placeholder="г. Ростов-на-Дону, ул. Большая Садовая, д. 47"
                required
            />

            <FormField
                label="Почтовый адрес"
                path={`${basePath}.postalAddress`}
                updateCommon={updateCommon}
                placeholder="344002, г. Ростов-на-Дону, ул. Большая Садовая, д. 47"
                required
            />

            <FormField
                label="Контактный телефон"
                path={`${basePath}.phoneNumber`}
                updateCommon={updateCommon}
                type="tel"
                placeholder="+7 863 240-00-00"
                required
            />

            <FormField
                label="Email"
                path={`${basePath}.email`}
                updateCommon={updateCommon}
                type="email"
                placeholder="info@rostov-gorod.ru"
                required
            />

            <TrusteeFields basePath={basePath} updateCommon={updateCommon} />
        </div>
    )
}

export default GovClientForm

