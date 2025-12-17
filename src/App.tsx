import { useEffect, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Field, FieldDescription, FieldLabel } from './components/ui/field'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import FirsStepOfForm from './components/FirsStepOfForm'
import TwoStepOfAccordion from './components/TwoStepOfAccordion'
import ForeStepOfInfoObj from './components/ForeStepOfInfoObj'
import DocumentsUploadForm from './components/DocumentsUploadForm'
import ThreeStepOfGroupButton from './components/ThreeStepOfGroupButton'

export interface ServiceT {
    id: number
    name: string
    applyingFor: 0 | 1
}

export interface AccordionT {
    id: number
    name: string
    applyingFor: 0 | 1
}

function cleanCommonObject(obj: any): any {
    if (obj === null || obj === undefined) {
        return obj
    }

    if (typeof obj === 'string') {
        return obj === '' ? null : obj
    }

    if (Array.isArray(obj)) {
        return obj.map((item) => cleanCommonObject(item))
    }

    if (typeof obj === 'object') {
        const result: any = {}
        const clientObjectKeys = [
            'individualClient',
            'legalClient',
            'legalClientIP',
            'legalClientGov',
        ]

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const cleanedValue = cleanCommonObject(obj[key])

                if (clientObjectKeys.includes(key) && cleanedValue !== null) {
                    if (isObjectEmpty(cleanedValue)) {
                        result[key] = null
                    } else {
                        result[key] = cleanedValue
                    }
                } else {
                    result[key] = cleanedValue
                }
            }
        }

        if (result.legalClient === null) {
            result.objectiveInfo.coOwnerLegal = null
        }

        if (result.individualClient === null) {
            result.objectiveInfo.coOwnerIndividual = null
        }

        return result
    }

    return obj
}

function isObjectEmpty(obj: any): boolean {
    if (obj === null || obj === undefined) {
        return true
    }

    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return false
    }

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]
            // Если есть хоть что-то не null/undefined/пустая строка
            if (value !== null && value !== undefined && value !== '') {
                // Если это объект, проверяем, не пуст ли он
                if (typeof value === 'object' && !Array.isArray(value)) {
                    if (!isObjectEmpty(value)) {
                        return false
                    }
                } else {
                    return false
                }
            }
        }
    }

    return true
}

