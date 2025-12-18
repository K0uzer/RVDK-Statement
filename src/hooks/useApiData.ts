/**
 * Хук для загрузки данных с API
 */

import { useState, useEffect } from 'react'
import { api } from '@/api'
import type { ServiceT, AccordionT } from '@/types'

interface UseApiDataReturn {
    services: ServiceT[]
    requestReasons: AccordionT[]
    loading: boolean
    error: string | null
}

export function useApiData(): UseApiDataReturn {
    const [services, setServices] = useState<ServiceT[]>([])
    const [requestReasons, setRequestReasons] = useState<AccordionT[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                const [servicesData, reasonsData] = await Promise.all([
                    api.getProvidingServices(),
                    api.getRequestReasons(),
                ])

                setServices(servicesData)
                setRequestReasons(reasonsData)
            } catch (err) {
                console.error('Ошибка загрузки данных:', err)
                setError('Не удалось загрузить данные. Попробуйте обновить страницу.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    return {
        services,
        requestReasons,
        loading,
        error,
    }
}

export default useApiData

