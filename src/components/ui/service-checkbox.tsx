/**
 * Переиспользуемый компонент чекбокса для выбора услуг
 */

import { Checkbox } from './checkbox'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface ServiceCheckboxProps {
    id: string
    label: string
    checked: boolean
    onCheckedChange: () => void
    className?: string
}

/**
 * Стилизованный чекбокс для выбора типа услуги (водоснабжение/водоотведение)
 */
export function ServiceCheckbox({
    id,
    label,
    checked,
    onCheckedChange,
    className,
}: ServiceCheckboxProps) {
    return (
        <div className="flex items-center gap-3">
            <Label
                className={cn(
                    'w-full hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 cursor-pointer transition-colors',
                    'has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50',
                    'dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950',
                    className,
                )}
                htmlFor={id}
            >
                <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={onCheckedChange}
                    className={cn(
                        'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white',
                        'dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700',
                    )}
                />
                {label}
            </Label>
        </div>
    )
}

interface ServiceCheckboxGroupProps {
    title: string
    options: Array<{
        id: string
        label: string
        value: string
        providingType?: 0 | 1
    }>
    selectedValues: string[]
    onToggle: (value: string, providingType?: 0 | 1) => void
    className?: string
}

/**
 * Группа чекбоксов для выбора типов подключения
 */
export function ServiceCheckboxGroup({
    title,
    options,
    selectedValues,
    onToggle,
    className,
}: ServiceCheckboxGroupProps) {
    return (
        <div className={cn('flex flex-col gap-3', className)}>
            {options.map((option) => (
                <ServiceCheckbox
                    key={option.id}
                    id={option.id}
                    label={option.label}
                    checked={selectedValues.includes(option.value)}
                    onCheckedChange={() =>
                        onToggle(option.value, option.providingType)
                    }
                />
            ))}
        </div>
    )
}

export default ServiceCheckbox

