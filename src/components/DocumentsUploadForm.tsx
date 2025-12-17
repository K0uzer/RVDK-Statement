import { useState } from 'react'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Field, FieldLabel, FieldDescription } from './ui/field'
import { Input } from './ui/input'

interface DocumentsUploadFormProps {
    isReadyApplication: boolean
    onSubmit: () => Promise<void>
}

const DocumentsUploadForm = ({
    isReadyApplication,
    onSubmit,
}: DocumentsUploadFormProps) => {
    const [files, setFiles] = useState<{ [key: string]: File[] }>({})
    const [agreedToPersonalData, setAgreedToPersonalData] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFileChange = (docType: string, filesArray: File[]) => {
        setFiles((prev) => ({ ...prev, [docType]: filesArray }))
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

    return (
        <div className="space-y-6 mt-20 w-64 sm:w-80 lg:w-96 xl:w-110">
            {isReadyApplication && (
                <h2 className="text-lg xl:text-xl font-semibold">
                    Перечень документов, которые необходимо прикрепить для
                    отправки заявления
                </h2>
            )}
            {!isReadyApplication && (
                <h2 className="text-lg xl:text-xl font-semibold">
                    Перечень документов, которые необходимо прикрепить для
                    получения ТУ
                </h2>
            )}

            {/* Документ 1 */}
            <Field>
                <FieldLabel>
                    1. Копия паспорта или иного документа, удостоверяющего
                    личность
                </FieldLabel>
                <FieldDescription>
                    Для физических лиц, а также документы, подтверждающие
                    полномочия
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('passport', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 2 */}
            <Field>
                <FieldLabel>
                    2. Копии правоудостоверяющих документов на земельный участок
                </FieldLabel>
                <FieldDescription>
                    Выписка из ЕГРН (не старше 30 календарных дней) или
                    правоустанавливающие документы
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('landDocs', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 3 */}
            <Field>
                <FieldLabel>
                    3. Копии правоудостоверяющих документов на подключаемый
                    объект
                </FieldLabel>
                <FieldDescription>
                    Для ранее построенных и введенных в эксплуатацию объектов
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('objectDocs', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 4 */}
            <Field>
                <FieldLabel>
                    4. Копия договора на подготовку проектной документации
                </FieldLabel>
                <FieldDescription>
                    При обращении застройщиков или иных лиц с договором подряда
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('projectContract', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 5 */}
            <Field>
                <FieldLabel>
                    5. Копия договора о комплексном развитии территории
                </FieldLabel>
                <FieldDescription>
                    При обращении лиц, заключивших такой договор
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('developmentContract', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 6 */}
            <Field>
                <FieldLabel>
                    6. Копия решения о предварительном согласовании
                    предоставления земельного участка
                </FieldLabel>
                <FieldDescription>
                    Для объектов федерального, регионального или местного
                    значения
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('approvalDecision', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 7 */}
            <Field>
                <FieldLabel>7. Схема размещения объектов абонента</FieldLabel>
                <FieldDescription>
                    При запросе на установку прибора учета
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('layoutScheme', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

            {/* Документ 8 */}
            <Field>
                <FieldLabel>8. Схема прокладки сетей</FieldLabel>
                <FieldDescription>
                    При запросе на установку прибора учета
                </FieldDescription>
                <Input
                    multiple
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                        handleFileChange('networkScheme', [
                            ...(e.target.files || []),
                        ])
                    }
                />
            </Field>

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
                        href="/path/to/personal-data-policy.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        Ознакомиться с политикой обработки персональных данных в
                        АО «Ростовводоканал»
                    </a>
                </FieldDescription>
            </Field>

            {/* Кнопка подписания */}
            {isReadyApplication ? (
                <Button
                    onClick={handleSubmit}
                    disabled={!agreedToPersonalData || loading}
                    className="w-full h-auto mt-6 whitespace-normal text-wrap"
                >
                    {loading ? 'Отправка...' : 'Отправить заявление'}
                </Button>
            ) : (
                <Button
                    onClick={handleSubmit}
                    disabled={!agreedToPersonalData || loading}
                    className="w-full h-auto mt-6 whitespace-normal text-wrap"
                >
                    {loading
                        ? 'Отправка...'
                        : 'Подписать заявление с помощью электронной подписи'}
                </Button>
            )}
        </div>
    )
}

export default DocumentsUploadForm
