/**
 * Компонент одного элемента аккордеона с основанием обращения
 */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui'
import { Checkbox } from '@/shared/ui'
import { Label } from '@/shared/ui'
import type { AccordionT } from '@/entities/request'

interface AccordionItemProps {
    item: AccordionT
    isSelected: boolean
    onSelect: (id: number, checked: boolean) => void
}

export function AccordionItemComponent({
    item,
    isSelected,
    onSelect,
}: AccordionItemProps) {
    const handleCheckboxChange = (checked: boolean) => {
        // Вызываем onSelect только при реальном изменении состояния чекбокса
        // Это предотвращает срабатывание при разворачивании аккордеона
        if (checked !== isSelected) {
            onSelect(item.id, checked)
        }
    }

    const handleLabelClick = () => {
        // При клике на label выбираем чекбокс
        // НЕ предотвращаем разворачивание аккордеона - пусть он разворачивается
        // Программно кликаем по чекбоксу
        const checkbox = document.getElementById(`checkbox-${item.id}`) as HTMLButtonElement
        if (checkbox) {
            checkbox.click()
        }
        // НЕ вызываем preventDefault/stopPropagation, чтобы аккордеон мог развернуться
    }

    return (
        <div className="flex items-start gap-3 w-full">
            <Checkbox
                id={`checkbox-${item.id}`}
                checked={isSelected}
                onCheckedChange={handleCheckboxChange}
                className="mt-3"
            />

            <Accordion type="single" collapsible className="flex-1">
                <AccordionItem value={`item-${item.id}`}>
                    <AccordionTrigger
                        className="hover:no-underline"
                    >
                        <Label
                            htmlFor={`checkbox-${item.id}`}
                            className="text-left flex-1 cursor-pointer font-normal"
                            onClick={handleLabelClick}
                        >
                            {item.name.slice(0, 70) + '...'}
                        </Label>
                    </AccordionTrigger>
                    <AccordionContent className="text-left p-3">
                        {item.name}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

