/**
 * Компонент метки с опциональной звёздочкой обязательности
 */

import { FieldLabel } from '@/shared/ui'

interface RequiredLabelProps {
    children: React.ReactNode
    required?: boolean
    className?: string
}

export function RequiredLabel({
    children,
    required,
    className = '',
}: RequiredLabelProps) {
    return (
        <FieldLabel className={`mt-3 ${className}`}>
            {children}
            {required && <span className="text-red-500 ml-1">*</span>}
        </FieldLabel>
    )
}

