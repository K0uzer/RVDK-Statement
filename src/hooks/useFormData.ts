/**
 * Хук для управления данными формы заявки
 */

import { useState, useCallback } from 'react'
import { initialFormData, cleanFormData, createUpdateFn } from '@/utils/form'
import type { RequestFormData, ClientType, RequestType } from '@/types'

interface UseFormDataReturn {
    formData: RequestFormData
    updateFormData: (path: string, value: unknown) => void
    resetFormData: () => void
    getCleanedData: () => unknown
    clientType: ClientType
    setClientType: (type: ClientType) => void
    requestType: RequestType
    setRequestType: (type: RequestType) => void
}

export function useFormData(): UseFormDataReturn {
    const [formData, setFormData] = useState<RequestFormData>(initialFormData)
    const [clientType, setClientType] = useState<ClientType>('individual')
    const [requestType, setRequestType] = useState<RequestType>('tu')

    const updateFormData = useCallback(
        createUpdateFn(setFormData),
        [],
    )

    const resetFormData = useCallback(() => {
        setFormData(initialFormData)
        setClientType('individual')
    }, [])

    const getCleanedData = useCallback(() => {
        return cleanFormData(JSON.parse(JSON.stringify(formData)))
    }, [formData])

    return {
        formData,
        updateFormData,
        resetFormData,
        getCleanedData,
        clientType,
        setClientType,
        requestType,
        setRequestType,
    }
}

export default useFormData

