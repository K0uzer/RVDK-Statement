/**
 * Шаг загрузки документов (оптимизированная версия)
 */

import { useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Field, FieldLabel, FieldDescription } from './ui/field'
import { Input } from './ui/input'
import {
    getDocumentsForRequestType,
    ACCEPTED_FILE_TYPES,
} from '@/constants/documents'
import type { RequestType, DocumentsMap } from '@/types'

interface DocumentsStepProps {
    requestType: RequestType
    serviceId?: number
    onSubmit: (files: DocumentsMap) => Promise<void>
    isReady?: boolean
}

export function DocumentsStep({
    requestType,
    serviceId,
    onSubmit,
    isReady = false,
}: DocumentsStepProps) {
    const [files, setFiles] = useState<DocumentsMap>({})
    const [agreedToPersonalData, setAgreedToPersonalData] = useState(false)
    const [loading, setLoading] = useState(false)

    const documents = getDocumentsForRequestType(requestType, serviceId)

    const handleFileChange = (docId: string, fileList: FileList | null) => {
        if (fileList) {
            setFiles((prev) => ({
                ...prev,
                [docId]: Array.from(fileList),
            }))
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (!agreedToPersonalData) {
            alert('Необходимо согласие на обработку персональных данных')
            return
        }

        setLoading(true)
        try {
            await onSubmit(files)
        } catch (error) {
            console.error('Ошибка отправки:', error)
        } finally {
            setLoading(false)
        }
    }

    const title = isReady
        ? 'Перечень документов для отправки заявления'
        : requestType === 'tu'
          ? 'Перечень документов для получения ТУ'
          : 'Перечень документов для заключения договора'

    const buttonText = isReady
        ? 'Отправить заявление'
        : 'Подписать заявление с помощью электронной подписи'

    return (
        <div className="space-y-6 mt-20 w-64 sm:w-80 lg:w-96 xl:w-110">
            <h2 className="text-lg xl:text-xl font-semibold">{title}</h2>

            {documents.map((doc) => (
                <Field key={doc.id}>
                    <FieldLabel>{doc.label}</FieldLabel>
                    <FieldDescription>{doc.description}</FieldDescription>
                    <Input
                        multiple
                        type="file"
                        accept={ACCEPTED_FILE_TYPES}
                        onChange={(e) => handleFileChange(doc.id, e.target.files)}
                    />
                    {files[doc.id] && files[doc.id].length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                            Выбрано файлов: {files[doc.id].length}
                        </p>
                    )}
                </Field>
            ))}

            {/* Согласие на обработку персональных данных */}
            <Field>
                <div className="flex items-center gap-3 mt-4">
                    <Checkbox
                        id="personalDataAgreement"
                        checked={agreedToPersonalData}
                        onCheckedChange={(checked) =>
                            setAgreedToPersonalData(checked === true)
                        }
                    />
                    <Label
                        htmlFor="personalDataAgreement"
                        className="cursor-pointer"
                    >
                        Согласие на обработку персональных данных
                    </Label>
                </div>
                <FieldDescription className="mt-2 xl:mt-5">
                    <a
                        href="/personal-data-policy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline hover:text-blue-800"
                    >
                        Ознакомиться с политикой обработки персональных данных
                        в АО «Ростовводоканал»
                    </a>
                </FieldDescription>
            </Field>

            {/* Кнопка отправки */}
            <Button
                onClick={handleSubmit}
                disabled={!agreedToPersonalData || loading}
                className="w-full h-auto mt-6 whitespace-normal text-wrap"
            >
                {loading ? 'Отправка...' : buttonText}
            </Button>
        </div>
    )
}

export default DocumentsStep

