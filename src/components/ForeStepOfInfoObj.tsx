/**
 * Шаг 4: Информация о подключаемом объекте
 * С условной обязательностью полей по выбранной услуге
 */

import { Dispatch, SetStateAction, useState } from 'react'
import { Input } from './ui/input'
import { Field, FieldLabel, FieldDescription } from './ui/field'
import { Checkbox } from './ui/checkbox'
import {
    getFieldConfig,
    isFieldRequired,
    isFieldVisible,
    SERVICE_TITLES,
} from '@/constants'
import type { UpdateFormFn } from '@/utils/form'

interface ObjectInfoFormProps {
    tabsState: string
    updateCommon: UpdateFormFn
    setIsSelectedForeStep: Dispatch<SetStateAction<boolean>>
    selectedServiceName?: string // Название выбранной услуги
}

const tabsNames = {
    fiz: 'Физ. лица',
    ur: 'Юр. лица',
    indPR: 'Индивидуальный предпр.',
    gos: 'Орган гос. власти и само упр.',
}

/**
 * Компонент метки с опциональной звёздочкой обязательности
 */
function RequiredLabel({
    children,
    required,
    className = '',
}: {
    children: React.ReactNode
    required?: boolean
    className?: string
}) {
    return (
        <FieldLabel className={`mt-3 ${className}`}>
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </FieldLabel>
    )
}

