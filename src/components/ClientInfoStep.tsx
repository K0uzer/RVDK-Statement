/**
 * Шаг 3: Сведения о заявителе
 * Оптимизированная версия ThreeStepOfGroupButton
 */

import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import {
    IndividualClientForm,
    LegalClientForm,
    IPClientForm,
    GovClientForm,
} from './forms'
import type { UpdateFormFn } from '@/utils/form'
import type { ClientType } from '@/types'

interface ClientInfoStepProps {
    updateCommon: UpdateFormFn
    onClientTypeChange: (type: ClientType) => void
    onFormStarted: () => void
}

const CLIENT_TYPE_MAP: Record<string, ClientType> = {
    fiz: 'individual',
    ur: 'legal',
    ind: 'ip',
    gos: 'gov',
}

const TAB_LABELS = {
    fiz: 'Физ. лица',
    ur: 'Юр. лица',
    ind: 'Индивидуальный предпр.',
    gos: 'Орган гос. власти',
} as const

export function ClientInfoStep({
    updateCommon,
    onClientTypeChange,
    onFormStarted,
}: ClientInfoStepProps) {
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
                defaultValue="fiz"
                onValueChange={handleTabChange}
                className="w-64 sm:w-80 lg:w-96 xl:w-110 border-b"
            >
                <TabsList className="w-64 h-10 flex flex-wrap sm:w-80 lg:w-96 xl:w-110">
                    <TabsTrigger className="rounded-none" value="fiz">
                        {TAB_LABELS.fiz}
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none" value="ur">
                        {TAB_LABELS.ur}
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none" value="ind">
                        {TAB_LABELS.ind}
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none" value="gos">
                        {TAB_LABELS.gos}
                    </TabsTrigger>
                </TabsList>

                {/* Физические лица */}
                <TabsContent className="mt-20" value="fiz">
                    <IndividualClientForm
                        updateCommon={updateCommon}
                        onFirstFieldFilled={onFormStarted}
                    />
                </TabsContent>

                {/* Юридические лица */}
                <TabsContent className="mt-20" value="ur">
                    <LegalClientForm
                        updateCommon={updateCommon}
                        onFirstFieldFilled={onFormStarted}
                    />
                </TabsContent>

                {/* Индивидуальные предприниматели */}
                <TabsContent className="mt-20" value="ind">
                    <IPClientForm
                        updateCommon={updateCommon}
                        onFirstFieldFilled={onFormStarted}
                    />
                </TabsContent>

                {/* Государственные органы */}
                <TabsContent className="mt-20" value="gos">
                    <GovClientForm
                        updateCommon={updateCommon}
                        onFirstFieldFilled={onFormStarted}
                    />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ClientInfoStep

