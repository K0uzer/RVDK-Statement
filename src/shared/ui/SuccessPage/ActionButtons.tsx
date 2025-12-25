/**
 * Секция с кнопками действий
 */

import { Button } from '@/shared/ui'

interface ActionButtonsProps {
    onNewRequest: () => void
}

export function ActionButtons({ onNewRequest }: ActionButtonsProps) {
    return (
        <div className="space-y-3">
            <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                    // TODO: Переход на страницу отслеживания
                    alert('Функция отслеживания заявки в разработке')
                }}
            >
                Отследить заявку
            </Button>

            <Button className="w-full" onClick={onNewRequest}>
                Подать новую заявку
            </Button>
        </div>
    )
}

