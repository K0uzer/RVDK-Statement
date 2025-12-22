/**
 * Секция с номером заявки
 */

interface RequestIdSectionProps {
    requestId?: string
}

export function RequestIdSection({ requestId }: RequestIdSectionProps) {
    if (!requestId) return null

    return (
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">Номер заявки</p>
            <p className="text-xl font-mono font-bold">{requestId}</p>
        </div>
    )
}

