/**
 * Хук для загрузки данных с API
 * 
 * FSD: entities/request/model - хук для загрузки услуг и оснований обращения
 */

import { useState, useEffect } from 'react'
import { api } from '../api'
import { useServices } from '@/entities/service'
import type { AccordionT } from './types'

interface UseApiDataReturn {
    services: ReturnType<typeof useServices>['services']
    requestReasons: AccordionT[]
    loading: boolean
    error: string | null
}

/**
 * Хук для загрузки данных с API
 * Объединяет загрузку услуг и оснований обращения
 * 
 * @deprecated Используйте отдельные хуки useServices() и useRequestReasons()
 */
export function useApiData(): UseApiDataReturn {
    const { services, loading: servicesLoading, error: servicesError } = useServices()
    const [requestReasons, setRequestReasons] = useState<AccordionT[]>([])
    const [reasonsLoading, setReasonsLoading] = useState(true)
    const [reasonsError, setReasonsError] = useState<string | null>(null)

    useEffect(() => {
        api.getRequestReasons()
            .then((data: AccordionT[]) => {
                setRequestReasons(data)
                setReasonsError(null)
            })
            .catch((err: unknown) => {
                setReasonsError(err instanceof Error ? err.message : 'Ошибка загрузки оснований')
                console.error('Ошибка загрузки оснований:', err)
            })
            .finally(() => {
                setReasonsLoading(false)
            })
    }, [])

    return {
        services,
        requestReasons,
        loading: servicesLoading || reasonsLoading,
        error: servicesError || reasonsError,
    }
}

