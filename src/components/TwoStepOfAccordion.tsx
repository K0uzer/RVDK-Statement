import { Dispatch, SetStateAction, useState } from 'react'
import { AccordionT } from '@/App'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

interface TwoStepOfAccordionProps {
    accordion: AccordionT[]
    updateCommon: (path: string, value: unknown) => void
    setIsSelectedTwoStep: Dispatch<SetStateAction<boolean>>
}

const TwoStepOfAccordion = ({
    accordion,
    updateCommon,
    setIsSelectedTwoStep,
}: TwoStepOfAccordionProps) => {
    const [selectedItem, setSelectedItem] = useState<number | null>(null)

    const handleCheckboxChange = (id: number) => {
        setSelectedItem((prev) => (prev === id ? null : id))
    }

    return (
        <div className="space-y-3 border-b border-t pt-10 pb-10">
            <h2 className="text-lg xl:text-xl font-semibold">
                Основание обращения
            </h2>
            {accordion.map(({ id, name }) => (
                <div
                    key={id}
                    className="flex items-start gap-3 w-64 sm:w-80 lg:w-96 xl:w-110"
                >
                    <Checkbox
                        id={`checkbox-${id}`}
                        checked={selectedItem === id}
                        onCheckedChange={() => {
                            handleCheckboxChange(id)
                            setIsSelectedTwoStep(
                                (isSelectedTwoStep) => !isSelectedTwoStep,
                            )
                            updateCommon('requestReasonId', id)
                        }}
                        className="mt-3"
                    />

                    <Accordion type="single" collapsible className="flex-1">
                        <AccordionItem value={`item-${id}`}>
                            <AccordionTrigger>
                                <Label
                                    htmlFor={`checkbox-${id}`}
                                    className="text-left flex-1 cursor-pointer font-normal"
                                >
                                    {name.slice(0, 70) + `...`}
                                </Label>
                            </AccordionTrigger>
                            <AccordionContent className="text-left p-3">
                                {name}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}

export default TwoStepOfAccordion
