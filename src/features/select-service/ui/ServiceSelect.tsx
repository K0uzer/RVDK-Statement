/**
 * Компонент выбора услуги
 * 
 * FSD: features/select-service/ui - UI компонент для выбора услуги
 */

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui'
import { Field, FieldDescription, FieldLabel } from '@/shared/ui'
import type { ServiceT } from '@/entities/service'

interface ServiceSelectProps {
    services: ServiceT[]
    selectedServiceId: string
    onSelect: (serviceId: string) => void
}

/**
 * Компонент выбора услуги подключения
 */
export function ServiceSelect({
    services,
    selectedServiceId,
    onSelect,
}: ServiceSelectProps) {
    return (
        <Field>
            <FieldLabel>Услуга подключения</FieldLabel>
            <Select value={selectedServiceId} onValueChange={onSelect}>
                <SelectTrigger>
                    <SelectValue placeholder="Выберите услугу" />
                </SelectTrigger>
                <SelectContent className="w-64 sm:w-80 lg:w-96 xl:w-110">
                    {services.map(({ name, id }) => (
                        <SelectItem key={id} value={`${id}`}>
                            {name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <FieldDescription>
                Выберите необходимую вам услугу
            </FieldDescription>
        </Field>
    )
}

