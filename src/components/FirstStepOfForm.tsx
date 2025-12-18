/**
 * Шаг 1: Детали выбранной услуги подключения
 * Рефакторинг FirsStepOfForm.tsx
 */

import { useState, useCallback } from 'react'
import { Field, FieldLabel } from './ui/field'
import { ServiceCheckboxGroup } from './ui/service-checkbox'
import { InputWithTooltip, TextareaField } from './ui/input-with-tooltip'
import { SERVICE_TITLES, PROVIDING_TYPES } from '@/constants/services'
import DialogForm from './DialogForm'
import type { ServiceT } from '@/types'
import type { UpdateFormFn } from '@/utils/form'

interface FirstStepOfFormProps {
    services: ServiceT[]
    updateCommon: UpdateFormFn
    selectedServiceId: string
}

// Опции для чекбоксов водоснабжения/водоотведения
const WATER_OPTIONS = [
    {
        id: 'water-supply',
        label: 'Водоснабжения',
        value: 'Водоснабжения',
        providingType: PROVIDING_TYPES.WATER_SUPPLY as 0 | 1,
    },
    {
        id: 'water-disposal',
        label: 'Водоотведения',
        value: 'Водоотведения',
        providingType: PROVIDING_TYPES.WATER_DISPOSAL as 0 | 1,
    },
]

const NEW_CONNECTION_OPTIONS = [
    {
        id: 'cold-water',
        label: 'К сетям холодного водоснабжения',
        value: 'К сетям холодного водоснабжения',
        providingType: PROVIDING_TYPES.WATER_SUPPLY as 0 | 1,
    },
    {
        id: 'sewerage',
        label: 'Водоотведения',
        value: 'Водоотведения',
        providingType: PROVIDING_TYPES.WATER_DISPOSAL as 0 | 1,
    },
]

const METER_OPTIONS = [
    { id: 'meter-water', label: 'Воды', value: 'Воды' },
    { id: 'meter-sewerage', label: 'Сточных вод', value: 'Сточных вод' },
]

