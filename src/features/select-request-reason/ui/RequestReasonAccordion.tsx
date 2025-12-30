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

    const handleCheckboxChange = (id: number, checked: boolean) => {
        if (checked) {
            // Выбираем новый элемент
            setSelectedItem(id)
            updateCommon('requestReasonId', id)
            setIsSelected(true) // Показываем следующий шаг только при выборе
        } else {
            // Снимаем выбор
            setSelectedItem(null)
            updateCommon('requestReasonId', 0)
            setIsSelected(false) // Скрываем следующий шаг при снятии выбора
        }
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
                    onSelect={(id, checked) => {
                        handleCheckboxChange(id, checked)
                    }}
                />
            ))}
        </div>
    )
}

