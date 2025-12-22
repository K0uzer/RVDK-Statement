/**
 * Страница успешной отправки заявки
 */

import { config } from '@/config'
import type { RequestType } from '@/types'
import { SuccessIcon } from './SuccessPage/SuccessIcon'
import { RequestIdSection } from './SuccessPage/RequestIdSection'
import { TimelineSection } from './SuccessPage/TimelineSection'
import { StatusListSection } from './SuccessPage/StatusListSection'
import { ActionButtons } from './SuccessPage/ActionButtons'
import { ContactInfo } from './SuccessPage/ContactInfo'

interface SuccessPageProps {
    requestType: RequestType
    requestId?: string
    onNewRequest: () => void
}

export function SuccessPage({
    requestType,
    requestId,
    onNewRequest,
}: SuccessPageProps) {
    const processingDays =
        requestType === 'tu'
            ? config.processing.tu.statusUpdate
            : config.processing.dp.statusUpdate

    const responseDays =
        requestType === 'tu'
            ? config.processing.tu.response
            : config.processing.dp.response

    const requestTypeName =
        requestType === 'tu'
            ? 'технические условия'
            : 'договор о подключении'

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                <SuccessIcon />

                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    Ваша заявка зарегистрирована!
                </h1>

                <RequestIdSection requestId={requestId} />

                <TimelineSection
                    processingDays={processingDays}
                    responseDays={responseDays}
                    requestTypeName={requestTypeName}
                />

                <StatusListSection />

                <ActionButtons onNewRequest={onNewRequest} />

                <ContactInfo />
            </div>
        </div>
    )
}

export default SuccessPage

