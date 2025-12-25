/**
 * Компонент выбора основания обращения
 * 
 * FSD: features/select-request-reason/ui - UI компонент для выбора основания
 */

import { Dispatch, SetStateAction, useState } from 'react'
import type { AccordionT } from '@/entities/request'
import { AccordionItemComponent } from '@/shared/ui/TwoStepOfAccordion/AccordionItem'

interface RequestReasonAccordionProps {
    accordion: AccordionT[]
    updateCommon: (path: string, value: unknown) => void
    setIsSelected: Dispatch<SetStateAction<boolean>>
}

/**
 * Компонент выбора основания обращения
 * Позволяет выбрать одно основание из списка
 */
export function RequestReasonAccordion({
    accordion,
    updateCommon,
    setIsSelected,
}: RequestReasonAccordionProps) {
    const [selectedItem, setSelectedItem] = useState<number | null>(null)

    const handleCheckboxChange = (id: number) => {
        setSelectedItem((prev) => (prev === id ? null : id))
    }

    return (
        <div className="space-y-3 border-b border-t pt-10 pb-10 w-64 sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg xl:text-xl font-semibold text-center">
                Основание обращения
            </h2>
            
            {accordion.map((item) => (
                <AccordionItemComponent
                    key={item.id}
                    item={item}
                    isSelected={selectedItem === item.id}
                    onSelect={(id) => {
                        handleCheckboxChange(id)
                        setIsSelected((prev) => !prev)
                        updateCommon('requestReasonId', id)
                    }}
                />
            ))}
        </div>
    )
}

