/**
 * Страница формы заявки
 * 
 * FSD: pages/request-form/ui - страница формы заявки
 */

import { useState, useCallback, lazy, useMemo, useEffect } from 'react'
import { Button } from '@/shared/ui'
import { LazyErrorBoundary } from '@/shared/ui/error-boundary'
import { ClientInfoForm } from '@/features/fill-client-info'
import { ServiceSelect } from '@/features/select-service'
import { RequestReasonAccordion } from '@/features/select-request-reason'
import { ObjectInfoForm } from '@/features/fill-object-info'
import { DocumentsUpload } from '@/features/upload-documents'
import { SuccessPageWidget } from '@/widgets/success-page'
import { useServices } from '@/entities/service'
import { useRequestReasons } from '@/entities/request'
import { useSubmitRequest } from '@/features/submit-request'
import { initialFormData, createUpdateFn } from '@/shared/lib/form-utils'
import { validateAllSteps, type FormValidationState } from '@/shared/lib/form-validation'
import type { ClientType, RequestType, RequestFormData } from '@/entities/request'

// Lazy компоненты
const ServiceDetailsStep = lazy(() => import('@/widgets/form-steps').then(m => ({ default: m.ServiceDetailsStep })))

interface RequestFormPageProps {
    requestType: RequestType
    isReadyApplication?: boolean
    onReset: () => void
}

/**
 * Страница формы заявки
 * Объединяет все шаги формы в единый поток
 */
