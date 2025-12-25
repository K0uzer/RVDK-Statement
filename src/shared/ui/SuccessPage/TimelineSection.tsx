/**
 * Секция с информацией о сроках обработки
 */

interface TimelineSectionProps {
    processingDays: number
    responseDays: number
    requestTypeName: string
}

export function TimelineSection({
    processingDays,
    responseDays,
    requestTypeName,
}: TimelineSectionProps) {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <h2 className="font-semibold text-blue-800 mb-2">Что дальше?</h2>
            <ul className="text-sm text-blue-700 space-y-2">
                <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span>
                        Текущий статус заявки будет доступен в течение{' '}
                        <strong>{processingDays} рабочих дней</strong> по ссылке
                        «Отследить заявку»
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span>
                        Готовый документ ({requestTypeName}) будет направлен вам в
                        течение <strong>{responseDays} рабочих дней</strong> с даты
                        подачи заявления
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span>
                        Уведомления о статусе будут приходить на указанный вами адрес
                        электронной почты
                    </span>
                </li>
            </ul>
        </div>
    )
}

