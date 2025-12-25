/**
 * Хук для загрузки услуг
 * 
 * FSD: entities/service/model - хуки для работы с услугами
 */

import { useState, useEffect } from 'react'
import { serviceApi } from '../api'
import type { ServiceT } from './types'

interface UseServicesReturn {
    services: ServiceT[]
    loading: boolean
    error: string | null
}

/**
 * Хук для загрузки списка услуг подключения
 */
export function useServices(): UseServicesReturn {
    const [services, setServices] = useState<ServiceT[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        serviceApi
            .getServices()
            .then((data: ServiceT[]) => {
                setServices(data)
                setError(null)
            })
            .catch((err: unknown) => {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки услуг')
                console.error('Ошибка загрузки услуг:', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { services, loading, error }
}

