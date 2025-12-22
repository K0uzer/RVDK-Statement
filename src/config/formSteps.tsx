/**
 * Декларативная конфигурация шагов формы
 * 
 * Описывает структуру формы, условия показа шагов и их компоненты
 */

import React, { type ReactNode } from 'react'
import type { RequestType, ClientType } from '@/types'

/**
 * Конфигурация одного шага формы
 */
export interface FormStepConfig {
    id: number
    name: string
    condition: (state: FormState) => boolean
    createComponent: (state: FormState) => ReactNode
    description?: string
}

/**
 * Состояние формы для проверки условий
 */
export interface FormState {
    requestType: RequestType | null
    selectedServiceId: string
    isReadyApplication: boolean
    showStep2: boolean
    showStep3: boolean
    showStep4: boolean
    isSubmitted: boolean
    services: unknown[]
    requestReasons: unknown[]
    tabsState: string
    formData: unknown
    updateCommon: (path: string, value: unknown) => void
    setShowStep2: (value: boolean) => void
    setShowStep3: (value: boolean) => void
    setShowStep4: (value: boolean) => void
    setTabsState: (value: string) => void
    handleSubmit: (files: unknown) => Promise<void>
    resetForm: () => void
}

/**
 * Создаёт конфигурацию шагов формы
 * 
 * @param components - Компоненты шагов
 * @returns Массив конфигураций шагов
 */
export function createFormStepsConfig(
    components: {
        FirstStepOfForm: React.ComponentType<any>
        TwoStepOfAccordion: React.ComponentType<any>
        ClientInfoStep: React.ComponentType<any>
        ForeStepOfInfoObj: React.ComponentType<any>
        DocumentsUploadForm: React.ComponentType<any>
        LazyErrorBoundary: React.ComponentType<any>
    },
): FormStepConfig[] {
    const { LazyErrorBoundary } = components

    return [
        {
            id: 1,
            name: 'Детали услуги',
            condition: (s) => !!s.selectedServiceId && !s.isReadyApplication,
            createComponent: (s) => {
                const { FirstStepOfForm } = components
                return (
                    <LazyErrorBoundary>
                        <FirstStepOfForm
                            services={s.services}
                            updateCommon={s.updateCommon}
                            selectedServiceId={s.selectedServiceId}
                        />
                    </LazyErrorBoundary>
                )
            },
            description: 'Выбор типа подключения и параметров услуги',
        },
        {
            id: 2,
            name: 'Основание обращения',
            condition: (s) => !!s.selectedServiceId && !s.isReadyApplication,
            createComponent: (s) => {
                const { TwoStepOfAccordion } = components
                return (
                    <LazyErrorBoundary>
                        <TwoStepOfAccordion
                            accordion={s.requestReasons}
                            updateCommon={s.updateCommon}
                            setIsSelectedTwoStep={s.setShowStep2}
                        />
                    </LazyErrorBoundary>
                )
            },
            description: 'Выбор основания для подачи заявки',
        },
        {
            id: 3,
            name: 'Сведения о заявителе',
            condition: (s) => !!s.selectedServiceId && s.showStep2,
            createComponent: (s) => {
                const { ClientInfoStep } = components
                return (
                    <LazyErrorBoundary>
                        <ClientInfoStep
                            updateCommon={s.updateCommon}
                            onClientTypeChange={(type: ClientType) => {
                                const tabsStateMap: Record<ClientType, string> = {
                                    individual: 'Физ. лица',
                                    legal: 'Юр. лица',
                                    ip: 'Индивидуальный предпр.',
                                    gov: 'Орган гос. власти и само упр.',
                                }
                                s.setTabsState(tabsStateMap[type])
                            }}
                            onFormStarted={() => s.setShowStep3(true)}
                        />
                    </LazyErrorBoundary>
                )
            },
            description: 'Заполнение данных заявителя',
        },
        {
            id: 4,
            name: 'Информация об объекте',
            condition: (s) => !!s.selectedServiceId && s.showStep3,
            createComponent: (s) => {
                const { ForeStepOfInfoObj } = components
                return (
                    <LazyErrorBoundary>
                        <ForeStepOfInfoObj
                            tabsState={s.tabsState}
                            updateCommon={s.updateCommon}
                            setIsSelectedForeStep={s.setShowStep4}
                            selectedServiceName={
                                (s.services as Array<{ id: number; name: string }>).find(
                                    (service) => service.id === Number(s.selectedServiceId),
                                )?.name
                            }
                        />
                    </LazyErrorBoundary>
                )
            },
            description: 'Характеристики подключаемого объекта',
        },
        {
            id: 5,
            name: 'Загрузка документов',
            condition: (s) => s.isReadyApplication || s.showStep4,
            createComponent: (s) => {
                const { DocumentsUploadForm } = components
                return (
                    <LazyErrorBoundary>
                        <DocumentsUploadForm
                            isReadyApplication={s.isReadyApplication}
                            onSubmit={s.handleSubmit}
                            requestType={s.requestType || 'tu'}
                            serviceId={s.selectedServiceId ? Number(s.selectedServiceId) : undefined}
                        />
                    </LazyErrorBoundary>
                )
            },
            description: 'Прикрепление необходимых документов',
        },
    ]
}

