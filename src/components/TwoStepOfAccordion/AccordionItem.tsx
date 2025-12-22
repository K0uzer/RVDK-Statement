/**
 * Компонент одного элемента аккордеона с основанием обращения
 */

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import type { AccordionT } from '@/types'

interface AccordionItemProps {
    item: AccordionT
    isSelected: boolean
    onSelect: (id: number) => void
}

export function AccordionItemComponent({
    item,
    isSelected,
    onSelect,
}: AccordionItemProps) {
    return (
        <div className="flex items-start gap-3 w-full">
            <Checkbox
                id={`checkbox-${item.id}`}
                checked={isSelected}
                onCheckedChange={() => onSelect(item.id)}
                className="mt-3"
            />

            <Accordion type="single" collapsible className="flex-1">
                <AccordionItem value={`item-${item.id}`}>
                    <AccordionTrigger>
                        <Label
                            htmlFor={`checkbox-${item.id}`}
                            className="text-left flex-1 cursor-pointer font-normal"
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

