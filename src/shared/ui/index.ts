/**
 * Экспорт UI компонентов из shared слоя
 * 
 * FSD: shared/ui - переиспользуемые UI компоненты
 */

// ==================== БАЗОВЫЕ UI КОМПОНЕНТЫ (shadcn/ui) ====================
// Все компоненты теперь находятся в shared/ui/
export * from './button'
export * from './field'
export * from './select'
export * from './input'
export * from './checkbox'
export * from './label'
export * from './tabs'
export * from './accordion'
export * from './dialog'
export * from './textarea'
export * from './spinner'
export * from './tooltip'
export * from './service-checkbox'
export * from './input-with-tooltip'
export * from './alert'
export * from './alert-dialog'
export * from './avatar'
export * from './badge'
export * from './breadcrumb'
export * from './button-group'
export * from './calendar'
export * from './card'
export * from './carousel'
export * from './chart'
export * from './collapsible'
export * from './command'
export * from './context-menu'
export * from './drawer'
export * from './dropdown-menu'
export * from './empty'
export * from './form'
export * from './hover-card'
export * from './input-group'
export * from './input-otp'
export * from './item'
export * from './kbd'
export * from './menubar'
export * from './navigation-menu'
export * from './pagination'
export * from './popover'
export * from './progress'
export * from './radio-group'
export * from './resizable'
export * from './scroll-area'
export * from './separator'
export * from './sheet'
export * from './sidebar'
export * from './skeleton'
export * from './slider'
export * from './sonner'
export * from './switch'
export * from './table'
export * from './toggle'
export * from './toggle-group'
export * from './aspect-ratio'

// Re-export для удобства
export { ServiceCheckboxGroup } from './service-checkbox'
export { InputWithTooltip, TextareaField } from './input-with-tooltip'

// ==================== ФОРМЫ ====================
// Экспортируем формы заявителей (FormField из react-hook-form уже экспортирован выше)
export { IndividualClientForm, LegalClientForm, IPClientForm, GovClientForm, FullNameField, TrusteeFields } from './forms'

// ==================== КОМПОНЕНТЫ ФОРМЫ ====================
export { default as ClientInfoStep } from './ClientInfoStep'
export { default as DialogForm } from './DialogForm'
export { default as DocumentsUploadForm } from './DocumentsUploadForm'
export { default as FirstStepOfForm } from './FirstStepOfForm'
export { default as ForeStepOfInfoObj } from './ForeStepOfInfoObj'
export { default as SuccessPage } from './SuccessPage'
export { default as TwoStepOfAccordion } from './TwoStepOfAccordion'

// ==================== ERROR BOUNDARY ====================
export { ErrorBoundary } from './ErrorBoundary'
export { LazyErrorBoundary } from './LazyErrorBoundary'
export { LoadingFallback } from './LoadingFallback'
