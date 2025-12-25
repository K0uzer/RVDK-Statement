/**
 * Шаг 3: Сведения о заявителе
 * Оптимизированная версия ThreeStepOfGroupButton
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui'
import {
    IndividualClientForm,
    LegalClientForm,
    IPClientForm,
    GovClientForm,
} from './forms'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import type { ClientType } from '@/entities/client'
import { createClientTabsConfig, CLIENT_TYPE_MAP } from '@/shared/config/app-config'

interface ClientInfoStepProps {
    updateCommon: UpdateFormFn
    onClientTypeChange: (type: ClientType) => void
    onFormStarted: () => void
}

export function ClientInfoStep({
    updateCommon,
    onClientTypeChange,
    onFormStarted,
}: ClientInfoStepProps) {
    // Декларативная конфигурация вкладок
    const tabsConfig = createClientTabsConfig({
        IndividualClientForm,
        LegalClientForm,
        IPClientForm,
        GovClientForm,
    })

    const handleTabChange = (value: string) => {
        const clientType = CLIENT_TYPE_MAP[value]
        if (clientType) {
            onClientTypeChange(clientType)
        }
    }

    return (
        <div className="w-64 text-center mt-10 pb-10 border-b sm:w-80 lg:w-96 xl:w-110">
            <h2 className="text-lg xl:text-xl font-semibold lg:pb-6 xl:pd-7">
                Сведения о лице и контактные данные
            </h2>

            <Tabs
                defaultValue={tabsConfig[0].value}
                onValueChange={handleTabChange}
                className="w-64 sm:w-80 lg:w-96 xl:w-110 border-b"
            >
                <TabsList className="w-64 h-10 flex flex-wrap sm:w-80 lg:w-96 xl:w-110">
                    {tabsConfig.map((tab) => (
                        <TabsTrigger key={tab.value} className="rounded-none" value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {tabsConfig.map((tab) => {
                    const FormComponent = tab.component
                    return (
                        <TabsContent key={tab.value} className="mt-20" value={tab.value}>
                            <FormComponent
                                updateCommon={updateCommon}
                                onFirstFieldFilled={onFormStarted}
                            />
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    )
}

export default ClientInfoStep

