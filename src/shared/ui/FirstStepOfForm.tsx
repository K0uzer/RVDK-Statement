/**
 * ШАГ 1.1: Детали выбранной услуги подключения
 * 
 * Этот компонент отображает дополнительные опции в зависимости от выбранной услуги.
 * Рендерит соответствующие чекбоксы и поля ввода для каждого типа услуги.
 * 
 * Услуги подключения (согласно ТЗ):
 * 1) Новое подключение (водоснабжение/водоотведение)
 * 2) Подключение для нужд пожаротушения
 * 3) Временное водоснабжение стройплощадки
 * 4) Реконструкция сетей без изменения нагрузки (с указанием диаметра)
 * 5) Подключение к сетям смежного владельца
 * 6) Подключение к внутридворовым сетям
 * 7) Корректировка ТУ (требует номер и дату ТУ)
 * 8) Аннулирование ТУ (требует номер, дату и причину)
 * 9) Вынос сетей (с указанием диаметра)
 * 10) Установка прибора учета
 * 11) Иное (открывает модальное окно)
 * 
 * @module FirstStepOfForm
 */

import { useState, useCallback, useMemo } from 'react'
import DialogForm from './DialogForm'
import type { ServiceT } from '@/entities/service'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import {
    NewConnectionSection,
    AdjacentOwnerSection,
    ReconstructionSection,
    YardNetworksSection,
    TcCorrectionSection,
    TcAnnulmentSection,
    NetworkRemovalSection,
    MeterInstallationSection,
    InfoOnlySection,
} from './FirstStepOfForm/ServiceSections'
import { createServiceSectionsConfig } from '@/shared/config/app-config'

/**
 * Props компонента FirstStepOfForm
 * 
 * @property services - Массив услуг, загруженный с API
 * @property updateCommon - Функция для обновления данных формы
 * @property selectedServiceId - ID выбранной услуги
 */
interface FirstStepOfFormProps {
    services: ServiceT[]
    updateCommon: UpdateFormFn
    selectedServiceId: string
}


/**
 * Компонент деталей услуги подключения
 * 
 * Логика работы:
 * 1. Получает выбранную услугу по ID
 * 2. Рендерит соответствующую секцию с чекбоксами/полями
 * 3. При изменении обновляет данные формы через updateCommon
 */
export function FirstStepOfForm({
    services,
    updateCommon,
    selectedServiceId,
}: FirstStepOfFormProps) {
    /**
     * Объединённое состояние для всех типов чекбоксов
     * Ключи соответствуют категориям услуг
     * Значения — массивы выбранных опций
     */
    const [selections, setSelections] = useState<Record<string, string[]>>({
        newConnection: [],    // Новое подключение
        adjacent: [],         // Смежный владелец
        reconstruction: [],   // Реконструкция
        yard: [],            // Внутридворовые сети
        networkRemoval: [],  // Вынос сетей
        meter: [],           // Приборы учета
    })

    /**
     * Состояние для полей ввода
     * Используются для корректировки/аннулирования ТУ и указания диаметра
     */
    const [tcNumber, setTcNumber] = useState('')   // Номер ТУ
    const [tcDate, setTcDate] = useState('')       // Дата выдачи ТУ
    const [reason, setReason] = useState('')       // Причина (для аннулирования)
    const [diameter, setDiameter] = useState('')   // Диаметр сетей (мм)

    // Находим выбранную услугу по ID
    const selectedService = services.find(
        (s) => s.id === Number(selectedServiceId),
    )

    /**
     * Универсальный обработчик переключения чекбокса
     * 
     * @param category - Категория чекбоксов (newConnection, adjacent и т.д.)
     * @param value - Значение опции
     * @param providingType - Тип подключения (0 = водоснабжение, 1 = водоотведение)
     */
    const handleToggle = useCallback(
        (
            category: string,
            value: string,
            providingType?: 0 | 1,
        ) => {
            setSelections((prev) => {
                const current = prev[category] || []
                // Переключаем: если есть — удаляем, если нет — добавляем
                const updated = current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value]
                return { ...prev, [category]: updated }
            })

            // Обновляем тип подключения в данных формы
            if (providingType !== undefined) {
                updateCommon('providingType', providingType)
            }
        },
        [updateCommon],
    )

    /**
     * Обработчик изменения диаметра сетей
     * Сохраняет значение в objectiveInfo.dm
     */
    const handleDiameterChange = useCallback(
        (value: string) => {
            setDiameter(value)
            updateCommon('objectiveInfo.dm', +value) // Преобразуем в число
        },
        [updateCommon],
    )

    /**
     * Обработчик изменения номера ТУ
     * Используется для корректировки/аннулирования
     */
    const handleTcNumberChange = useCallback(
        (value: string) => {
            setTcNumber(value)
            updateCommon('objectiveInfo.tcNumber', value)
        },
        [updateCommon],
    )

    /**
     * Обработчик изменения даты ТУ
     */
    const handleTcDateChange = useCallback(
        (value: string) => {
            setTcDate(value)
            updateCommon('objectiveInfo.tcDate', value)
        },
        [updateCommon],
    )

    // Если услуга не найдена — ничего не рендерим
    if (!selectedService) return null

    const serviceName = selectedService.name

    // Декларативная конфигурация секций услуг
    const sectionsConfig = useMemo(
        () =>
            createServiceSectionsConfig({
                NewConnectionSection,
                AdjacentOwnerSection,
                ReconstructionSection,
                YardNetworksSection,
                TcCorrectionSection,
                TcAnnulmentSection,
                NetworkRemovalSection,
                MeterInstallationSection,
                InfoOnlySection,
                DialogForm,
            }),
        [],
    )

    // Состояние для генерации пропсов
    const sectionState = useMemo(
        () => ({
            selections,
            tcNumber,
            tcDate,
            reason,
            diameter,
            handleToggle,
            handleDiameterChange,
            handleTcNumberChange,
            handleTcDateChange,
            setReason,
        }),
        [
            selections,
            tcNumber,
            tcDate,
            reason,
            diameter,
            handleToggle,
            handleDiameterChange,
            handleTcNumberChange,
            handleTcDateChange,
        ],
    )

    // Находим конфигурацию для текущей услуги
    const currentSection = sectionsConfig.find(
        (config) => config.serviceName === serviceName,
    )

    // Рендерим компонент на основе конфигурации
    const sectionComponent = currentSection
        ? (() => {
              const SectionComponent = currentSection.component
              const props = currentSection.getProps(sectionState)
              return <SectionComponent {...props} />
          })()
        : null

    return (
        <div className="mt-10 w-64 sm:w-80 lg:w-96 xl:w-110 pb-10 mx-auto text-center">
            {sectionComponent}
        </div>
    )
}

export default FirstStepOfForm

