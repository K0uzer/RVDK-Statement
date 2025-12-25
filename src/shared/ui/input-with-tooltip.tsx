/**
 * Поле ввода с подсказкой
 */

import { InfoIcon } from 'lucide-react'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupTextarea,
} from './input-group'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { cn } from '@/shared/lib/utils'

interface InputWithTooltipProps {
    placeholder: string
    tooltip?: string
    type?: 'text' | 'number' | 'date'
    value?: string | number
    onChange?: (value: string) => void
    className?: string
}

/**
 * Поле ввода с иконкой подсказки
 */
export function InputWithTooltip({
    placeholder,
    tooltip = 'Вспомогательная информация',
    type = 'text',
    value,
    onChange,
    className,
}: InputWithTooltipProps) {
    return (
        <InputGroup className={cn('mt-2', className)}>
            <InputGroupInput
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
            <InputGroupAddon align="inline-end">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <InputGroupButton
                            variant="ghost"
                            aria-label="Info"
                            size="icon-xs"
                        >
                            <InfoIcon className="h-4 w-4" />
                        </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </InputGroupAddon>
        </InputGroup>
    )
}

interface TextareaWithTooltipProps {
    placeholder: string
    value?: string
    onChange?: (value: string) => void
    className?: string
}

/**
 * Текстовое поле без подсказки
 */
export function TextareaField({
    placeholder,
    value,
    onChange,
    className,
}: TextareaWithTooltipProps) {
    return (
        <InputGroup className={cn('mt-2.5', className)}>
            <InputGroupTextarea
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
            />
        </InputGroup>
    )
}

export default InputWithTooltip

