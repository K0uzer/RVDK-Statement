/**
 * Секция для услуги "Корректировка технических условий"
 */

import { FieldLabel } from '@/components/ui/field'
import { InputWithTooltip, TextareaField } from '@/components/ui/input-with-tooltip'

interface TcCorrectionSectionProps {
    tcNumber: string
    tcDate: string
    reason: string
    onTcNumberChange: (value: string) => void
    onTcDateChange: (value: string) => void
    onReasonChange: (value: string) => void
}

export function TcCorrectionSection({
    tcNumber,
    tcDate,
    reason,
    onTcNumberChange,
    onTcDateChange,
    onReasonChange,
}: TcCorrectionSectionProps) {
    return (
        <div className="mt-5 w-full">
            <FieldLabel className="mb-3">
                Корректировка технических условий
            </FieldLabel>
            <InputWithTooltip
                placeholder="Введите номер ТУ"
                tooltip="Номер технических условий для корректировки"
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
                placeholder="В части (укажите что нужно скорректировать)"
                value={reason}
                onChange={onReasonChange}
            />
        </div>
    )
}

