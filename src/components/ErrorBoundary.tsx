/**
 * Error Boundary для обработки ошибок загрузки lazy-компонентов
 * 
 * Используется для graceful degradation при ошибках загрузки чанков
 */

import { Component, ReactNode } from 'react'
import { Button } from './ui/button'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        this.props.onError?.(error, errorInfo)
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-[200px] flex flex-col items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-red-600 mb-2">
                            Ошибка загрузки компонента
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {this.state.error?.message ||
                                'Произошла ошибка при загрузке компонента. Попробуйте обновить страницу.'}
                        </p>
                        <div className="space-y-2">
                            <Button onClick={this.handleReset} variant="outline">
                                Попробовать снова
                            </Button>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="default"
                            >
                                Обновить страницу
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary

