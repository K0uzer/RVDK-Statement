/**
 * Хук для загрузки оснований обращения
 * 
 * FSD: entities/request/model - хуки для работы с заявками
 */

import { useState, useEffect } from 'react'
import { api } from '../api'
import type { AccordionT } from './types'

interface UseRequestReasonsReturn {
    requestReasons: AccordionT[]
    loading: boolean
    error: string | null
}

/**
 * Хук для загрузки списка оснований обращения
 */
export function useRequestReasons(): UseRequestReasonsReturn {
    const [requestReasons, setRequestReasons] = useState<AccordionT[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        api.getRequestReasons()
            .then((data: AccordionT[]) => {
                setRequestReasons(data)
                setError(null)
            })
            .catch((err: unknown) => {
                setError(err instanceof Error ? err.message : 'Ошибка загрузки оснований')
                console.error('Ошибка загрузки оснований:', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { requestReasons, loading, error }
}

