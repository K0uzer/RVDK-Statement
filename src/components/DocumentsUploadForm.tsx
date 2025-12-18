/**
 * Шаг 5: Загрузка документов
 * С разделением списков для ТУ и ДП
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
import type { RequestType } from '@/types'

interface DocumentsUploadFormProps {
    isReadyApplication: boolean
    onSubmit: () => Promise<void>
    requestType?: RequestType
    serviceId?: number
}

const DocumentsUploadForm = ({
    isReadyApplication,
    onSubmit,
    requestType = 'tu',
    serviceId,
}: DocumentsUploadFormProps) => {
    const [files, setFiles] = useState<Record<string, File[]>>({})
    const [agreedToPersonalData, setAgreedToPersonalData] = useState(false)
    const [loading, setLoading] = useState(false)

    // Получаем список документов для текущего типа заявки и услуги
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
            await onSubmit()
            console.log('Документы:', files)
        } catch (error) {
            console.error('Ошибка:', error)
        } finally {
            setLoading(false)
        }
    }

    // Формируем заголовок
    const getTitle = () => {
        if (isReadyApplication) {
            return 'Перечень документов для отправки заявления'
        }
        return requestType === 'tu'
            ? 'Перечень документов для получения ТУ'
            : 'Перечень документов для заключения договора о подключении'
    }

    // Формируем текст кнопки
    const getButtonText = () => {
        if (loading) return 'Отправка...'
        if (isReadyApplication) return 'Отправить заявление'
        return 'Подписать заявление с помощью электронной подписи'
    }

    return (
        <div className="space-y-6 mt-20 w-64 sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg xl:text-xl font-semibold text-center">
                {getTitle()}
            </h2>

            {/* Динамический список документов */}
            {documents.map((doc, index) => (
                <Field key={doc.id}>
                    <FieldLabel>
                        {index + 1}. {doc.label.replace(/^\d+\.\s*/, '')}
                    </FieldLabel>
                    <FieldDescription>{doc.description}</FieldDescription>
                    <Input
                        multiple
                        type="file"
                        accept={ACCEPTED_FILE_TYPES}
                        onChange={(e) => handleFileChange(doc.id, e.target.files)}
                    />
                    {files[doc.id] && files[doc.id].length > 0 && (
                        <p className="text-sm text-green-600 mt-1">
                            ✓ Выбрано файлов: {files[doc.id].length}
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

            {/* Кнопка подписания */}
            <Button
                onClick={handleSubmit}
                disabled={!agreedToPersonalData || loading}
                className="w-full h-auto mt-6 whitespace-normal text-wrap"
            >
                {getButtonText()}
            </Button>
        </div>
    )
}

export default DocumentsUploadForm
