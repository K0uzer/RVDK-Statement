/**
 * =============================================================================
 * ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ
 * Портал приёма заявок АО «Ростовводоканал»
 * =============================================================================
 * 
 * Приложение предназначено для подачи заявок на:
 * - ТУ (Технические условия) — срок рассмотрения 7 рабочих дней
 * - ДП (Договор подключения) — срок рассмотрения 20 рабочих дней
 * 
 * СТРУКТУРА ФОРМЫ (5 шагов):
 * ┌─────────────────────────────────────────────────────────────┐
 * │ Шаг 0: Выбор типа заявки (ТУ / ДП)                          │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Шаг 1: Выбор услуги подключения (Select + детали)           │
 * │        → FirstStepOfForm                                     │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Шаг 2: Основание обращения (Accordion с чекбоксами)         │
 * │        → TwoStepOfAccordion                                  │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Шаг 3: Сведения о заявителе (Tabs: Физ/Юр/ИП/Гос)           │
 * │        → ThreeStepOfGroupButton                              │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Шаг 4: Информация о подключаемом объекте                    │
 * │        → ForeStepOfInfoObj                                   │
 * ├─────────────────────────────────────────────────────────────┤
 * │ Шаг 5: Загрузка документов + отправка                       │
 * │        → DocumentsUploadForm                                 │
 * └─────────────────────────────────────────────────────────────┘
 * 
 * @module App
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

// ================== КОМПОНЕНТЫ ШАГОВ ФОРМЫ ==================
import FirstStepOfForm from './components/FirstStepOfForm'      // Шаг 1: Детали услуги
import TwoStepOfAccordion from './components/TwoStepOfAccordion' // Шаг 2: Основание обращения
import ThreeStepOfGroupButton from './components/ThreeStepOfGroupButton' // Шаг 3: Данные заявителя
import ForeStepOfInfoObj from './components/ForeStepOfInfoObj'   // Шаг 4: Информация об объекте
import DocumentsUploadForm from './components/DocumentsUploadForm' // Шаг 5: Документы
import SuccessPage from './components/SuccessPage'               // Страница успешной отправки

// ================== ХУКИ И УТИЛИТЫ ==================
import { useApiData } from '@/hooks/useApiData'
import { api } from '@/api'
import { initialFormData, cleanFormData, createUpdateFn } from '@/utils/form'
import type { RequestFormData, RequestType } from '@/types'

function App() {
    // ================== СОСТОЯНИЕ ДАННЫХ ФОРМЫ ==================
    /**
     * Основной объект с данными заявки
     * Структура определена в initialFormData (см. src/utils/form.ts)
     */
    const [formData, setFormData] = useState(initialFormData)
    
    /**
     * Функция обновления вложенных полей формы
     * Использование: updateCommon('individualClient.fullName.firstName', 'Иван')
     */
    const updateCommon = useCallback(createUpdateFn(setFormData), [])

    // ================== ДАННЫЕ С API ==================
    /**
     * Загружаем списки услуг и оснований обращения
     * services — список услуг подключения
     * requestReasons — список оснований обращения
     */
    const { services, requestReasons, loading, error } = useApiData()

    // ================== UI СОСТОЯНИЕ ==================
    /**
     * Тип заявки: 'tu' (технические условия) или 'dp' (договор подключения)
     * null = начальный экран выбора типа
     */
    const [requestType, setRequestType] = useState<RequestType | null>(null)
    
    /** ID выбранной услуги из списка services */
    const [selectedServiceId, setSelectedServiceId] = useState('')
    
    /** Режим "готовая заявка" — сразу переходим к загрузке документов */
    const [isReadyApplication, setIsReadyApplication] = useState(false)

    // ================== СОСТОЯНИЕ ШАГОВ ФОРМЫ ==================
    /**
     * Флаги видимости шагов (прогрессивное раскрытие)
     * Каждый следующий шаг показывается после заполнения предыдущего
     */
    const [showStep2, setShowStep2] = useState(false)  // Основание обращения
    const [showStep3, setShowStep3] = useState(false)  // Сведения о заявителе
    const [showStep4, setShowStep4] = useState(false)  // Информация об объекте
    
    /** Текущая вкладка в Шаге 3 (тип заявителя) */
    const [tabsState, setTabsState] = useState('')

    // ================== СОСТОЯНИЕ ОТПРАВКИ ==================
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedRequestId, setSubmittedRequestId] = useState<string>('')

    // ================== ОБРАБОТЧИКИ ==================

    /**
     * Начать заполнение формы
     * 
     * @param type - Тип заявки ('tu' или 'dp')
     * @param ready - Если true, переходим сразу к загрузке документов
     *               (для случаев когда форма уже заполнена офлайн)
     */
    const startForm = (type: RequestType, ready = false) => {
        setRequestType(type)
        setIsReadyApplication(ready)
        if (ready) {
            // В режиме "готовой заявки" сразу показываем документы
            setShowStep4(true)
        }
    }

    /**
     * Полный сброс формы
     * Возвращает приложение в начальное состояние
     */
    const resetForm = useCallback(() => {
        setFormData(initialFormData)  // Сбрасываем данные
        setSelectedServiceId('')       // Сбрасываем выбор услуги
        setShowStep2(false)            // Скрываем все шаги
        setShowStep3(false)
        setShowStep4(false)
        setTabsState('')
        setRequestType(null)           // Возвращаемся к выбору типа
        setIsReadyApplication(false)
        setIsSubmitted(false)
        setSubmittedRequestId('')
    }, [])

    /**
     * Обработчик выбора услуги подключения
     * Обновляет состояние и данные формы
     */
    const handleServiceSelect = (value: string) => {
        setSelectedServiceId(value)
        updateCommon('providingId', parseInt(value))
    }

    /**
     * Отправка формы на сервер
     * 
     * Процесс:
     * 1. Очищаем данные от пустых строк (cleanFormData)
     * 2. Отправляем на соответствующий endpoint (ТУ или ДП)
     * 3. При успехе — показываем страницу успеха
     * 4. При ошибке — показываем сообщение об ошибке
     */
    const handleSubmit = async () => {
        // Очищаем данные: пустые строки → null, пустые объекты → null
        const cleanedData = cleanFormData(
            JSON.parse(JSON.stringify(formData)),
        ) as RequestFormData

        console.log('Отправка данных:', cleanedData)

        try {
            // Выбираем endpoint в зависимости от типа заявки
            const response =
                requestType === 'tu'
                    ? await api.createTcRequest(cleanedData)
                    : await api.createDpRequest(cleanedData)

            console.log('Успешно:', response)
            
            // Переходим на страницу успешной отправки
            setSubmittedRequestId(response?.id || '')
            setIsSubmitted(true)
        } catch (err: unknown) {
            // Обработка ошибок API
            const error = err as { 
                response?: { 
                    data?: { message?: string; errors?: string[] }
                    statusText?: string 
                }
                message?: string 
            }
            console.error('Ошибка:', error.response?.data)
            
            // Извлекаем сообщение об ошибке из разных возможных мест
            const errorMessage =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0] ||
                error.response?.statusText ||
                error.message ||
                'Произошла ошибка'
            
            alert(`Ошибка: ${errorMessage}`)
        }
    }

    // ================== РЕНДЕР: СОСТОЯНИЯ ЗАГРУЗКИ И ОШИБОК ==================

    /**
     * Состояние загрузки
     * Показывается пока загружаются данные с API
     */
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

    /**
     * Состояние ошибки
     * Показывается если не удалось загрузить данные с API
     */
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

    /**
     * Страница успешной отправки
     * Показывается после успешной отправки заявки
     * Содержит номер заявки и информацию о сроках рассмотрения
     */
    if (isSubmitted && requestType) {
        return (
            <SuccessPage
                requestType={requestType}
                requestId={submittedRequestId}
                onNewRequest={resetForm}
            />
        )
    }

    // ================== РЕНДЕР: НАЧАЛЬНЫЙ ЭКРАН ==================

    /**
     * Начальный экран выбора типа заявки
     * Пользователь выбирает:
     * - ТУ (Технические условия)
     * - ДП (Договор подключения)
     * - или "готовую заявку" если данные уже заполнены офлайн
     */
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
                    {/* Основные кнопки — полный цикл заполнения */}
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

                    {/* Кнопки для готовых заявок — только загрузка документов */}
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

    // ================== РЕНДЕР: ОСНОВНАЯ ФОРМА ==================

    /**
     * Основная форма заявки
     * Единая структура для ТУ и ДП — различия в данных и валидации
     * 
     * Прогрессивное раскрытие: каждый шаг появляется после заполнения предыдущего
     */
    return (
        <form className="min-h-screen max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center">
            
            {/* ========== ЗАГОЛОВОК И НАВИГАЦИЯ ========== */}
            <div className="mb-6 w-full max-w-md text-center">
                {/* Кнопка "Назад" — только для обычного режима */}
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
                {/* Заголовок зависит от типа заявки */}
                <h1 className="text-xl font-bold">
                    {requestType === 'tu'
                        ? 'Заявка на получение технических условий'
                        : 'Заявка на заключение договора о подключении'}
                </h1>
            </div>

            {/* ========== ШАГ 1: ВЫБОР УСЛУГИ ПОДКЛЮЧЕНИЯ ========== */}
            {/* Показываем только в обычном режиме (не "готовая заявка") */}
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
                                {/* Список услуг загружается с API */}
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

            {/* ========== ШАГ 1.1: ДЕТАЛИ ВЫБРАННОЙ УСЛУГИ ========== */}
            {/* Чекбоксы водоснабжение/водоотведение, поля для ТУ и т.д. */}
            {selectedServiceId && !isReadyApplication && (
                <FirstStepOfForm
                    services={services}
                    updateCommon={updateCommon}
                    selectedServiceId={selectedServiceId}
                />
            )}

            {/* ========== ШАГ 2: ОСНОВАНИЕ ОБРАЩЕНИЯ ========== */}
            {/* Accordion с чекбоксами — выбор одного из 4-5 оснований */}
            {selectedServiceId && !isReadyApplication && (
                <TwoStepOfAccordion
                    accordion={requestReasons}
                    updateCommon={updateCommon}
                    setIsSelectedTwoStep={setShowStep2}
                />
            )}

            {/* ========== ШАГ 3: СВЕДЕНИЯ О ЗАЯВИТЕЛЕ ========== */}
            {/* Tabs: Физ.лица / Юр.лица / ИП / Гос.органы */}
            {/* Появляется после выбора основания обращения */}
            {selectedServiceId && showStep2 && (
                <ThreeStepOfGroupButton
                    setQuantityFilledUpInputs={() => {}} // TODO: убрать неиспользуемый prop
                    setTabsState={setTabsState}           // Тип заявителя для Шага 4
                    updateCommon={updateCommon}
                    setIsSelectedThreeStep={setShowStep3}
                />
            )}

            {/* ========== ШАГ 4: ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ ========== */}
            {/* Адрес, кадастр, характеристики, нагрузка */}
            {/* Появляется после начала заполнения данных заявителя */}
            {selectedServiceId && showStep3 && (
                <ForeStepOfInfoObj
                    tabsState={tabsState}
                    updateCommon={updateCommon}
                    setIsSelectedForeStep={setShowStep4}
                    selectedServiceName={
                        services.find((s) => s.id === Number(selectedServiceId))?.name
                    }
                />
            )}

            {/* ========== ШАГ 5: ЗАГРУЗКА ДОКУМЕНТОВ И ОТПРАВКА ========== */}
            {/* Список документов зависит от типа заявки (ТУ/ДП) */}
            {/* В режиме "готовая заявка" показывается сразу */}
            {(isReadyApplication || showStep4) && (
                <DocumentsUploadForm
                    isReadyApplication={isReadyApplication}
                    onSubmit={handleSubmit}
                    requestType={requestType || 'tu'}
                    serviceId={selectedServiceId ? Number(selectedServiceId) : undefined}
                />
            )}
        </form>
    )
}

export default App
