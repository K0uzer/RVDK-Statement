/**
 * Секция со списком возможных статусов заявки
 */

export function StatusListSection() {
    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2">Возможные статусы заявки:</h3>
            <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span>
                        <strong>В работе</strong> — заявка принята и обрабатывается
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <span>
                        <strong>Готово</strong> — документ подготовлен и направлен вам
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
    )
}

