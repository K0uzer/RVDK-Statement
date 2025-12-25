/**
 * Главный компонент приложения
 * 
 * FSD: app - инициализация приложения и роутинг
 */

import { useState } from 'react'
import { InitialScreen } from '@/widgets/initial-screen'
import { RequestFormPage } from '@/pages/request-form'
import type { RequestType } from '@/entities/request'

/**
 * Главный компонент приложения
 * Управляет навигацией между начальным экраном и формой заявки
 */
export function App() {
    const [requestType, setRequestType] = useState<RequestType | null>(null)
    const [isReadyApplication, setIsReadyApplication] = useState(false)

    const handleStartForm = (type: RequestType, ready?: boolean) => {
        setRequestType(type)
        setIsReadyApplication(ready || false)
    }

    const handleReset = () => {
        setRequestType(null)
        setIsReadyApplication(false)
    }

    // Начальный экран выбора типа заявки
    if (!requestType) {
        return <InitialScreen onStartForm={handleStartForm} />
    }

    // Страница формы заявки
    return (
        <RequestFormPage
            requestType={requestType}
            isReadyApplication={isReadyApplication}
            onReset={handleReset}
        />
    )
}

