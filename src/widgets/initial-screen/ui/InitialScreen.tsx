/**
 * Виджет начального экрана выбора типа заявки
 * 
 * FSD: widgets/initial-screen/ui - виджет начального экрана
 */

import { Button } from '@/shared/ui'
import { INITIAL_SCREEN_CONFIG } from '@/shared/config/initialScreen'
import type { RequestType } from '@/entities/request'

interface InitialScreenProps {
    onStartForm: (type: RequestType, ready?: boolean) => void
}

/**
 * Виджет начального экрана
 * Показывает кнопки для выбора типа заявки (ТУ или ДП)
 */
export function InitialScreen({ onStartForm }: InitialScreenProps) {
    const mainButtons = INITIAL_SCREEN_CONFIG.filter((btn) => !btn.isReady)
    const readyButtons = INITIAL_SCREEN_CONFIG.filter((btn) => btn.isReady)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-3xl font-bold text-center mb-8">
                Портал приёма заявок
                <br />
                <span className="text-lg font-normal text-muted-foreground">
                    АО «Ростовводоканал»
                </span>
            </h1>

            <div className="grid gap-3 w-full max-w-md">
                {/* Основные кнопки — полный цикл заполнения */}
                {mainButtons.map((button) => (
                    <Button
                        key={`${button.requestType}-${button.isReady}`}
                        size="lg"
                        variant={button.variant || 'default'}
                        className="w-full"
                        onClick={() => onStartForm(button.requestType, button.isReady)}
                    >
                        {button.label}
                    </Button>
                ))}

                {/* Кнопки для готовых заявок (только документы) */}
                {readyButtons.length > 0 && (
                    <>
                        <div className="my-4 text-center text-sm text-muted-foreground">
                            Или
                        </div>
                        {readyButtons.map((button) => (
                            <Button
                                key={`${button.requestType}-${button.isReady}`}
                                size="lg"
                                variant={button.variant || 'outline'}
                                className="w-full"
                                onClick={() => onStartForm(button.requestType, button.isReady)}
                            >
                                {button.label}
                            </Button>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

