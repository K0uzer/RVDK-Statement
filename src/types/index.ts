/**
 * Типы данных приложения
 */

// ==================== API Types ====================

export interface ServiceT {
    id: number
    name: string
    applyingFor: 0 | 1
}

export interface AccordionT {
    id: number
    name: string
    applyingFor: 0 | 1
}

// ==================== Client Types ====================

export interface FullName {
    firstName: string
    lastName: string
    middleName: string
}

export interface Trustee {
    trustNumber: string
    trusteeName: string
    trustDateFrom: string
    trustDateTo: string
}

export interface IndividualClient {
    fullName: FullName
    birthday: string
    passportSerial: string
    passportNumber: string
    passportIssueDate: string
    issuedBy: string
    inn: string
    snils: string
    address: string
    postalAddress: string
    phoneNumber: string
    email: string
    trustee: Trustee
}

export interface LegalClient {
    nameFull: string
    nameShort: string
    ogrn: string
    inn: string
    factAddress: string
    legalAddress: string
    postalAddress: string
    phoneNumber: string
    email: string
    trustee: Trustee
}

export interface LegalClientIP {
    fullName: FullName
    ogrn: string
    inn: string
    factAddress: string
    legalAddress: string
    postalAddress: string
    phoneNumber: string
    email: string
    trustee: Trustee
}

export interface LegalClientGov {
    nameFull: string
    nameShort: string
    actingBasis: string
    location: string
    postalAddress: string
    phoneNumber: string
    email: string
    trustee: Trustee
}

// ==================== Co-owner Types ====================

export interface CoOwnerIndividual {
    address: string
    fullName: FullName
    cadastralNumber: string
    objectiveAddress: string
}

export interface CoOwnerLegal {
    name: string
    inn: string
    cadastralNumber: string
    objectiveAddress: string
}

// ==================== Objective Info ====================

export interface ObjectiveInfo {
    number: string
    date: string
    name: string
    address: string
    cadastralNumber: string
    area: number
    coOwnerIndividual: CoOwnerIndividual
    coOwnerLegal: CoOwnerLegal
    floors: number
    height: number
    flats: number
    settlers: number
    commissionPlanedOn: string
    dm: number
    supplyVolumePerDay: number
    supplyVolumePerHour: number
    supplyVolumePerSecond: number
    supplyVolumeInnerFirefightingPerSecond: number
    supplyVolumeAutoFirefightingPerSecond: number
    supplyVolumeOuterFirefightingPerSecond: number
    disposalVolumePerDay: number
    disposalVolumePerHour: number
    disposalVolumePerSecond: number
    hasWaterSupply: boolean
    hasWaterDisposal: boolean
    exploitationKind: string
    measuringDeviceLocation: string
    tcNumber: string
    tcDate: string
}

// ==================== Request Form ====================

export interface RequestFormData {
    providingId: number
    providingType: 0 | 1
    requestReasonId: number
    individualClient: IndividualClient | null
    legalClient: LegalClient | null
    legalClientIP: LegalClientIP | null
    legalClientGov: LegalClientGov | null
    objectiveInfo: ObjectiveInfo
}

// ==================== Form State ====================

export type ClientType = 'individual' | 'legal' | 'ip' | 'gov'
export type RequestType = 'tu' | 'dp'

export interface FormState {
    requestType: RequestType
    clientType: ClientType
    selectedServiceId: string
    step: number
}

// ==================== Document Types ====================

export interface DocumentFile {
    type: string
    files: File[]
    required: boolean
}

export type DocumentsMap = Record<string, File[]>

