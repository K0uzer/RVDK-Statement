/**
 * Константы для документов
 */

import type { RequestType } from '@/entities/request'

export interface DocumentDefinition {
    id: string
    label: string
    description: string
    forTU: boolean
    forDP: boolean
    requiredForServices?: number[] // ID услуг, для которых документ обязателен
}

/**
 * Перечень документов для загрузки
 */
export const DOCUMENTS: DocumentDefinition[] = [
    {
        id: 'passport',
        label: '1. Копия паспорта или иного документа, удостоверяющего личность',
        description:
            'Для физических лиц, а также документы, подтверждающие полномочия лица',
        forTU: true,
        forDP: true,
    },
    {
        id: 'landDocs',
        label: '2. Правоудостоверяющие документы на земельный участок',
        description:
            'Выписка из ЕГРН (не старше 30 календарных дней) или правоустанавливающие документы',
        forTU: true,
        forDP: true,
    },
    {
        id: 'objectDocs',
        label: '3. Правоудостоверяющие документы на подключаемый объект',
        description:
            'Для ранее построенных и введенных в эксплуатацию объектов',
        forTU: true,
        forDP: true,
    },
    {
        id: 'projectContract',
        label: '4. Договор на подготовку проектной документации',
        description:
            'При обращении застройщиков или иных лиц с договором подряда',
        forTU: true,
        forDP: true,
    },
    {
        id: 'developmentContract',
        label: '5. Договор о комплексном развитии территории',
        description: 'При обращении лиц, заключивших такой договор',
        forTU: true,
        forDP: true,
    },
    {
        id: 'approvalDecision',
        label: '6. Решение о предварительном согласовании предоставления земельного участка',
        description:
            'Для объектов федерального, регионального или местного значения',
        forTU: true,
        forDP: true,
    },
    {
        id: 'situationPlan',
        label: '6. Ситуационный план расположения объекта',
        description: 'С привязкой к территории населенного пункта',
        forTU: false,
        forDP: true,
    },
    {
        id: 'topographicMap',
        label: '7. Топографическая карта земельного участка',
        description:
            'В масштабе 1:500 со всеми наземными и подземными коммуникациями',
        forTU: false,
        forDP: true,
    },
    {
        id: 'waterBalance',
        label: '8. Баланс водопотребления и водоотведения',
        description:
            'В период использования максимальной величины мощности (нагрузки)',
        forTU: false,
        forDP: true,
    },
    {
        id: 'urbanPlan',
        label: '9. Градостроительный план земельного участка',
        description:
            'При подключении водопроводных и канализационных сетей - проект планировки территории',
        forTU: false,
        forDP: true,
    },
    {
        id: 'layoutScheme',
        label: '7. Схема размещения объектов абонента',
        description: 'При запросе на установку прибора учета',
        forTU: true,
        forDP: false,
        requiredForServices: [10], // Только для услуги "Установка прибора учета"
    },
    {
        id: 'networkScheme',
        label: '8. Схема прокладки сетей',
        description: 'При запросе на установку прибора учета',
        forTU: true,
        forDP: false,
        requiredForServices: [10],
    },
]

/**
 * Получить документы для типа заявки
 */
export function getDocumentsForRequestType(
    requestType: RequestType,
    serviceId?: number,
): DocumentDefinition[] {
    return DOCUMENTS.filter((doc) => {
        // Проверяем тип заявки
        const matchesType =
            requestType === 'tu' ? doc.forTU : doc.forDP

        if (!matchesType) return false

        // Если документ требуется только для определенных услуг
        if (doc.requiredForServices && serviceId !== undefined) {
            return doc.requiredForServices.includes(serviceId)
        }

        // Если нет ограничений по услугам — показываем
        return !doc.requiredForServices
    })
}

/**
 * Допустимые форматы файлов
 */
export const ACCEPTED_FILE_TYPES = '.pdf,.jpg,.jpeg,.png,.doc,.docx'

/**
 * Максимальный размер файла (10 МБ)
 */
export const MAX_FILE_SIZE = 10 * 1024 * 1024

