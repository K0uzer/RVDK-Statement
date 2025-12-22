/**
 * Секция смежного владельца
 * Разные формы для физ.лиц и юр.лиц
 */

import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import type { UpdateFormFn } from '@/utils/form'
import { RequiredLabel } from './RequiredLabel'

interface AdjacentOwnerSectionProps {
    tabsState: string
    updateCommon: UpdateFormFn
}

const tabsNames = {
    fiz: 'Физ. лица',
    ur: 'Юр. лица',
}

export function AdjacentOwnerSection({
    tabsState,
    updateCommon,
}: AdjacentOwnerSectionProps) {
    // Для юридических лиц
    if (tabsState === tabsNames.ur) {
        return (
            <>
                <Field>
                    <RequiredLabel required>Адрес смежного владельца</RequiredLabel>
                    <Input
                        type="text"
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerLegal.address',
                                e.target.value,
                            )
                        }}
                        placeholder="г. Ростов-на-Дону, ул. ..."
                        required
                    />
                </Field>
                <Field>
                    <RequiredLabel required>
                        Наименование смежного владельца
                    </RequiredLabel>
                    <Input
                        type="text"
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerLegal.name',
                                e.target.value,
                            )
                        }}
                        placeholder="Наименование организации"
                        required
                    />
                </Field>
                <Field>
                    <FieldLabel className="mt-3">Данные смежного владельца</FieldLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerLegal.cadastralNumber',
                                e.target.value,
                            )
                        }}
                        placeholder="Кадастровый номер"
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerLegal.objectiveAddress',
                                e.target.value,
                            )
                        }}
                        placeholder="Адрес участка"
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerLegal.inn',
                                e.target.value,
                            )
                        }}
                        placeholder="ИНН"
                    />
                </Field>
            </>
        )
    }

    // Для физических лиц
    if (tabsState === tabsNames.fiz) {
        return (
            <>
                <Field>
                    <RequiredLabel required>Адрес смежного владельца</RequiredLabel>
                    <Input
                        type="text"
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerIndividual.address',
                                e.target.value,
                            )
                        }}
                        placeholder="г. Ростов-на-Дону, ул. ..."
                        required
                    />
                </Field>
                <Field>
                    <RequiredLabel required>ФИО смежного владельца</RequiredLabel>
                    <Input
                        type="text"
                        onChange={(e) => {
                            const values = e.target.value.split(' ')
                            updateCommon(
                                'objectiveInfo.coOwnerIndividual.fullName.firstName',
                                values[0] || '',
                            )
                            updateCommon(
                                'objectiveInfo.coOwnerIndividual.fullName.middleName',
                                values[1] || '',
                            )
                            updateCommon(
                                'objectiveInfo.coOwnerIndividual.fullName.lastName',
                                values[2] || '',
                            )
                        }}
                        placeholder="Иванов Иван Иванович"
                        required
                    />
                </Field>
                <Field>
                    <FieldLabel className="mt-3">
                        Данные участка смежного владельца
                    </FieldLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerIndividual.cadastralNumber',
                                e.target.value,
                            )
                        }}
                        placeholder="Кадастровый номер"
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.coOwnerIndividual.objectiveAddress',
                                e.target.value,
                            )
                        }}
                        placeholder="Адрес участка"
                    />
                </Field>
            </>
        )
    }

    return null
}

