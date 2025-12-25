/**
 * Шаг 4: Информация о подключаемом объекте
 * С условной обязательностью полей по выбранной услуге
 */

import { Dispatch, SetStateAction } from 'react'
import { SERVICE_TITLES } from '@/shared/config/constants'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import {
    BasicInfoSection,
    AdjacentOwnerSection,
    BuildingCharacteristicsSection,
    WaterSupplySection,
    FirefightingSection,
    WaterDisposalSection,
    ConnectionStatusSection,
    TcFieldsSection,
    CommissionDateSection,
} from './ForeStepOfInfoObj/Sections'

interface ObjectInfoFormProps {
    tabsState: string
    updateCommon: UpdateFormFn
    setIsSelectedForeStep: Dispatch<SetStateAction<boolean>>
    selectedServiceName?: string // Название выбранной услуги
}


const ForeStepOfInfoObj = ({
    tabsState,
    updateCommon,
    setIsSelectedForeStep,
    selectedServiceName = '',
}: ObjectInfoFormProps) => {
    // Проверяем, нужно ли показывать поля смежного владельца
    const showAdjacentOwner = selectedServiceName === SERVICE_TITLES.ADJACENT_OWNER

    // Проверяем, нужно ли показывать поля пожаротушения
    const showFirefighting =
        selectedServiceName === SERVICE_TITLES.FIREFIGHTING ||
        selectedServiceName === SERVICE_TITLES.NEW_CONNECTION

    // Проверяем, нужно ли показывать поля ТУ
    const showTcFields =
        selectedServiceName === SERVICE_TITLES.CORRECTION ||
        selectedServiceName === SERVICE_TITLES.ANNULMENT

    return (
        <div className="space-y-3 mt-20 w-64 pb-10 border-b sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg font-semibold text-center">
                Информация о подключаемом объекте
            </h2>

            {/* Технические условия — только для корректировки/аннулирования */}
            {showTcFields && (
                <TcFieldsSection
                    selectedServiceName={selectedServiceName}
                    updateCommon={updateCommon}
                />
            )}

            {/* Основная информация об объекте */}
            <BasicInfoSection
                selectedServiceName={selectedServiceName}
                updateCommon={updateCommon}
                onFirstFieldFilled={() => setIsSelectedForeStep(true)}
            />

            {/* Смежный владелец — только для подпункта 5 */}
            {showAdjacentOwner && (
                <AdjacentOwnerSection
                    tabsState={tabsState}
                    updateCommon={updateCommon}
                />
            )}

            {/* Характеристики здания */}
            <BuildingCharacteristicsSection
                selectedServiceName={selectedServiceName}
                updateCommon={updateCommon}
            />

            {/* Срок ввода в эксплуатацию */}
            <CommissionDateSection
                selectedServiceName={selectedServiceName}
                updateCommon={updateCommon}
            />

            {/* Водоснабжение */}
            <WaterSupplySection
                selectedServiceName={selectedServiceName}
                updateCommon={updateCommon}
            />

            {/* Пожаротушение */}
            {showFirefighting && (
                <FirefightingSection
                    selectedServiceName={selectedServiceName}
                    updateCommon={updateCommon}
                />
            )}

            {/* Водоотведение */}
            <WaterDisposalSection
                selectedServiceName={selectedServiceName}
                updateCommon={updateCommon}
            />

            {/* Признаки подключения */}
            <ConnectionStatusSection updateCommon={updateCommon} />
        </div>
    )
}

export default ForeStepOfInfoObj
