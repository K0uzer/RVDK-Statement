/**
 * Страница формы заявки
 * 
 * FSD: pages/request-form/ui - страница формы заявки
 */

import { useState, useCallback, lazy } from 'react'
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
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedRequestId, setSubmittedRequestId] = useState('')

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
                </div>
            )}

            {/* Шаг 1.1: Детали выбранной услуги */}
            {selectedServiceId && !isReadyApplication && (
                <LazyErrorBoundary>
                    <ServiceDetailsStep
                        services={services}
                        updateCommon={updateCommon}
                        selectedServiceId={selectedServiceId}
                    />
                </LazyErrorBoundary>
            )}

            {/* Шаг 2: Основание обращения */}
            {selectedServiceId && !isReadyApplication && (
                <LazyErrorBoundary>
                    <RequestReasonAccordion
                        accordion={requestReasons}
                        updateCommon={updateCommon}
                        setIsSelected={setShowStep2}
                    />
                </LazyErrorBoundary>
            )}

            {/* Шаг 3: Сведения о заявителе */}
            {selectedServiceId && showStep2 && (
                <LazyErrorBoundary>
                    <ClientInfoForm
                        updateCommon={updateCommon}
                        onClientTypeChange={(type: ClientType) => {
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

            {/* Шаг 4: Информация об объекте */}
            {selectedServiceId && showStep3 && (
                <LazyErrorBoundary>
                    <ObjectInfoForm
                        tabsState={tabsState}
                        updateCommon={updateCommon}
                        setIsSelectedForeStep={setShowStep4}
                        selectedServiceName={
                            services.find((s) => s.id === Number(selectedServiceId))?.name
                        }
                    />
                </LazyErrorBoundary>
            )}

            {/* Шаг 5: Загрузка документов и отправка */}
            {(isReadyApplication || showStep4) && (
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

