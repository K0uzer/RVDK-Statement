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

// ================== LAZY LOADING КОМПОНЕНТОВ ==================
// Динамическая загрузка компонентов для code splitting
import {
    FirstStepOfForm,
    TwoStepOfAccordion,
    ForeStepOfInfoObj,
    DocumentsUploadForm,
    SuccessPage,
} from './components/lazy'
import { ClientInfoStep } from './components/ClientInfoStep'
import { LazyErrorBoundary } from './components/LazyErrorBoundary'
import type { ClientType } from '@/types'

// ================== ХУКИ И УТИЛИТЫ ==================
import { useApiData } from '@/hooks/useApiData'
import { api } from '@/api'
import { initialFormData, cleanFormData, createUpdateFn } from '@/utils/form'
import { handleError } from '@/utils/errorHandling'
import { getRequestTypeConfig } from '@/config/requestTypes'
import { INITIAL_SCREEN_CONFIG } from '@/config/initialScreen'
import { config } from '@/config'
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
            // Декларативный выбор endpoint на основе конфигурации
            if (!requestType) {
                throw new Error('Тип заявки не выбран')
            }
            
            const requestConfig = getRequestTypeConfig(
                {
                    createTcRequest: (data: unknown) => api.createTcRequest(data as RequestFormData),
                    createDpRequest: (data: unknown) => api.createDpRequest(data as RequestFormData),
                },
                config,
            )
            const currentConfig = requestConfig[requestType]
            
            const response = await currentConfig.endpoint(cleanedData)

            console.log('Успешно:', response)
            
            // Переходим на страницу успешной отправки
            setSubmittedRequestId(response?.id || '')
            setIsSubmitted(true)
        } catch (err: unknown) {
            // Декларативная обработка ошибок
            handleError(err)
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
            <LazyErrorBoundary>
                <SuccessPage
                    requestType={requestType}
                    requestId={submittedRequestId}
                    onNewRequest={resetForm}
                />
            </LazyErrorBoundary>
        )
    }

    // ================== РЕНДЕР: НАЧАЛЬНЫЙ ЭКРАН ==================

    /**
     * Начальный экран выбора типа заявки
     * Использует декларативную конфигурацию кнопок
     */
    if (!requestType) {
        // Разделяем кнопки на основные и готовые заявки
        const mainButtons = INITIAL_SCREEN_CONFIG.filter((btn) => !btn.isReady)
        const readyButtons = INITIAL_SCREEN_CONFIG.filter((btn) => btn.isReady)

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
                    {mainButtons.map((button) => (
                        <Button
                            key={`${button.requestType}-${button.isReady}`}
                            size="lg"
                            variant={button.variant || 'default'}
                            className="w-full"
                            onClick={() => startForm(button.requestType, button.isReady)}
                        >
                            {button.label}
                        </Button>
                    ))}

                    {readyButtons.length > 0 && <div className="border-t my-4" />}

                    {/* Кнопки для готовых заявок — только загрузка документов */}
                    {readyButtons.map((button) => (
                        <Button
                            key={`${button.requestType}-${button.isReady}`}
                            size="lg"
                            variant={button.variant || 'outline'}
                            className="w-full"
                            onClick={() => startForm(button.requestType, button.isReady)}
                        >
                            {button.label}
                        </Button>
                    ))}
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
                <LazyErrorBoundary>
                    <FirstStepOfForm
                        services={services}
                        updateCommon={updateCommon}
                        selectedServiceId={selectedServiceId}
                    />
                </LazyErrorBoundary>
            )}

            {/* ========== ШАГ 2: ОСНОВАНИЕ ОБРАЩЕНИЯ ========== */}
            {/* Accordion с чекбоксами — выбор одного из 4-5 оснований */}
            {selectedServiceId && !isReadyApplication && (
                <LazyErrorBoundary>
                    <TwoStepOfAccordion
                        accordion={requestReasons}
                        updateCommon={updateCommon}
                        setIsSelectedTwoStep={setShowStep2}
                    />
                </LazyErrorBoundary>
            )}

            {/* ========== ШАГ 3: СВЕДЕНИЯ О ЗАЯВИТЕЛЕ ========== */}
            {/* Tabs: Физ.лица / Юр.лица / ИП / Гос.органы */}
            {/* Появляется после выбора основания обращения */}
            {selectedServiceId && showStep2 && (
                <LazyErrorBoundary>
                    <ClientInfoStep
                        updateCommon={updateCommon}
                        onClientTypeChange={(type) => {
                            // Преобразуем ClientType в tabsState для совместимости
                            const tabsStateMap: Record<ClientType, string> = {
                                individual: 'Физ. лица',
                                legal: 'Юр. лица',
                                ip: 'Индивидуальный предпр.',
                                gov: 'Орган гос. власти и само упр.',
                            }
                            setTabsState(tabsStateMap[type])
                        }}
                        onFormStarted={() => setShowStep3(true)}
                    />
                </LazyErrorBoundary>
            )}

            {/* ========== ШАГ 4: ИНФОРМАЦИЯ ОБ ОБЪЕКТЕ ========== */}
            {/* Адрес, кадастр, характеристики, нагрузка */}
            {/* Появляется после начала заполнения данных заявителя */}
            {selectedServiceId && showStep3 && (
                <LazyErrorBoundary>
                    <ForeStepOfInfoObj
                        tabsState={tabsState}
                        updateCommon={updateCommon}
                        setIsSelectedForeStep={setShowStep4}
                        selectedServiceName={
                            services.find((s) => s.id === Number(selectedServiceId))?.name
                        }
                    />
                </LazyErrorBoundary>
            )}

            {/* ========== ШАГ 5: ЗАГРУЗКА ДОКУМЕНТОВ И ОТПРАВКА ========== */}
            {/* Список документов зависит от типа заявки (ТУ/ДП) */}
            {/* В режиме "готовая заявка" показывается сразу */}
            {(isReadyApplication || showStep4) && (
                <LazyErrorBoundary>
                    <DocumentsUploadForm
                        isReadyApplication={isReadyApplication}
                        onSubmit={handleSubmit}
                        requestType={requestType || 'tu'}
                        serviceId={selectedServiceId ? Number(selectedServiceId) : undefined}
                    />
                </LazyErrorBoundary>
            )}
        </form>
    )
}

export default App