export function FirstStepOfForm({
    services,
    updateCommon,
    selectedServiceId,
}: FirstStepOfFormProps) {
    // Объединённое состояние для всех типов чекбоксов
    const [selections, setSelections] = useState<Record<string, string[]>>({
        newConnection: [],
        adjacent: [],
        reconstruction: [],
        yard: [],
        networkRemoval: [],
        meter: [],
    })

    // Состояние для полей ввода
    const [tcNumber, setTcNumber] = useState('')
    const [tcDate, setTcDate] = useState('')
    const [reason, setReason] = useState('')
    const [diameter, setDiameter] = useState('')

    const selectedService = services.find(
        (s) => s.id === Number(selectedServiceId),
    )

    // Универсальный обработчик переключения чекбокса
    const handleToggle = useCallback(
        (
            category: string,
            value: string,
            providingType?: 0 | 1,
        ) => {
            setSelections((prev) => {
                const current = prev[category] || []
                const updated = current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value]
                return { ...prev, [category]: updated }
            })

            if (providingType !== undefined) {
                updateCommon('providingType', providingType)
            }
        },
        [updateCommon],
    )

    // Обработчик изменения диаметра
    const handleDiameterChange = useCallback(
        (value: string) => {
            setDiameter(value)
            updateCommon('objectiveInfo.dm', +value)
        },
        [updateCommon],
    )

    // Обработчик изменения номера ТУ
    const handleTcNumberChange = useCallback(
        (value: string) => {
            setTcNumber(value)
            updateCommon('objectiveInfo.tcNumber', value)
        },
        [updateCommon],
    )

    // Обработчик изменения даты ТУ
    const handleTcDateChange = useCallback(
        (value: string) => {
            setTcDate(value)
            updateCommon('objectiveInfo.tcDate', value)
        },
        [updateCommon],
    )

    if (!selectedService) return null

    const serviceName = selectedService.name

    return (
        <div className="mt-10 w-64 sm:w-80 lg:w-96 xl:w-110 pb-10">
            {/* Новое подключение */}
            {serviceName === SERVICE_TITLES.NEW_CONNECTION && (
                <Field className="mt-5 w-full border-b-0">
                    <FieldLabel>Новое подключение</FieldLabel>
                    <ServiceCheckboxGroup
                        title="Тип подключения"
                        options={NEW_CONNECTION_OPTIONS}
                        selectedValues={selections.newConnection}
                        onToggle={(value, type) =>
                            handleToggle('newConnection', value, type)
                        }
                        className="mt-2"
                    />
                </Field>
            )}

            {/* Подключение к сетям смежного владельца */}
            {serviceName === SERVICE_TITLES.ADJACENT_OWNER && (
                <Field className="mt-5 w-64">
                    <FieldLabel>Подключение к сетям смежного владельца</FieldLabel>
                    <ServiceCheckboxGroup
                        title="Тип подключения"
                        options={WATER_OPTIONS.map((o) => ({
                            ...o,
                            id: `adjacent-${o.id}`,
                        }))}
                        selectedValues={selections.adjacent}
                        onToggle={(value, type) =>
                            handleToggle('adjacent', value, type)
                        }
                        className="mt-2"
                    />
                </Field>
            )}

            {/* Реконструкция существующих сетей */}
            {serviceName === SERVICE_TITLES.RECONSTRUCTION && (
                <Field className="mt-5 w-full">
                    <FieldLabel>
                        Реконструкция существующих сетей без изменения
                        потребляемой нагрузки
                    </FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <ServiceCheckboxGroup
                            title="Тип сетей"
                            options={WATER_OPTIONS.map((o) => ({
                                ...o,
                                id: `recon-${o.id}`,
                            }))}
                            selectedValues={selections.reconstruction}
                            onToggle={(value) =>
                                handleToggle('reconstruction', value)
                            }
                        />

                        {selections.reconstruction.length > 0 && (
                            <InputWithTooltip
                                placeholder={`Укажите диаметр ${selections.reconstruction[0].toLowerCase()} (мм)`}
                                tooltip="Диаметр существующих сетей в миллиметрах"
                                type="number"
                                value={diameter}
                                onChange={handleDiameterChange}
                            />
                        )}
                    </div>
                </Field>
            )}

            {/* Подключение к внутридворовым сетям */}
            {serviceName === SERVICE_TITLES.YARD_NETWORKS && (
                <Field className="mt-5 w-64">
                    <FieldLabel>
                        Подключение к внутридворовым (внутриплощадочным) сетям
                    </FieldLabel>
                    <ServiceCheckboxGroup
                        title="Тип подключения"
                        options={WATER_OPTIONS.map((o) => ({
                            ...o,
                            id: `yard-${o.id}`,
                        }))}
                        selectedValues={selections.yard}
                        onToggle={(value, type) =>
                            handleToggle('yard', value, type)
                        }
                        className="mt-2"
                    />
                </Field>
            )}

            {/* Корректировка технических условий */}
            {serviceName === SERVICE_TITLES.CORRECTION && (
                <div className="mt-5 w-full">
                    <FieldLabel className="mb-3">
                        Корректировка технических условий
                    </FieldLabel>
                    <InputWithTooltip
                        placeholder="Введите номер ТУ"
                        tooltip="Номер технических условий для корректировки"
                        type="number"
                        value={tcNumber}
                        onChange={handleTcNumberChange}
                    />
                    <InputWithTooltip
                        placeholder="Дата выдачи ТУ"
                        tooltip="Дата выдачи технических условий"
                        type="date"
                        value={tcDate}
                        onChange={handleTcDateChange}
                    />
                    <TextareaField
                        placeholder="В части (укажите что нужно скорректировать)"
                        value={reason}
                        onChange={setReason}
                    />
                </div>
            )}

            {/* Аннулирование технических условий */}
            {serviceName === SERVICE_TITLES.ANNULMENT && (
                <div className="mt-5 w-full">
                    <FieldLabel className="mb-3">
                        Аннулирование технических условий
                    </FieldLabel>
                    <InputWithTooltip
                        placeholder="Введите номер ТУ"
                        tooltip="Номер технических условий для аннулирования"
                        type="number"
                        value={tcNumber}
                        onChange={handleTcNumberChange}
                    />
                    <InputWithTooltip
                        placeholder="Дата выдачи ТУ"
                        tooltip="Дата выдачи технических условий"
                        type="date"
                        value={tcDate}
                        onChange={handleTcDateChange}
                    />
                    <TextareaField
                        placeholder="Укажите причину аннулирования"
                        value={reason}
                        onChange={setReason}
                    />
                </div>
            )}

            {/* Вынос сетей */}
            {serviceName === SERVICE_TITLES.NETWORK_REMOVAL && (
                <Field className="mt-5 w-full">
                    <FieldLabel>Вынос сетей</FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <ServiceCheckboxGroup
                            title="Тип сетей"
                            options={WATER_OPTIONS.map((o) => ({
                                ...o,
                                id: `removal-${o.id}`,
                            }))}
                            selectedValues={selections.networkRemoval}
                            onToggle={(value, type) =>
                                handleToggle('networkRemoval', value, type)
                            }
                        />

                        {selections.networkRemoval.length > 0 && (
                            <InputWithTooltip
                                placeholder={`Укажите диаметр ${selections.networkRemoval[0].toLowerCase()} (мм)`}
                                tooltip="Диаметр выносимых сетей в миллиметрах"
                                type="number"
                                value={diameter}
                                onChange={handleDiameterChange}
                            />
                        )}
                    </div>
                </Field>
            )}

            {/* Установка прибора учета */}
            {serviceName === SERVICE_TITLES.METER_INSTALLATION && (
                <Field className="mt-5 w-64">
                    <FieldLabel>На установку прибора учета</FieldLabel>
                    <ServiceCheckboxGroup
                        title="Тип прибора"
                        options={METER_OPTIONS}
                        selectedValues={selections.meter}
                        onToggle={(value) => handleToggle('meter', value)}
                        className="mt-2"
                    />
                </Field>
            )}

            {/* Иное */}
            {serviceName === SERVICE_TITLES.OTHER && <DialogForm />}
        </div>
    )
}

export default FirstStepOfForm

