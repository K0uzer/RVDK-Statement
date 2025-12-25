/**
 * API для работы с услугами
 * 
 * FSD: entities/service/api - API методы для услуг
 */

import { api } from '../../request/api'

export const serviceApi = {
    getServices: api.getProvidingServices,
}

