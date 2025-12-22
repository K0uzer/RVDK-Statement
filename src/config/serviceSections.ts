/**
 * Декларативная конфигурация секций услуг
 * 
 * Маппинг названий услуг на их компоненты и пропсы
 */

import type { ComponentType } from 'react'
import { SERVICE_TITLES } from '@/constants/services'

/**
 * Конфигурация секции услуги
 */
export interface ServiceSectionConfig {
    serviceName: string
    component: ComponentType<any>
    getProps: (state: ServiceSectionState) => Record<string, unknown>
}

/**
 * Состояние для генерации пропсов секции
 */
export interface ServiceSectionState {
    selections: Record<string, string[]>
    tcNumber: string
    tcDate: string
    reason: string
    diameter: string
    handleToggle: (category: string, value: string, type?: 0 | 1) => void
    handleDiameterChange: (value: string) => void
    handleTcNumberChange: (value: string) => void
    handleTcDateChange: (value: string) => void
    setReason: (value: string) => void
}

/**
 * Создаёт конфигурацию секций услуг
 * 
 * @param components - Компоненты секций услуг
 * @returns Массив конфигураций
 */
export function createServiceSectionsConfig(components: {
    NewConnectionSection: ComponentType<any>
    AdjacentOwnerSection: ComponentType<any>
    ReconstructionSection: ComponentType<any>
    YardNetworksSection: ComponentType<any>
    TcCorrectionSection: ComponentType<any>
    TcAnnulmentSection: ComponentType<any>
    NetworkRemovalSection: ComponentType<any>
    MeterInstallationSection: ComponentType<any>
    InfoOnlySection: ComponentType<any>
    DialogForm: ComponentType<any>
}): ServiceSectionConfig[] {
    return [
        {
            serviceName: SERVICE_TITLES.NEW_CONNECTION,
            component: components.NewConnectionSection,
            getProps: (state) => ({
                selectedValues: state.selections.newConnection,
                onToggle: (value: string, type?: 0 | 1) =>
                    state.handleToggle('newConnection', value, type),
            }),
        },
        {
            serviceName: SERVICE_TITLES.ADJACENT_OWNER,
            component: components.AdjacentOwnerSection,
            getProps: (state) => ({
                selectedValues: state.selections.adjacent,
                onToggle: (value: string, type?: 0 | 1) =>
                    state.handleToggle('adjacent', value, type),
            }),
        },
        {
            serviceName: SERVICE_TITLES.RECONSTRUCTION,
            component: components.ReconstructionSection,
            getProps: (state) => ({
                selectedValues: state.selections.reconstruction,
                diameter: state.diameter,
                onToggle: (value: string) =>
                    state.handleToggle('reconstruction', value),
                onDiameterChange: state.handleDiameterChange,
            }),
        },
        {
            serviceName: SERVICE_TITLES.YARD_NETWORKS,
            component: components.YardNetworksSection,
            getProps: (state) => ({
                selectedValues: state.selections.yard,
                onToggle: (value: string, type?: 0 | 1) =>
                    state.handleToggle('yard', value, type),
            }),
        },
        {
            serviceName: SERVICE_TITLES.CORRECTION,
            component: components.TcCorrectionSection,
            getProps: (state) => ({
                tcNumber: state.tcNumber,
                tcDate: state.tcDate,
                reason: state.reason,
                onTcNumberChange: state.handleTcNumberChange,
                onTcDateChange: state.handleTcDateChange,
                onReasonChange: state.setReason,
            }),
        },
        {
            serviceName: SERVICE_TITLES.ANNULMENT,
            component: components.TcAnnulmentSection,
            getProps: (state) => ({
                tcNumber: state.tcNumber,
                tcDate: state.tcDate,
                reason: state.reason,
                onTcNumberChange: state.handleTcNumberChange,
                onTcDateChange: state.handleTcDateChange,
                onReasonChange: state.setReason,
            }),
        },
        {
            serviceName: SERVICE_TITLES.NETWORK_REMOVAL,
            component: components.NetworkRemovalSection,
            getProps: (state) => ({
                selectedValues: state.selections.networkRemoval,
                diameter: state.diameter,
                onToggle: (value: string, type?: 0 | 1) =>
                    state.handleToggle('networkRemoval', value, type),
                onDiameterChange: state.handleDiameterChange,
            }),
        },
        {
            serviceName: SERVICE_TITLES.METER_INSTALLATION,
            component: components.MeterInstallationSection,
            getProps: (state) => ({
                selectedValues: state.selections.meter,
                onToggle: (value: string) =>
                    state.handleToggle('meter', value),
            }),
        },
        {
            serviceName: SERVICE_TITLES.FIREFIGHTING,
            component: components.InfoOnlySection,
            getProps: () => ({
                title:
                    'Подключение к сетям холодного водоснабжения для нужд пожаротушения',
                description:
                    'Укажите параметры пожаротушения в разделе «Информация об объекте»',
            }),
        },
        {
            serviceName: SERVICE_TITLES.TEMPORARY_SUPPLY,
            component: components.InfoOnlySection,
            getProps: () => ({
                title:
                    'Подключение к сетям холодного водоснабжения для временного водоснабжения строительной площадки',
                description:
                    'Укажите планируемую нагрузку водоснабжения в разделе «Информация об объекте»',
            }),
        },
        {
            serviceName: SERVICE_TITLES.OTHER,
            component: components.DialogForm,
            getProps: () => ({}),
        },
    ]
}

