/**
 * Главный компонент приложения
 * Портал приёма заявок АО «Ростовводоканал»
 */

import { useState, useCallback } from 'react'
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

// Компоненты шагов формы
import FirstStepOfForm from './components/FirstStepOfForm'
import TwoStepOfAccordion from './components/TwoStepOfAccordion'
import ThreeStepOfGroupButton from './components/ThreeStepOfGroupButton'
import ForeStepOfInfoObj from './components/ForeStepOfInfoObj'
import DocumentsUploadForm from './components/DocumentsUploadForm'

// Хуки и утилиты
import { useApiData } from '@/hooks/useApiData'
import { api } from '@/api'
import { initialFormData, cleanFormData, createUpdateFn } from '@/utils/form'
import type { RequestFormData, RequestType } from '@/types'

function App() {
    // Данные формы
    const [formData, setFormData] = useState(initialFormData)
    const updateCommon = useCallback(createUpdateFn(setFormData), [])

    // Данные API
    const { services, requestReasons, loading, error } = useApiData()

    // UI состояние
    const [requestType, setRequestType] = useState<RequestType | null>(null)
    const [selectedServiceId, setSelectedServiceId] = useState('')
    const [isReadyApplication, setIsReadyApplication] = useState(false)

    // Шаги формы
    const [showStep2, setShowStep2] = useState(false)
    const [showStep3, setShowStep3] = useState(false)
    const [showStep4, setShowStep4] = useState(false)
    const [tabsState, setTabsState] = useState('')

    /**
     * Начать заполнение формы
     */
    const startForm = (type: RequestType, ready = false) => {
        setRequestType(type)
        setIsReadyApplication(ready)
        if (ready) {
            setShowStep4(true)
        }
    }

    /**
     * Сброс формы
     */
    const resetForm = useCallback(() => {
        setFormData(initialFormData)
        setSelectedServiceId('')
        setShowStep2(false)
        setShowStep3(false)
        setShowStep4(false)
        setTabsState('')
        setRequestType(null)
        setIsReadyApplication(false)
    }, [])

    /**
     * Обработка выбора услуги
     */
    const handleServiceSelect = (value: string) => {
        setSelectedServiceId(value)
        updateCommon('providingId', parseInt(value))
    }

    /**
     * Отправка формы
     */
    const handleSubmit = async () => {
        const cleanedData = cleanFormData(
            JSON.parse(JSON.stringify(formData)),
        ) as RequestFormData

        console.log('Отправка данных:', cleanedData)

        try {
            const response =
                requestType === 'tu'
                    ? await api.createTcRequest(cleanedData)
                    : await api.createDpRequest(cleanedData)

            console.log('Успешно:', response)
            alert('Заявление успешно отправлено!')
            resetForm()
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string; errors?: string[] }; statusText?: string }; message?: string }
            console.error('Ошибка:', error.response?.data)
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0] ||
                error.response?.statusText ||
                error.message ||
                'Произошла ошибка'
            alert(`Ошибка: ${errorMessage}`)
        }
    }

    // Загрузка данных
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
                    <p>Загрузка данных...</p>
                </div>
            </div>
        )
    }

    // Ошибка загрузки
    if (error) {
        return (
            <div className="p-4 max-w-md mx-auto mt-10 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600">{error}</p>
                </div>
                <Button onClick={() => window.location.reload()}>
                    Обновить страницу
                </Button>
            </div>
        )
    }

    // Начальный экран — выбор типа заявки
    if (!requestType) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Портал приёма заявок
                    <br />
                    <span className="text-lg font-normal text-muted-foreground">
                        АО «Ростовводоканал»
                    </span>
                </h1>

                <div className="grid gap-3 w-full max-w-md">
                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() => startForm('tu')}
                    >
                        Подать заявку на ТУ
                    </Button>

                    <Button
                        size="lg"
                        className="w-full"
                        onClick={() => startForm('dp')}
                    >
                        Подать заявку на договор подключения
                    </Button>

                    <div className="border-t my-4" />

                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => startForm('tu', true)}
                    >
                        Заявка ТУ готова (только документы)
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={() => startForm('dp', true)}
                    >
                        Заявка ДП готова (только документы)
                    </Button>
                </div>
            </div>
        )
    }

    // Форма заявки (единая для ТУ и ДП)
    return (
        <form className="min-h-screen max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center">
            {/* Заголовок и навигация */}
            <div className="mb-6 w-full max-w-md text-center">
                {!isReadyApplication && (
                    <Button
                        type="button"
                        variant="ghost"
                        className="mb-2"
                        onClick={resetForm}
                    >
                        ← Назад
                    </Button>
                )}
                <h1 className="text-xl font-bold">
                    {requestType === 'tu'
                        ? 'Заявка на получение технических условий'
                        : 'Заявка на заключение договора о подключении'}
                </h1>
            </div>

            {/* Шаг 1: Выбор услуги */}
            {!isReadyApplication && (
                <div className="w-full flex flex-col items-center">
                    <Field className="mt-5 w-64 sm:w-80 lg:w-96 xl:w-110">
                        <FieldLabel className="xl:text-lg">
                            Услуги подключения
                        </FieldLabel>
                        <Select
                            value={selectedServiceId}
                            onValueChange={handleServiceSelect}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите услугу" />
                            </SelectTrigger>
                            <SelectContent className="w-64 sm:w-80 lg:w-96 xl:w-110">
                                {services.map(({ name, id }) => (
                                    <SelectItem key={id} value={`${id}`}>
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

            {/* Детали услуги */}
            {selectedServiceId && !isReadyApplication && (
                <FirstStepOfForm
                    services={services}
                    updateCommon={updateCommon}
                    selectedServiceId={selectedServiceId}
                />
            )}

            {/* Шаг 2: Основание обращения */}
            {selectedServiceId && !isReadyApplication && (
                <TwoStepOfAccordion
                    accordion={requestReasons}
                    updateCommon={updateCommon}
                    setIsSelectedTwoStep={setShowStep2}
                />
            )}

            {/* Шаг 3: Сведения о заявителе */}
            {selectedServiceId && showStep2 && (
                <ThreeStepOfGroupButton
                    setQuantityFilledUpInputs={() => {}}
                    setTabsState={setTabsState}
                    updateCommon={updateCommon}
                    setIsSelectedThreeStep={setShowStep3}
                />
            )}

            {/* Шаг 4: Информация об объекте */}
            {selectedServiceId && showStep3 && (
                <ForeStepOfInfoObj
                    tabsState={tabsState}
                    updateCommon={updateCommon}
                    setIsSelectedForeStep={setShowStep4}
                />
            )}

            {/* Шаг 5: Загрузка документов */}
            {(isReadyApplication || showStep4) && (
                <DocumentsUploadForm
                    isReadyApplication={isReadyApplication}
                    onSubmit={handleSubmit}
                />
            )}
        </form>
    )
}

export default App
