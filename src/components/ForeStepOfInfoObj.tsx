import { Input } from './ui/input'
import { Field, FieldLabel, FieldDescription } from './ui/field'
import { Checkbox } from './ui/checkbox'
import { Dispatch, SetStateAction, useState } from 'react'

interface ObjectInfoFormProps {
    tabsState: string
    updateCommon: (path: string, value: unknown) => void
    setIsSelectedForeStep: Dispatch<SetStateAction<boolean>>
    showTechConditionsFields?: boolean // подп. 7 или 8 пункта 2
    showAdjacentOwnerFields?: boolean // подп. 5 пункта 2
    requireWaterSupplyFields?: boolean // подп. 3 или подп. 10 пункта 2
    requireFireWaterSupplyFields?: boolean // подп. 2 пункта 2
}

const tabsNames = {
    fiz: 'Физ. лица',
    ur: 'Юр. лица',
    indPR: 'Индивидуальный предпр.',
    gos: 'Орган гос. власти и само упр.',
}

const ForeStepOfInfoObj = ({
    tabsState,
    updateCommon,
    setIsSelectedForeStep,
    // showTechConditionsFields,
    // showAdjacentOwnerFields,
    // requireWaterSupplyFields,
    requireFireWaterSupplyFields,
}: ObjectInfoFormProps) => {
    // Хук для подтверждения водоснабжения
    const [isSupply, setIsSupply] = useState(false)
    // Хук для подтверждения водоотведения
    const [isWaterDisposal, setIsWaterDisposal] = useState(false)

    return (
        <div className="space-y-3 mt-20 w-64 pb-10 border-b sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg font-semibold text-center">
                Информация о подключаемом объекте
            </h2>
            {/* Тех. условия */}
            {
                /*showTechConditionsFields */ <Field>
                    <FieldLabel className="mt-3">
                        Технические условия №
                        <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.number', e.target.value)
                        }}
                        placeholder="№ документа"
                        required
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon('objectiveInfo.date', e.target.value)
                        }}
                        placeholder="от {дата} г."
                        type="date"
                        required
                    />
                </Field>
            }

            <Field>
                <Input
                    type="text"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.name', e.target.value)
                        setIsSelectedForeStep(true)
                    }}
                    placeholder="Наименование объекта"
                />
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.address', e.target.value)
                    }}
                    placeholder="Адрес подключаемого объекта"
                />
                <Input
                    type="number"
                    onChange={(e) => {
                        updateCommon(
                            'objectiveInfo.cadastralNumber',
                            e.target.value,
                        )
                    }}
                    placeholder="Кадастровый номер"
                />
                <Input
                    type="number"
                    onChange={(e) => {
                        updateCommon('objectiveInfo.area', +e.target.value)
                    }}
                    placeholder="Площадь земельного участка (м²)"
                />
            </Field>

            {/* Смежный владелец — подп. 5 п.2 */}
            {tabsState === tabsNames.ur && (
                /*showAdjacentOwnerFields */ <>
                    <Field>
                        <FieldLabel className="mt-3">
                            Адрес смежного владельца (юр. лица)
                        </FieldLabel>
                        <Input
                            type="text"
                            onChange={(e) => {
                                updateCommon(
                                    'objectiveInfo.coOwnerLegal.address',
                                    e.target.value,
                                )
                            }}
                            placeholder="г. Казань, ул. Ленина, д. 1"
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="mt-3">
                            Наименование смежного владельца (ФИО/название с ИНН)
                        </FieldLabel>
                        <Input
                            type="text"
                            onChange={(e) => {
                                updateCommon(
                                    'objectiveInfo.coOwnerLegal.name',
                                    e.target.value,
                                )
                            }}
                            placeholder="Наименование"
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="mt-3">
                            Кадастровый номер, адрес участка и ИНН (смежного
                            владельца)
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

            {/* Смежный владелец физ.лица */}
            {tabsState === tabsNames.fiz && (
                /*showAdjacentOwnerFields */ <>
                    <Field>
                        <FieldLabel className="mt-3">
                            Адрес смежного владельца (физ. лица)
                        </FieldLabel>
                        <Input
                            type="text"
                            onChange={(e) => {
                                updateCommon(
                                    'objectiveInfo.coOwnerIndividual.address',
                                    e.target.value,
                                )
                            }}
                            placeholder="г. Казань, ул. Ленина, д. 1"
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="mt-3">
                            Наименование смежного владельца (ФИО/название)
                        </FieldLabel>
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
                            placeholder="Наименование"
                        />
                    </Field>
                    <Field>
                        <FieldLabel className="mt-3">
                            Кадастровый номер, адрес участка (смежного
                            владельца)
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

            <Field>
                <FieldLabel className="mt-3">Количество этажей</FieldLabel>
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.floors', +e.target.value)
                    }}
                    placeholder="Количество этажей"
                    type="number"
                    min={0}
                />
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.height', +e.target.value)
                    }}
                    placeholder="Высота объекта (м)"
                    type="number"
                    min={0}
                />
            </Field>

            <Field>
                <FieldLabel className="mt-3">
                    Количество квартир (для МКД)
                </FieldLabel>
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.flats', +e.target.value)
                    }}
                    placeholder="Количество квартир (для МКД)"
                    type="number"
                    min={0}
                />
            </Field>
            <Field>
                <FieldLabel className="mt-3">
                    Количество жителей (не меньше количества квартир)
                </FieldLabel>
                <Input
                    onChange={(e) => {
                        updateCommon('objectiveInfo.settlers', +e.target.value)
                    }}
                    placeholder="Количество"
                    type="number"
                    min={0}
                />
                <FieldDescription>
                    Поле обязательно для МКД, гостиниц
                </FieldDescription>
            </Field>
            <Field>
                <FieldLabel className="mt-3">
                    Планируемый срок ввода объекта в эксплуатацию
                </FieldLabel>
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

            {/* Водоснабжение (обязательно при подп. 3 и 10 п.2) */}
            {
                /*requireWaterSupplyFields */ <Field>
                    <FieldLabel className="mt-3">
                        Водоснабжение (м³/сутки, м³/час, л/с)
                    </FieldLabel>
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
                </Field>
            }

            {/* Пожаротушение (только если требуется) */}
            {requireFireWaterSupplyFields && (
                <Field>
                    <FieldLabel className="mt-3">
                        Водоснабжение на нужды пожаротушения (л/с)
                    </FieldLabel>
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumeInnerFirefightingPerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="внутреннего"
                        type="number"
                        min={0}
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumeAutoFirefightingPerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="автоматического"
                        type="number"
                        min={0}
                    />
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumeOuterFirefightingPerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="наружного"
                        type="number"
                        min={0}
                    />
                </Field>
            )}

            <Field>
                <FieldLabel className="mt-3">
                    Водоотведение (м³/сутки, м³/час, л/с)
                </FieldLabel>
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
            </Field>

            {/* Признаки подключения */}
            <Field>
                <FieldLabel className="mt-3">
                    Объект присоединен к сетям водоснабжения?
                </FieldLabel>
                <div className="flex gap-4">
                    <Checkbox
                        checked={isSupply}
                        onClick={() => {
                            updateCommon('objectiveInfo.hasWaterSupply', true)
                            setIsSupply(!isSupply)
                        }}
                        id="waterSupplyYes"
                    />
                    <label htmlFor="waterSupplyYes" className="mr-3">
                        Да
                    </label>
                    <Checkbox
                        checked={!isSupply}
                        onClick={() => {
                            updateCommon('objectiveInfo.hasWaterSupply', false)
                            setIsSupply(!isSupply)
                        }}
                        id="waterSupplyNo"
                    />
                    <label htmlFor="waterSupplyNo">Нет</label>
                </div>
            </Field>
            <Field>
                <FieldLabel className="mt-3">
                    Объект присоединен к сетям водоотведения?
                </FieldLabel>
                <div className="flex gap-4">
                    <Checkbox
                        checked={isWaterDisposal}
                        onClick={() => {
                            updateCommon('objectiveInfo.hasWaterDisposal', true)
                            setIsWaterDisposal(!isWaterDisposal)
                        }}
                        id="sewerYes"
                    />
                    <label htmlFor="sewerYes" className="mr-3">
                        Да
                    </label>
                    <Checkbox
                        checked={!isWaterDisposal}
                        onClick={() => {
                            updateCommon(
                                'objectiveInfo.hasWaterDisposal',
                                false,
                            )
                            setIsWaterDisposal(!isWaterDisposal)
                        }}
                        id="sewerNo"
                    />
                    <label htmlFor="sewerNo">Нет</label>
                </div>
            </Field>
        </div>
    )
}

export default ForeStepOfInfoObj