export function RequestFormPage({
    requestType,
    isReadyApplication = false,
    onReset,
}: RequestFormPageProps) {
    // ================== СОСТОЯНИЕ ДАННЫХ ФОРМЫ ==================
    const [formData, setFormData] = useState<RequestFormData>(initialFormData)
    const updateCommon = useCallback(createUpdateFn(setFormData), [])

    // ================== ДАННЫЕ С API ==================
    const { services, loading: servicesLoading, error: servicesError } = useServices()
    const { requestReasons, loading: reasonsLoading, error: reasonsError } = useRequestReasons()

    // ================== UI СОСТОЯНИЕ ==================
    const [selectedServiceId, setSelectedServiceId] = useState('')
    const [showStep2, setShowStep2] = useState(false)
    const [showStep3, setShowStep3] = useState(false)
    const [showStep4, setShowStep4] = useState(false)
    const [tabsState, setTabsState] = useState('')
    const [clientType, setClientType] = useState<ClientType>('individual')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedRequestId, setSubmittedRequestId] = useState('')

    // ================== ОПРЕДЕЛЕНИЕ ТИПА КЛИЕНТА ==================
    // Автоматически определяем тип клиента на основе заполненных данных
    const detectedClientType = useMemo<ClientType>(() => {
        // Проверяем, какие данные заполнены
        if (formData.individualClient && 
            (formData.individualClient.fullName?.firstName || 
             formData.individualClient.firstName)) {
            return 'individual'
        }
        if (formData.legalClient && 
            (formData.legalClient.nameFull || formData.legalClient.nameShort)) {
            return 'legal'
        }
        if (formData.legalClientIP && 
            (formData.legalClientIP.fullName?.firstName || 
             formData.legalClientIP.firstName)) {
            return 'ip'
        }
        if (formData.legalClientGov && 
            (formData.legalClientGov.nameFull || formData.legalClientGov.nameShort)) {
            return 'gov'
        }
        // По умолчанию возвращаем текущий тип
        return clientType
    }, [formData, clientType])

    // ================== ВАЛИДАЦИЯ ==================
    // Вычисляем валидацию всех шагов на основе текущих данных формы
    const validation = useMemo<FormValidationState>(() => {
        return validateAllSteps(formData, detectedClientType)
    }, [formData, detectedClientType])

    // Автоматически копируем адрес регистрации в почтовый адрес после валидации
    // Копируем только если почтовый адрес пустой и адрес регистрации валиден
    useEffect(() => {
        // Для физических лиц: копируем address в postalAddress
        if (clientType === 'individual' && 
            formData.individualClient?.address?.trim() && 
            !formData.individualClient?.postalAddress?.trim()) {
            // Проверяем, что адрес регистрации валиден (не пустой)
            const addressValid = formData.individualClient.address.trim().length > 0
            if (addressValid) {
                updateCommon('individualClient.postalAddress', formData.individualClient.address)
            }
        }
        
        // Для юридических лиц: копируем legalAddress в postalAddress
        if (clientType === 'legal' && 
            formData.legalClient?.legalAddress?.trim() && 
            !formData.legalClient?.postalAddress?.trim()) {
            const addressValid = formData.legalClient.legalAddress.trim().length > 0
            if (addressValid) {
                updateCommon('legalClient.postalAddress', formData.legalClient.legalAddress)
            }
        }
        
        // Для ИП: копируем legalAddress в postalAddress
        if (clientType === 'ip' && 
            formData.legalClientIP?.legalAddress?.trim() && 
            !formData.legalClientIP?.postalAddress?.trim()) {
            const addressValid = formData.legalClientIP.legalAddress.trim().length > 0
            if (addressValid) {
                updateCommon('legalClientIP.postalAddress', formData.legalClientIP.legalAddress)
            }
        }
        
        // Для гос. органов: копируем legalAddress в postalAddress
        if (clientType === 'gov' && 
            formData.legalClientGov?.legalAddress?.trim() && 
            !formData.legalClientGov?.postalAddress?.trim()) {
            const addressValid = formData.legalClientGov.legalAddress.trim().length > 0
            if (addressValid) {
                updateCommon('legalClientGov.postalAddress', formData.legalClientGov.legalAddress)
            }
        }
    }, [
        clientType,
        formData.individualClient?.address,
        formData.legalClient?.legalAddress,
        formData.legalClientIP?.legalAddress,
        formData.legalClientGov?.legalAddress,
        updateCommon,
    ])

    // Автоматически управляем показом шагов на основе валидации
    useEffect(() => {
        // Шаг 1: скрываем все последующие шаги если невалиден
        if (!validation.step1.isValid) {
            setShowStep2(false)
            setShowStep3(false)
            setShowStep4(false)
            return
        }
        
        // Шаг 2: показываем/скрываем шаг 2 на основе валидации
        if (validation.step2.isValid && formData.requestReasonId > 0) {
            setShowStep2(true)
        } else if (!validation.step2.isValid) {
            setShowStep2(false)
            setShowStep3(false)
            setShowStep4(false)
            return
        }
        
        // Шаг 3: показываем шаг 3 если он валиден (и шаги 1 и 2 тоже валидны)
        if (validation.step1.isValid && validation.step2.isValid && validation.step3.isValid) {
            setShowStep3(true)
        } else if (!validation.step3.isValid) {
            // Скрываем шаг 4 если шаг 3 невалиден
            setShowStep4(false)
            return
        }
        
        // Шаг 4: показываем шаг 4 если он валиден (и все предыдущие шаги тоже валидны)
        if (validation.step1.isValid && validation.step2.isValid && validation.step3.isValid) {
            if (validation.step4.isValid) {
                setShowStep4(true)
            } else {
                // Скрываем шаг 4 если он невалиден
                setShowStep4(false)
            }
        }
    }, [validation, formData.requestReasonId])

    // ================== ОТПРАВКА ЗАЯВКИ ==================
    const { submitRequest } = useSubmitRequest()

    const handleServiceSelect = useCallback(
        (value: string) => {
            setSelectedServiceId(value)
            updateCommon('providingId', Number(value))
        },
        [updateCommon],
    )

    const handleSubmit = useCallback(async () => {
        const response = await submitRequest(formData, requestType)
        if (response?.id) {
            setSubmittedRequestId(response.id)
            setIsSubmitted(true)
        }
    }, [formData, requestType, submitRequest])

    // ================== РЕНДЕР: СОСТОЯНИЯ ЗАГРУЗКИ И ОШИБОК ==================
    if (servicesLoading || reasonsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-muted-foreground">Загрузка...</p>
            </div>
        )
    }

    if (servicesError || reasonsError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-destructive mb-4">
                        {servicesError || reasonsError}
                    </p>
                    <Button onClick={() => window.location.reload()}>
                        Обновить страницу
                    </Button>
                </div>
            </div>
        )
    }

    // ================== РЕНДЕР: СТРАНИЦА УСПЕХА ==================
    if (isSubmitted) {
        return (
            <SuccessPageWidget
                requestType={requestType}
                requestId={submittedRequestId}
                onNewRequest={onReset}
            />
        )
    }

    // ================== РЕНДЕР: ОСНОВНАЯ ФОРМА ==================
    return (
        <form className="min-h-screen max-w-6xl mx-auto px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center">
            {/* Заголовок и навигация */}
            <div className="mb-6 w-full max-w-md text-center">
                {!isReadyApplication && (
                    <Button
                        type="button"
                        variant="ghost"
                        className="mb-2"
                        onClick={onReset}
                    >
                        ← Назад
                    </Button>
                )}
                <h2 className="text-2xl">
                    {requestType === 'tu'
                        ? 'Получение технических условий'
                        : 'Заключение договора о подключении'}
                </h2>
            </div>

            {/* Шаг 1: Выбор услуги */}
            {!isReadyApplication && (
                <div className="mt-10 w-64 sm:w-80 lg:w-96 xl:w-110 pb-10 mx-auto text-center">
                    <ServiceSelect
                        services={services}
                        selectedServiceId={selectedServiceId}
                        onSelect={handleServiceSelect}
                    />
                    {!validation.step1.isValid && validation.step1.errors.length > 0 && (
                        <div className="mt-2 text-sm text-destructive text-center">
                            {validation.step1.errors[0]}
                        </div>
                    )}
                </div>
            )}

            {/* Шаг 1.1: Детали выбранной услуги */}
            {selectedServiceId && validation.step1.isValid && !isReadyApplication && (
                <LazyErrorBoundary>
                    <ServiceDetailsStep
                        services={services}
                        updateCommon={updateCommon}
                        selectedServiceId={selectedServiceId}
                    />
                </LazyErrorBoundary>
            )}

            {/* Шаг 2: Основание обращения */}
            {selectedServiceId && validation.step1.isValid && !isReadyApplication && (
                <LazyErrorBoundary>
                    <RequestReasonAccordion
                        accordion={requestReasons}
                        updateCommon={updateCommon}
                        setIsSelected={(value) => {
                            // Просто сохраняем состояние выбора
                            // Показ следующего шага будет обработан через useEffect
                            if (!value) {
                                setShowStep2(false)
                            }
                        }}
                    />
                    {!validation.step2.isValid && validation.step2.errors.length > 0 && (
                        <div className="mt-2 text-sm text-destructive text-center">
                            {validation.step2.errors[0]}
                        </div>
                    )}
                </LazyErrorBoundary>
            )}

            {/* Шаг 3: Сведения о заявителе */}
            {selectedServiceId && validation.step1.isValid && validation.step2.isValid && showStep2 && (
                <LazyErrorBoundary>
                    <ClientInfoForm
                        updateCommon={updateCommon}
                        onClientTypeChange={(type: ClientType) => {
                            setClientType(type)
                            const tabsStateMap: Record<ClientType, string> = {
                                individual: 'Физ. лица',
                                legal: 'Юр. лица',
                                ip: 'Индивидуальный предпр.',
                                gov: 'Орган гос. власти и само упр.',
                            }
                            setTabsState(tabsStateMap[type])
                        }}
                        onFormStarted={() => {
                            // onFormStarted вызывается при заполнении первого поля
                            // Показ следующего шага будет обработан автоматически через useEffect
                            // на основе валидации
                        }}
                    />
                    {!validation.step3.isValid && validation.step3.errors.length > 0 && (
                        <div className="mt-2 text-sm text-destructive text-center">
                            {validation.step3.errors[0]}
                        </div>
                    )}
                </LazyErrorBoundary>
            )}

            {/* Шаг 4: Информация об объекте */}
            {selectedServiceId && validation.step1.isValid && validation.step2.isValid && validation.step3.isValid && showStep3 && (
                <LazyErrorBoundary>
                    <ObjectInfoForm
                        tabsState={tabsState}
                        updateCommon={updateCommon}
                        setIsSelectedForeStep={(value) => {
                            // setIsSelectedForeStep вызывается при заполнении первого поля
                            // Показ следующего шага будет обработан автоматически через useEffect
                            // на основе валидации
                            if (!value) {
                                setShowStep4(false)
                            }
                        }}
                        selectedServiceName={
                            services.find((s) => s.id === Number(selectedServiceId))?.name
                        }
                    />
                    {!validation.step4.isValid && validation.step4.errors.length > 0 && (
                        <div className="mt-2 text-sm text-destructive text-center">
                            {validation.step4.errors[0]}
                        </div>
                    )}
                </LazyErrorBoundary>
            )}

            {/* Шаг 5: Загрузка документов и отправка */}
            {(isReadyApplication || (validation.step4.isValid && showStep4)) && (
                <LazyErrorBoundary>
                    <DocumentsUpload
                        isReadyApplication={isReadyApplication}
                        onSubmit={handleSubmit}
                        requestType={requestType}
                        serviceId={selectedServiceId ? Number(selectedServiceId) : undefined}
                    />
                </LazyErrorBoundary>
            )}
        </form>
    )
}