const initialCommon = {
    providingId: 0,
    providingType: 0,
    requestReasonId: 0,
    individualClient: {
        fullName: {
            firstName: '',
            lastName: '',
            middleName: '',
        },
        birthday: '',
        passportSerial: '',
        pasportNumber: '',
        pasportIssueDate: '',
        issuedBy: '',
        inn: '',
        snils: '',
        address: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    legalClient: {
        nameFull: '',
        nameShort: '',
        ogrn: '',
        inn: '',
        factAddress: '',
        legalAddress: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    legalClientIP: {
        fullName: {
            firstName: '',
            lastName: '',
            middleName: '',
        },
        ogrn: '',
        inn: '',
        factAddress: '',
        legalAddress: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    legalClientGov: {
        nameFull: '',
        nameShort: '',
        actingBasis: '',
        location: '',
        postalAddress: '',
        phoneNumber: '',
        email: '',
        trustee: {
            trustNumber: '',
            trusteeName: '',
            trustDateFrom: '',
            trustDateTo: '',
        },
    },
    objectiveInfo: {
        number: '',
        date: '',
        name: '',
        address: '',
        cadastralNumber: '',
        area: 0,
        coOwnerIndividual: {
            address: '',
            fullName: {
                firstName: '',
                lastName: '',
                middleName: '',
            },
            cadastralNumber: '',
            objectiveAddress: '',
        },
        coOwnerLegal: {
            name: '',
            inn: '',
            cadastralNumber: '',
            objectiveAddress: '',
        },
        floors: 0,
        height: 0,
        flats: 0,
        settlers: 0,
        commissionPlanedOn: '',
        dm: 0,
        supplyVolumePerDay: 0,
        supplyVolumePerHour: 0,
        supplyVolumePerSecond: 0,
        supplyVolumeInnerFirefightingPerSecond: 0,
        supplyVolumeAutoFirefightingPerSecond: 0,
        supplyVolumeOuterFirefightingPerSecond: 0,
        disposalVolumePerDay: 0,
        disposalVolumePerHour: 0,
        disposalVolumePerSecond: 0,
        hasWaterSupply: false,
        hasWaterDisposal: false,
        exploitationKind: '',
        measuringDeviceLocation: '',
        tcNumber: '',
        tcDate: new Date().toISOString(),
    },
}

function App() {
    const [common, setCommon] = useState(initialCommon)
    const [isQuestionnaireState, setIsQuestionnaireState] = useState(false)
    const [selectedServiceId, setSelectedServiceId] = useState<string>('')
    const [isSelectedTwoStep, setIsSelectedTwoStep] = useState(false)
    const [isSelectedThreeStep, setIsSelectedThreeStep] = useState(false)
    const [isSelectedForeStep, setIsSelectedForeStep] = useState(false)

    const [isReadyApplication, setIsReadyApplication] = useState(false)

    const [tabsState, setTabsState] = useState('')
    //количество заполненный инпутов
    const [, setQuantityFilledUpInputs] = useState(0)

    const [service, setService] = useState<ServiceT[]>([])
    const [accordion, setAccordion] = useState<AccordionT[]>([])

    const [dt, setDT] = useState(false)
    const [tu, setTU] = useState(false)

    const updateCommon = (path: string, value: unknown) => {
        setCommon((prev) => {
            const keys = path.split('.')
            const newCommon = JSON.parse(JSON.stringify(prev))
            let current = newCommon

            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]]
            }
            current[keys[keys.length - 1]] = value
            return newCommon
        })
    }

    useEffect(() => {
        const get = async () => {
            try {
                const responseService = await axios.get(
                    'http://172.201.236.227:82/api/Providing/get-providings',
                )
                const responseAccordion = await axios.get(
                    'http://172.201.236.227:82/api/RequestReason/get-request-reasons',
                )

                setAccordion(responseAccordion.data)
                setService(responseService.data)
            } catch (error) {
                console.error('Ошибка загрузки услуг:', error)
            }
        }

        get()
    }, [])

    if (service.length === 0 || accordion.length === 0) {
        return <div className="p-4">Загрузка...</div>
    }

    return (
        <div>
            {/* Группа кнопок для обработки появления условий форм */}
            {!isQuestionnaireState ? (
                <div>
                    <Button
                        className="w-full sm:w-auto lg:w-80 xl:w-90 mt-1"
                        onClick={() => {
                            setIsQuestionnaireState(true)
                            setTU(true)
                        }}
                        size="lg"
                    >
                        Подать заявку ТУ
                    </Button>
                    <Button
                        className="w-full sm:w-auto lg:w-80 xl:w-90 mt-1"
                        onClick={() => {
                            setIsQuestionnaireState(true)
                            setDT(true)
                        }}
                        size="lg"
                    >
                        Подать заявку ДП
                    </Button>
                    <Button
                        className="w-full sm:w-auto lg:w-80 xl:w-90 mt-1"
                        onClick={() => {
                            setIsQuestionnaireState(true)
                            setIsSelectedForeStep(true)
                            setIsReadyApplication(true)
                            setTU(true)
                        }}
                        size="lg"
                    >
                        Заявка ТУ готова
                    </Button>
                    <Button
                        className="w-full sm:w-auto lg:w-80 xl:w-90 mt-1"
                        onClick={() => {
                            setIsQuestionnaireState(true)
                            setIsSelectedForeStep(true)
                            setIsReadyApplication(true)
                            setDT(true)
                        }}
                        size="lg"
                    >
                        Заявка ДТ готова
                    </Button>
                </div>
            ) : (
                <form className="min-h-screen max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
                    {/* Форма версии ДТ */}
                    {dt && (
                        <>
                            {!isReadyApplication && (
                                <div className="grid">
                                    <Button
                                        className="w-16 sm:w-22 lg:w-25 xl:w-30"
                                        onClick={() => {
                                            setIsQuestionnaireState(false)
                                            setCommon(initialCommon)
                                            setSelectedServiceId('')
                                            setIsSelectedTwoStep(false)
                                            setIsSelectedThreeStep(false)
                                            setIsSelectedForeStep(false)
                                            setDT(false)
                                        }}
                                    >
                                        Назад
                                    </Button>
                                    {/* Первый блок */}
                                    <Field className="mt-5 w-64 sm:w-80 lg:w-96 xl:w-110">
                                        <FieldLabel className="xl:text-lg">
                                            Услуги подключения
                                        </FieldLabel>
                                        <Select
                                            value={selectedServiceId}
                                            onValueChange={(value) => {
                                                setSelectedServiceId(value)
                                                updateCommon(
                                                    'providingId',
                                                    parseInt(value),
                                                )
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите услугу" />
                                            </SelectTrigger>
                                            <SelectContent className="w-64 sm:w-80 lg:w-96 xl:w-110">
                                                {service.map(({ name, id }) => (
                                                    <SelectItem
                                                        key={id}
                                                        value={`${id}`}
                                                    >
                                                        {name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription>
                                            Выберите необходимую вам услугу
                                        </FieldDescription>
                                    </Field>
                                </div>
                            )}
                            {/* Первый блок */}
                            {!!selectedServiceId && !isReadyApplication && (
                                <FirsStepOfForm
                                    service={service}
                                    updateCommon={updateCommon}
                                    selectedServiceId={selectedServiceId}
                                />
                            )}
                            {/* Второй блок */}
                            {!!selectedServiceId && !isReadyApplication && (
                                <TwoStepOfAccordion
                                    accordion={accordion}
                                    updateCommon={updateCommon}
                                    setIsSelectedTwoStep={setIsSelectedTwoStep}
                                />
                            )}
                            {/* Третий блок */}
                            {!!selectedServiceId && isSelectedTwoStep && (
                                <ThreeStepOfGroupButton
                                    setQuantityFilledUpInputs={
                                        setQuantityFilledUpInputs
                                    }
                                    setTabsState={setTabsState}
                                    updateCommon={updateCommon}
                                    setIsSelectedThreeStep={
                                        setIsSelectedThreeStep
                                    }
                                />
                            )}
                            {/* Четвёртый блок */}
                            {!!selectedServiceId && isSelectedThreeStep && (
                                <ForeStepOfInfoObj
                                    tabsState={tabsState}
                                    updateCommon={updateCommon}
                                    setIsSelectedForeStep={
                                        setIsSelectedForeStep
                                    }
                                />
                            )}
                            {/* Пятый блок с файлами */}
                            {(isReadyApplication || isSelectedForeStep) && (
                                <DocumentsUploadForm
                                    isReadyApplication={isReadyApplication}
                                    onSubmit={async () => {
                                        const cleanCommon = cleanCommonObject(
                                            JSON.parse(JSON.stringify(common)),
                                        )

                                        console.log(cleanCommon)
                                        try {
                                            const response = await axios.post(
                                                'http://172.201.236.227:82/api/Request/create-tc-request',
                                                cleanCommon,
                                            )
                                            console.log(
                                                'Успешно:',
                                                response.data,
                                            )
                                            alert(
                                                'Заявление успешно отправлено!',
                                            )

                                            // Сброс формы
                                            setCommon(initialCommon)
                                            setSelectedServiceId('')
                                            setIsSelectedTwoStep(false)
                                            setIsSelectedThreeStep(false)
                                            setIsSelectedForeStep(false)
                                        } catch (error: any) {
                                            console.error(
                                                'Детали ошибки:',
                                                error.response?.data,
                                            )
                                            const errorMessage =
                                                error.response?.data?.message ||
                                                error.response?.data
                                                    ?.errors?.[0] ||
                                                error.response?.statusText ||
                                                error.message

                                            alert(`Ошибка: ${errorMessage}`)
                                        }
                                    }}
                                />
                            )}
                        </>
                    )}

                    {/* Форма версии ТУ */}
                    {tu && (
                        <>
                            {!isReadyApplication && (
                                <div className="grid">
                                    <Button
                                        className="w-16 sm:w-22 lg:w-25 xl:w-30"
                                        onClick={() => {
                                            setIsQuestionnaireState(false)
                                            setCommon(initialCommon)
                                            setSelectedServiceId('')
                                            setIsSelectedTwoStep(false)
                                            setIsSelectedThreeStep(false)
                                            setIsSelectedForeStep(false)
                                            setTU(false)
                                        }}
                                    >
                                        Назад
                                    </Button>
                                    {/* Первый блок */}
                                    <Field className="mt-5 w-64 sm:w-80 lg:w-96 xl:w-110">
                                        <FieldLabel className="xl:text-lg">
                                            Услуги подключения
                                        </FieldLabel>
                                        <Select
                                            value={selectedServiceId}
                                            onValueChange={(value) => {
                                                setSelectedServiceId(value)
                                                updateCommon(
                                                    'providingId',
                                                    parseInt(value),
                                                )
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите услугу" />
                                            </SelectTrigger>
                                            <SelectContent className="w-64 sm:w-80 lg:w-96 xl:w-110">
                                                {service.map(({ name, id }) => (
                                                    <SelectItem
                                                        key={id}
                                                        value={`${id}`}
                                                    >
                                                        {name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FieldDescription>
                                            Выберите необходимую вам услугу
                                        </FieldDescription>
                                    </Field>
                                </div>
                            )}

                            {/* Первый блок */}
                            {!!selectedServiceId && (
                                <FirsStepOfForm
                                    service={service}
                                    updateCommon={updateCommon}
                                    selectedServiceId={selectedServiceId}
                                />
                            )}

                            {/* Второй блок */}
                            {!!selectedServiceId && (
                                <TwoStepOfAccordion
                                    accordion={accordion}
                                    updateCommon={updateCommon}
                                    setIsSelectedTwoStep={setIsSelectedTwoStep}
                                />
                            )}

                            {/* Третий блок */}
                            {!!selectedServiceId && isSelectedTwoStep && (
                                <ThreeStepOfGroupButton
                                    setQuantityFilledUpInputs={
                                        setQuantityFilledUpInputs
                                    }
                                    setTabsState={setTabsState}
                                    updateCommon={updateCommon}
                                    setIsSelectedThreeStep={
                                        setIsSelectedThreeStep
                                    }
                                />
                            )}

                            {/* Четвёртый блок */}
                            {!!selectedServiceId && isSelectedThreeStep && (
                                <ForeStepOfInfoObj
                                    tabsState={tabsState}
                                    updateCommon={updateCommon}
                                    setIsSelectedForeStep={
                                        setIsSelectedForeStep
                                    }
                                />
                            )}

                            {/* Пятый блок с файлами */}
                            {(isReadyApplication || isSelectedForeStep) && (
                                <DocumentsUploadForm
                                    isReadyApplication={isReadyApplication}
                                    onSubmit={async () => {
                                        const cleanCommon = cleanCommonObject(
                                            JSON.parse(JSON.stringify(common)),
                                        )

                                        console.log(cleanCommon)
                                        try {
                                            const response = await axios.post(
                                                'http://172.201.236.227:82/api/Request/create-tc-request',
                                                cleanCommon,
                                            )
                                            console.log(
                                                'Успешно:',
                                                response.data,
                                            )
                                            alert(
                                                'Заявление успешно отправлено!',
                                            )

                                            // Сброс формы
                                            setCommon(initialCommon)
                                            setSelectedServiceId('')
                                            setIsSelectedTwoStep(false)
                                            setIsSelectedThreeStep(false)
                                            setIsSelectedForeStep(false)
                                        } catch (error: any) {
                                            console.error(
                                                'Детали ошибки:',
                                                error.response?.data,
                                            )
                                            const errorMessage =
                                                error.response?.data?.message ||
                                                error.response?.data
                                                    ?.errors?.[0] ||
                                                error.response?.statusText ||
                                                error.message

                                            alert(`Ошибка: ${errorMessage}`)
                                        }
                                    }}
                                />
                            )}
                        </>
                    )}

                    {/* Debug */}
                    {/* {process.env.NODE_ENV === 'development' && (
                            <details className="mt-8 p-4 border rounded bg-gray-100">
                                <summary>Debug: common object</summary>
                                <pre className="text-xs overflow-auto">
                                    {JSON.stringify(common, null, 2)}
                                </pre>
                            </details>
                        )} */}
                </form>
            )}
        </div>
    )
}

export default App