const ForeStepOfInfoObj = ({
    tabsState,
    updateCommon,
    setIsSelectedForeStep,
    selectedServiceName = '',
}: ObjectInfoFormProps) => {
    // Хук для подтверждения водоснабжения
    const [isSupply, setIsSupply] = useState(false)
    // Хук для подтверждения водоотведения
    const [isWaterDisposal, setIsWaterDisposal] = useState(false)

    // Получаем конфигурацию полей для выбранной услуги
    const fieldConfig = getFieldConfig(selectedServiceName)

    // Проверяем, нужно ли показывать поля смежного владельца
    const showAdjacentOwner = selectedServiceName === SERVICE_TITLES.ADJACENT_OWNER

    // Проверяем, нужно ли показывать поля пожаротушения
    const showFirefighting =
        selectedServiceName === SERVICE_TITLES.FIREFIGHTING ||
        selectedServiceName === SERVICE_TITLES.NEW_CONNECTION

    // Проверяем, нужно ли показывать поля ТУ
    const showTcFields =
        selectedServiceName === SERVICE_TITLES.CORRECTION ||
        selectedServiceName === SERVICE_TITLES.ANNULMENT

    return (
        <div className="space-y-3 mt-20 w-64 pb-10 border-b sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg font-semibold text-center">
                Информация о подключаемом объекте
            </h2>

            {/* Технические условия — только для корректировки/аннулирования */}
            {showTcFields && (
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
            )}

            {/* Основная информация об объекте */}
            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'name')}>
                    Наименование объекта
                </RequiredLabel>
                <Input
                    type="text"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.name', e.target.value)
                        setIsSelectedForeStep(true)
                    }}
                    placeholder="Наименование объекта"
                    required={isFieldRequired(selectedServiceName, 'name')}
                />
            </Field>

            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'address')}>
                    Адрес подключаемого объекта
                </RequiredLabel>
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.address', e.target.value)
                    }}
                    placeholder="г. Ростов-на-Дону, ул. ..."
                    required={isFieldRequired(selectedServiceName, 'address')}
                />
            </Field>

            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'cadastralNumber')}>
                    Кадастровый номер
                </RequiredLabel>
                <Input
                    type="text"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.cadastralNumber', e.target.value)
                    }}
                    placeholder="00:00:0000000:0000"
                    required={isFieldRequired(selectedServiceName, 'cadastralNumber')}
                />
            </Field>

            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'area')}>
                    Площадь земельного участка (м²)
                </RequiredLabel>
                <Input
                    type="number"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.area', +e.target.value)
                    }}
                    placeholder="Площадь земельного участка"
                    min={0}
                    required={isFieldRequired(selectedServiceName, 'area')}
                />
            </Field>

            {/* Смежный владелец — только для подпункта 5 */}
            {showAdjacentOwner && (
                <>
                    {/* Для юр. лиц */}
                    {tabsState === tabsNames.ur && (
                        <>
                            <Field>
                                <RequiredLabel required>
                                    Адрес смежного владельца
                                </RequiredLabel>
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
                                <FieldLabel className="mt-3">
                                    Данные смежного владельца
                                </FieldLabel>
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
                    )}

                    {/* Для физ. лиц */}
                    {tabsState === tabsNames.fiz && (
                        <>
                            <Field>
                                <RequiredLabel required>
                                    Адрес смежного владельца
                                </RequiredLabel>
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
                                <RequiredLabel required>
                                    ФИО смежного владельца
                                </RequiredLabel>
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
                    )}
                </>
            )}

            {/* Этажность и высота */}
            {isFieldVisible(selectedServiceName, 'floors') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'floors')}>
                        Количество этажей
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.floors', +e.target.value)
                        }}
                        placeholder="Количество этажей"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            {isFieldVisible(selectedServiceName, 'height') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'height')}>
                        Высота объекта (м)
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.height', +e.target.value)
                        }}
                        placeholder="Высота объекта"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            {/* Квартиры и жители */}
            {isFieldVisible(selectedServiceName, 'flats') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'flats')}>
                        Количество квартир (для МКД)
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.flats', +e.target.value)
                        }}
                        placeholder="Количество квартир"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            {isFieldVisible(selectedServiceName, 'settlers') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'settlers')}>
                        Количество жителей
                    </RequiredLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.settlers', +e.target.value)
                        }}
                        placeholder="Количество жителей"
                        type="number"
                        min={0}
                    />
                    <FieldDescription>
                        Обязательно для МКД, гостиниц
                    </FieldDescription>
                </Field>
            )}

            {/* Срок ввода в эксплуатацию */}
            {isFieldVisible(selectedServiceName, 'commissionDate') && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'commissionDate')}>
                        Планируемый срок ввода в эксплуатацию
                    </RequiredLabel>
                    <Input
                        type="date"
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.commissionPlanedOn',
                                e.target.value,
                            )
                        }}
                    />
                </Field>
            )}

            {/* Водоснабжение */}
            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'waterSupplyPerDay')}>
                    Водоснабжение
                </RequiredLabel>
                <div className="grid grid-cols-3 gap-2">
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumePerDay',
                                +e.target.value,
                            )
                        }}
                        placeholder="м³/сутки"
                        type="number"
                        min={0}
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumePerHour',
                                +e.target.value,
                            )
                        }}
                        placeholder="м³/час"
                        type="number"
                        min={0}
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumePerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="л/с"
                        type="number"
                        min={0}
                    />
                </div>
            </Field>

            {/* Пожаротушение */}
            {showFirefighting && (
                <Field>
                    <RequiredLabel required={isFieldRequired(selectedServiceName, 'firefightingInner')}>
                        Водоснабжение на нужды пожаротушения (л/с)
                    </RequiredLabel>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm w-28">Внутреннего:</span>
                            <Input
                                onChange={(e) => {
                                    updateCommon(
                                        'objectiveInfo.supplyVolumeInnerFirefightingPerSecond',
                                        +e.target.value,
                                    )
                                }}
                                placeholder="л/с"
                                type="number"
                                min={0}
                                className="flex-1"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm w-28">Автоматического:</span>
                            <Input
                                onChange={(e) => {
                                    updateCommon(
                                        'objectiveInfo.supplyVolumeAutoFirefightingPerSecond',
                                        +e.target.value,
                                    )
                                }}
                                placeholder="л/с"
                                type="number"
                                min={0}
                                className="flex-1"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm w-28">Наружного:</span>
                            <Input
                                onChange={(e) => {
                                    updateCommon(
                                        'objectiveInfo.supplyVolumeOuterFirefightingPerSecond',
                                        +e.target.value,
                                    )
                                }}
                                placeholder="л/с"
                                type="number"
                                min={0}
                                className="flex-1"
                            />
                        </div>
                    </div>
                    {selectedServiceName === SERVICE_TITLES.FIREFIGHTING && (
                        <FieldDescription className="text-orange-600">
                            Для услуги «Пожаротушение» все поля обязательны и не могут быть равны нулю
                        </FieldDescription>
                    )}
                </Field>
            )}

            {/* Водоотведение */}
            <Field>
                <RequiredLabel required={isFieldRequired(selectedServiceName, 'waterDisposalPerDay')}>
                    Водоотведение
                </RequiredLabel>
                <div className="grid grid-cols-3 gap-2">
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.disposalVolumePerDay',
                                +e.target.value,
                            )
                        }}
                        placeholder="м³/сутки"
                        type="number"
                        min={0}
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.disposalVolumePerHour',
                                +e.target.value,
                            )
                        }}
                        placeholder="м³/час"
                        type="number"
                        min={0}
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.disposalVolumePerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="л/с"
                        type="number"
                        min={0}
                    />
                </div>
            </Field>

            {/* Признаки подключения */}
            <Field>
                <FieldLabel className="mt-3">
                    Объект присоединен к сетям водоснабжения?
                </FieldLabel>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={isSupply}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterSupply', !isSupply)
                                setIsSupply(!isSupply)
                            }}
                            id="waterSupplyYes"
                        />
                        <label htmlFor="waterSupplyYes">Да</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={!isSupply}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterSupply', isSupply)
                                setIsSupply(!isSupply)
                            }}
                            id="waterSupplyNo"
                        />
                        <label htmlFor="waterSupplyNo">Нет</label>
                    </div>
                </div>
            </Field>

            <Field>
                <FieldLabel className="mt-3">
                    Объект присоединен к сетям водоотведения?
                </FieldLabel>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={isWaterDisposal}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterDisposal', !isWaterDisposal)
                                setIsWaterDisposal(!isWaterDisposal)
                            }}
                            id="sewerYes"
                        />
                        <label htmlFor="sewerYes">Да</label>
                    </div>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            checked={!isWaterDisposal}
                            onCheckedChange={() => {
                                updateCommon('objectiveInfo.hasWaterDisposal', isWaterDisposal)
                                setIsWaterDisposal(!isWaterDisposal)
                            }}
                            id="sewerNo"
                        />
                        <label htmlFor="sewerNo">Нет</label>
                    </div>
                </div>
            </Field>
        </div>
    )
}

export default ForeStepOfInfoObj
