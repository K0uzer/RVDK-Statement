/**
 * Секция для услуги "Аннулирование технических условий"
 */

import { FieldLabel } from '@/shared/ui'
import { InputWithTooltip, TextareaField } from '@/shared/ui'

interface TcAnnulmentSectionProps {
    tcNumber: string
    tcDate: string
    reason: string
    onTcNumberChange: (value: string) => void
    onTcDateChange: (value: string) => void
    onReasonChange: (value: string) => void
}

export function TcAnnulmentSection({
    tcNumber,
    tcDate,
    reason,
    onTcNumberChange,
    onTcDateChange,
    onReasonChange,
}: TcAnnulmentSectionProps) {
    return (
        <div className="mt-5 w-full">
            <FieldLabel className="mb-3">
                Аннулирование технических условий
            </FieldLabel>
            <InputWithTooltip
                placeholder="Введите номер ТУ"
                tooltip="Номер технических условий для аннулирования"
                type="number"
                value={tcNumber}
                onChange={onTcNumberChange}
            />
            <InputWithTooltip
                placeholder="Дата выдачи ТУ"
                tooltip="Дата выдачи технических условий"
                type="date"
                value={tcDate}
                onChange={onTcDateChange}
            />
            <TextareaField
                placeholder="Укажите причину аннулирования"
                value={reason}
                onChange={onReasonChange}
            />
        </div>
    )
}

