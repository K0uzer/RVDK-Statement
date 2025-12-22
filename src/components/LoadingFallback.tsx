/**
 * Компонент загрузки для Suspense
 * Показывается во время загрузки lazy-компонентов
 */

export function LoadingFallback() {
    return (
        <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Загрузка...</p>
            </div>
        </div>
    )
}

export default LoadingFallback

