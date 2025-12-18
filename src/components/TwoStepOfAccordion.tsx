/**
 * ШАГ 2: Выбор основания обращения
 * 
 * Компонент отображает список оснований обращения в виде аккордеона с чекбоксами.
 * Пользователь может выбрать только одно основание.
 * 
 * Основания обращения (согласно ТЗ):
 * а) правообладатель земельного участка и (или) подключаемого объекта
 * б) лицо с разрешением на использование земель/сервитутом
 * в) лицо с договором о комплексном развитии территории
 * г) федеральный/региональный орган, юр.лицо с решением о предварительном согласовании
 * д) застройщик/подрядчик по договору проектной документации (только для ТУ)
 * 
 * @module TwoStepOfAccordion
 */

import { Dispatch, SetStateAction, useState } from 'react'
import type { AccordionT } from '@/types'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from './ui/accordion'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

/**
 * Props компонента TwoStepOfAccordion
 * 
 * @property accordion - Массив оснований обращения, загруженный с API
 * @property updateCommon - Функция обновления данных формы
 * @property setIsSelectedTwoStep - Callback для перехода к следующему шагу
 */
interface TwoStepOfAccordionProps {
    accordion: AccordionT[]
    updateCommon: (path: string, value: unknown) => void
    setIsSelectedTwoStep: Dispatch<SetStateAction<boolean>>
}

/**
 * Компонент выбора основания обращения
 * 
 * Особенности:
 * - Только один элемент может быть выбран (radio-подобное поведение)
 * - Аккордеон позволяет раскрыть полный текст основания
 * - При выборе обновляется requestReasonId в данных формы
 */
const TwoStepOfAccordion = ({
    accordion,
    updateCommon,
    setIsSelectedTwoStep,
}: TwoStepOfAccordionProps) => {
    /**
     * ID выбранного основания обращения
     * null = ничего не выбрано
     */
    const [selectedItem, setSelectedItem] = useState<number | null>(null)

    /**
     * Обработчик переключения чекбокса
     * Реализует radio-подобное поведение: при повторном клике снимает выделение
     * 
     * @param id - ID основания обращения
     */
    const handleCheckboxChange = (id: number) => {
        setSelectedItem((prev) => (prev === id ? null : id))
    }

    return (
        <div className="space-y-3 border-b border-t pt-10 pb-10 w-64 sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg xl:text-xl font-semibold text-center">
                Основание обращения
            </h2>
            
            {/* Список оснований обращения */}
            {accordion.map(({ id, name }) => (
                <div
                    key={id}
                    className="flex items-start gap-3 w-full"
                >
                    {/* Чекбокс для выбора основания */}
                    <Checkbox
                        id={`checkbox-${id}`}
                        checked={selectedItem === id}
                        onCheckedChange={() => {
                            handleCheckboxChange(id)
                            // Уведомляем родительский компонент о выборе
                            setIsSelectedTwoStep(
                                (isSelectedTwoStep) => !isSelectedTwoStep,
                            )
                            // Обновляем ID основания в данных формы
                            updateCommon('requestReasonId', id)
                        }}
                        className="mt-3"
                    />

                    {/* Аккордеон с текстом основания */}
                    <Accordion type="single" collapsible className="flex-1">
                        <AccordionItem value={`item-${id}`}>
                            <AccordionTrigger>
                                {/* Краткий текст (первые 70 символов) */}
                                <Label
                                    htmlFor={`checkbox-${id}`}
                                    className="text-left flex-1 cursor-pointer font-normal"
                                >
                                    {name.slice(0, 70) + `...`}
                                </Label>
                            </AccordionTrigger>
                            {/* Полный текст основания при раскрытии */}
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
