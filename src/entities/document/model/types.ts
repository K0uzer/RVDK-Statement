/**
 * Типы для сущности Document (Документ)
 * 
 * FSD: entities/document/model - типы и модели документа
 */

import type { RequestType } from '../../request/model/types'

export type { RequestType }

/**
 * Определение документа для загрузки
 */
export interface DocumentDefinition {
    id: string
    label: string
    required: boolean
    requestType: RequestType
    description?: string
}
