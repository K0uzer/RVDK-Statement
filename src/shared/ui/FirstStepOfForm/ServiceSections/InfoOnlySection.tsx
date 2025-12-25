/**
 * Секции только с информацией (без полей ввода)
 * Используется для пожаротушения и временного водоснабжения
 */

import { Field, FieldLabel } from '@/shared/ui'

interface InfoOnlySectionProps {
    title: string
    description: string
}

export function InfoOnlySection({ title, description }: InfoOnlySectionProps) {
    return (
        <Field className="mt-5 w-full">
            <FieldLabel>{title}</FieldLabel>
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </Field>
    )
}

