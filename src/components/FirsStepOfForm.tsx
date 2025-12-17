import { useState } from 'react'
import { Field, FieldLabel } from './ui/field'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupTextarea,
} from './ui/input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { InfoIcon } from 'lucide-react'
import { ServiceT } from '@/App'
import DialogForm from './DialogForm'

interface FirsStepOfFormProps {
    service: ServiceT[] | undefined
    updateCommon: (path: string, value: unknown) => void
    selectedServiceId: string
}

const FirsStepOfForm = ({
    service,
    updateCommon,
    selectedServiceId,
}: FirsStepOfFormProps) => {
    const [, setIsSelectedTypeSupply] = useState(false)

    // Замороженный объект для проверки данных с API
    const titleServices = Object.freeze({
        'Новое подключение': `Новое подключение`,
        'Подключение к сетям смежного владельца':
            'Подключение к сетям смежного владельца',
        'Реконструкцию существующих сетей без изменения потребляемой нагрузки':
            'Реконструкцию существующих сетей без изменения потребляемой нагрузки',
        'Подключение к внутридворовым (внутриплощадочным) сетям':
            'Подключение к внутридворовым (внутриплощадочным) сетям',
        'Корректировку технических условий':
            'Корректировку технических условий',
        'Аннулирование технических условий':
            'Аннулирование технических условий',
        'Вынос сетей': 'Вынос сетей',
        'На установку прибора учета': 'На установку прибора учета',
        Иное: 'Иное',
    })

    // Состояния для чекбоксов
    const [selectedNewConnectionTypes, setSelectedNewConnectionTypes] =
        useState<string[]>([])
    const [selectedAdjacentTypes, setSelectedAdjacentTypes] = useState<
        string[]
    >([])

    // Хуки для контроля блоков "вынос сетей" и "реконструкцию существующих сетей без изменения потребляемой нагрузки"
    const [
        selectedWaterDisposalOfRecommendation,
        setSelectedWaterDisposalOfRecommendation,
    ] = useState<string[]>([])
    const [
        selectedWaterSupplyOfRecommendation,
        setSelectedWaterSupplyOfRecommendation,
    ] = useState<string[]>([])
    const [
        selectedWaterDisposaOfLinference,
        setSelectedWaterDisposaOfLinference,
    ] = useState<string[]>([])
    const [
        selectedWaterSupplyOfLinference,
        setSelectedWaterSupplyOfLinference,
    ] = useState<string[]>([])

    const [selectedYardTypes, setSelectedYardTypes] = useState<string[]>([])
    const [selectedMeterTypes, setSelectedMeterTypes] = useState<string[]>([])

    const selectedService = service?.find(
        (item) => item.id === Number(selectedServiceId),
    )

    // Функция для переключения чекбокса
    const handleCheckboxToggle = (
        value: string,
        setState: React.Dispatch<React.SetStateAction<string[]>>,
    ) => {
        setState((prev) =>
            prev.includes(value)
                ? prev.filter((v) => v !== value)
                : [...prev, value],
        )
    }

    return (
        <div className="mt-10 w-64 sm:w-80 lg:w-96 xl:w-110 pb-10">
            {selectedService?.name === titleServices[`Новое подключение`] && (
                <Field className="mt-5 w-[100%] border-b-0">
                    <FieldLabel>Новое подключение</FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-3">
                            <Label
                                className="w-[100%] hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="cold-water"
                            >
                                <Checkbox
                                    id="cold-water"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedNewConnectionTypes.includes(
                                        'К сетям холодного водоснабжения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'К сетям холодного водоснабжения',
                                            setSelectedNewConnectionTypes,
                                        )
                                        updateCommon('providingType', 0)
                                    }}
                                />
                                К сетям холодного водоснабжения
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Label
                                className="w-[100%] hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="sewerage"
                            >
                                <Checkbox
                                    id="sewerage"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedNewConnectionTypes.includes(
                                        'Водоотведения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоотведения',
                                            setSelectedNewConnectionTypes,
                                        )
                                        updateCommon('providingType', 1)
                                    }}
                                />
                                Водоотведения
                            </Label>
                        </div>
                    </div>
                </Field>
            )}

            {selectedService?.name ===
                titleServices[`Подключение к сетям смежного владельца`] && (
                <Field className="mt-5 w-64">
                    <FieldLabel>
                        Подключение к сетям смежного владельца
                    </FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="adjacent-wate"
                            >
                                <Checkbox
                                    id="adjacent-water"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedAdjacentTypes.includes(
                                        'Водоснабжения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоснабжения',
                                            setSelectedAdjacentTypes,
                                        )
                                        updateCommon('providingType', 0)
                                    }}
                                />
                                Водоснабжения
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="adjacent-sewerage"
                            >
                                <Checkbox
                                    id="adjacent-sewerage"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedAdjacentTypes.includes(
                                        'Водоотведения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоотведения',
                                            setSelectedAdjacentTypes,
                                        )
                                        updateCommon('providingType', 1)
                                    }}
                                />
                                Водоотведения
                            </Label>
                        </div>
                    </div>
                </Field>
            )}

            {selectedService?.name ===
                titleServices[
                    `Реконструкцию существующих сетей без изменения потребляемой нагрузки`
                ] && (
                <Field className="mt-5 w-[100%]">
                    <FieldLabel>
                        Реконструкцию существующих сетей без изменения
                        потребляемой нагрузки
                    </FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="reconstruction-water"
                            >
                                <Checkbox
                                    id="reconstruction-water"
                                    checked={selectedWaterDisposalOfRecommendation.includes(
                                        'Водоснабжения',
                                    )}
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоснабжения',
                                            setSelectedWaterDisposalOfRecommendation,
                                        )
                                        setIsSelectedTypeSupply(true)
                                    }}
                                />
                                Водоснабжения
                            </Label>
                        </div>

                        {selectedWaterDisposalOfRecommendation.length > 0 && (
                            <InputGroup className="mt-2">
                                <InputGroupInput
                                    onChange={(e) => {
                                        updateCommon(
                                            'objectiveInfo.dm',
                                            +e.target.value,
                                        )
                                    }}
                                    placeholder="Укажите диаметр водоснабжения"
                                    type="text"
                                />
                                <InputGroupAddon align="inline-end">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <InputGroupButton
                                                variant="ghost"
                                                aria-label="Info"
                                                size="icon-xs"
                                            >
                                                <InfoIcon />
                                            </InputGroupButton>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Область подсказки</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                            </InputGroup>
                        )}

                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="reconstruction-sewerage"
                            >
                                <Checkbox
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    id="reconstruction-sewerage"
                                    checked={selectedWaterSupplyOfRecommendation.includes(
                                        'Водоотведения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоотведения',
                                            setSelectedWaterSupplyOfRecommendation,
                                        )
                                        setIsSelectedTypeSupply(true)
                                    }}
                                />
                                Водоотведения
                            </Label>
                        </div>
                    </div>

                    {selectedWaterSupplyOfRecommendation.length > 0 && (
                        <InputGroup className="mt-2">
                            <InputGroupInput
                                itemType="number"
                                onChange={(e) => {
                                    updateCommon(
                                        'objectiveInfo.dm',
                                        e.target.value,
                                    )
                                }}
                                placeholder="Укажите диаметр водоотведения"
                                type="text"
                            />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            aria-label="Info"
                                            size="icon-xs"
                                        >
                                            <InfoIcon />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Область подсказки</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    )}
                </Field>
            )}

            {selectedService?.name ===
                titleServices[
                    `Подключение к внутридворовым (внутриплощадочным) сетям`
                ] && (
                <Field className="mt-5 w-64">
                    <FieldLabel>
                        Подключение к внутридворовым (внутриплощадочным) сетям
                    </FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="yard-water"
                            >
                                <Checkbox
                                    id="yard-water"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedYardTypes.includes(
                                        'Водоснабжения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоснабжения',
                                            setSelectedYardTypes,
                                        )
                                        updateCommon('providingType', 0)
                                    }}
                                />
                                Водоснабжения
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="yard-sewerage"
                            >
                                <Checkbox
                                    id="yard-sewerage"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedYardTypes.includes(
                                        'Водоотведения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоотведения',
                                            setSelectedYardTypes,
                                        )
                                        updateCommon('providingType', 1)
                                    }}
                                />
                                Водоотведения
                            </Label>
                        </div>
                    </div>
                </Field>
            )}

            {selectedService?.name ===
                titleServices[`Корректировку технических условий`] && (
                <div className="mt-5 w-[100%]">
                    <div>
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Введите номер ТУ"
                                type="number"
                            />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            aria-label="Info"
                                            size="icon-xs"
                                        >
                                            <InfoIcon />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Вспомогательная информация</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="mt-2.5">
                        <InputGroup>
                            <InputGroupInput type="date" />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            aria-label="Info"
                                            size="icon-xs"
                                        >
                                            <InfoIcon />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Вспомогательная информация</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="mt-2.5">
                        <InputGroup>
                            <InputGroupTextarea placeholder="В части" />
                        </InputGroup>
                    </div>
                </div>
            )}

            {selectedService?.name ===
                titleServices[`Аннулирование технических условий`] && (
                <div className="mt-5 w-[100%]">
                    <div>
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Введите номер ТУ"
                                type="number"
                            />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            aria-label="Info"
                                            size="icon-xs"
                                        >
                                            <InfoIcon />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Вспомогательная информация</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="mt-2.5">
                        <InputGroup>
                            <InputGroupInput type="date" />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            aria-label="Info"
                                            size="icon-xs"
                                        >
                                            <InfoIcon />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Вспомогательная информация</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    </div>
                    <div className="mt-2.5">
                        <InputGroup className="w-[100%]">
                            <InputGroupTextarea placeholder="Укажите причину" />
                        </InputGroup>
                    </div>
                </div>
            )}

            {selectedService?.name === titleServices[`Вынос сетей`] && (
                <Field className="mt-5 w-[100%]">
                    <FieldLabel>Вынос сетей</FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="reconstruction-water"
                            >
                                <Checkbox
                                    id="reconstruction-water"
                                    checked={selectedWaterDisposaOfLinference.includes(
                                        'Водоснабжения',
                                    )}
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоснабжения',
                                            setSelectedWaterDisposaOfLinference,
                                        )
                                        setIsSelectedTypeSupply(true)
                                        updateCommon('providingType', 0)
                                    }}
                                />
                                Водоснабжения
                            </Label>
                        </div>

                        {selectedWaterDisposaOfLinference.length > 0 && (
                            <InputGroup className="mt-2">
                                <InputGroupInput
                                    placeholder="Укажите диаметр водоснабжения"
                                    type="text"
                                />
                                <InputGroupAddon align="inline-end">
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <InputGroupButton
                                                variant="ghost"
                                                aria-label="Info"
                                                size="icon-xs"
                                            >
                                                <InfoIcon />
                                            </InputGroupButton>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Область подсказки</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                            </InputGroup>
                        )}

                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="reconstruction-sewerage"
                            >
                                <Checkbox
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    id="reconstruction-sewerage"
                                    checked={selectedWaterSupplyOfLinference.includes(
                                        'Водоотведения',
                                    )}
                                    onCheckedChange={() => {
                                        handleCheckboxToggle(
                                            'Водоотведения',
                                            setSelectedWaterSupplyOfLinference,
                                        )
                                        setIsSelectedTypeSupply(true)
                                        updateCommon('providingType', 1)
                                    }}
                                />
                                Водоотведения
                            </Label>
                        </div>
                    </div>

                    {selectedWaterSupplyOfLinference.length > 0 && (
                        <InputGroup className="mt-2">
                            <InputGroupInput
                                placeholder="Укажите диаметр водоотведения"
                                type="text"
                            />
                            <InputGroupAddon align="inline-end">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton
                                            variant="ghost"
                                            aria-label="Info"
                                            size="icon-xs"
                                        >
                                            <InfoIcon />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Область подсказки</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                        </InputGroup>
                    )}
                </Field>
            )}

            {selectedService?.name ===
                titleServices[`На установку прибора учета`] && (
                <Field className="mt-5 w-64">
                    <FieldLabel>На установку прибора учета</FieldLabel>
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex items-center gap-3">
                            <Label
                                className="w-35 hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="meter-water"
                            >
                                <Checkbox
                                    id="meter-water"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedMeterTypes.includes(
                                        'Воды',
                                    )}
                                    onCheckedChange={() =>
                                        handleCheckboxToggle(
                                            'Воды',
                                            setSelectedMeterTypes,
                                        )
                                    }
                                />
                                Воды
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Label
                                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
                                htmlFor="meter-sewerage"
                            >
                                <Checkbox
                                    id="meter-sewerage"
                                    className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                                    checked={selectedMeterTypes.includes(
                                        'Сточных вод',
                                    )}
                                    onCheckedChange={() =>
                                        handleCheckboxToggle(
                                            'Сточных вод',
                                            setSelectedMeterTypes,
                                        )
                                    }
                                />
                                Сточных вод
                            </Label>
                        </div>
                    </div>
                </Field>
            )}

            {selectedService?.name === titleServices[`Иное`] && <DialogForm />}
        </div>
    )
}

export default FirsStepOfForm
