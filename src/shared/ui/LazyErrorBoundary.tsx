/**
 * Специализированный Error Boundary для lazy-компонентов
 * 
 * FSD: shared/ui - переиспользуемый LazyErrorBoundary компонент
 */

import { Suspense, ReactNode } from 'react'
import { ErrorBoundary } from './ErrorBoundary'
import { LoadingFallback } from './LoadingFallback'

interface LazyErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

export function LazyErrorBoundary({
    children,
    fallback,
}: LazyErrorBoundaryProps) {
    return (
        <ErrorBoundary
            fallback={fallback}
            onError={(error) => {
                // Логируем ошибку для мониторинга
                console.error('Lazy component loading error:', error)
                
                // Можно отправить в систему мониторинга
                // trackError('lazy_component_error', error)
            }}
        >
            <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </ErrorBoundary>
    )
}

export default LazyErrorBoundary

