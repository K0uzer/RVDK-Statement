/**
 * Страница успешной отправки заявки
 */

import { Button } from './ui/button'
import { config } from '@/config'
import type { RequestType } from '@/types'

interface SuccessPageProps {
    requestType: RequestType
    requestId?: string
    onNewRequest: () => void
}

export function SuccessPage({
    requestType,
    requestId,
    onNewRequest,
}: SuccessPageProps) {
    const processingDays =
        requestType === 'tu'
            ? config.processing.tu.statusUpdate
            : config.processing.dp.statusUpdate

    const responseDays =
        requestType === 'tu'
            ? config.processing.tu.response
            : config.processing.dp.response

    const requestTypeName =
        requestType === 'tu'
            ? 'технические условия'
            : 'договор о подключении'

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* Иконка успеха */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Заголовок */}
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    Ваша заявка зарегистрирована!
                </h1>

                {/* Номер заявки */}
                {requestId && (
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                        <p className="text-sm text-muted-foreground">
                            Номер заявки
                        </p>
                        <p className="text-xl font-mono font-bold">{requestId}</p>
                    </div>
                )}

                {/* Информация о сроках */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                    <h2 className="font-semibold text-blue-800 mb-2">
                        Что дальше?
                    </h2>
                    <ul className="text-sm text-blue-700 space-y-2">
                        <li className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            <span>
                                Текущий статус заявки будет доступен в течение{' '}
                                <strong>{processingDays} рабочих дней</strong> по
                                ссылке «Отследить заявку»
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            <span>
                                Готовый документ ({requestTypeName}) будет направлен
                                вам в течение <strong>{responseDays} рабочих дней</strong>{' '}
                                с даты подачи заявления
                            </span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            <span>
                                Уведомления о статусе будут приходить на указанный
                                вами адрес электронной почты
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Статусы */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold mb-2">Возможные статусы заявки:</h3>
                    <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            <span>
                                <strong>В работе</strong> — заявка принята и
                                обрабатывается
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span>
                                <strong>Готово</strong> — документ подготовлен и
                                направлен вам
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-red-500"></span>
                            <span>
                                <strong>Отказ</strong> — некомплектность документов
                            </span>
                        </div>
                    </div>
                </div>

                {/* Кнопки */}
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

                {/* Контакты */}
                <div className="mt-8 text-sm text-muted-foreground">
                    <p>
                        При возникновении вопросов обращайтесь в{' '}
                        <strong>Департамент подключений</strong>
                    </p>
                    <p className="mt-1">
                        АО «Ростовводоканал»
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage

