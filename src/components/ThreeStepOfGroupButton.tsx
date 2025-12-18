import { Input } from './ui/input'
import { Field, FieldLabel } from './ui/field'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Dispatch, SetStateAction } from 'react'

interface ThreeStepOfGroupButtonProps {
    setQuantityFilledUpInputs: Dispatch<SetStateAction<number>>
    setTabsState: Dispatch<SetStateAction<string>>
    updateCommon: (path: string, value: unknown) => void
    setIsSelectedThreeStep: (value: boolean) => void
}

const ThreeStepOfGroupButton = ({
    setQuantityFilledUpInputs,
    setTabsState,
    updateCommon,
    setIsSelectedThreeStep,
}: ThreeStepOfGroupButtonProps) => {
    return (
        <div className="w-64 text-center mt-10 pb-10 border-b sm:w-80 lg:w-96 xl:w-110 mx-auto">
            <h2 className="text-lg xl:text-xl font-semibold lg:pb-6 xl:pd-7">
                Сведения о лице и контактные данные лиц
            </h2>
            <Tabs
                onClick={(event: any) => setTabsState(event.target.innerHTML)}
                className="w-64 sm:w-80 lg:w-96 xl:w-110 border-b"
            >
                <TabsList className="w-64 h-10 flex flex-wrap sm:w-80 lg:w-96 xl:w-110">
                    <TabsTrigger className="rounded-none" value="fiz">
                        Физ. лица
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none" value="ur">
                        Юр. лица
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none" value="ind">
                        Индивидуальный предпр.
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none" value="gos">
                        Орган гос. власти и само упр.
                    </TabsTrigger>
                </TabsList>

                {/* Для физических лиц */}
                <TabsContent
                    className="mt-20 space-y-4 sm:w-80 lg:w-96 xl:w-110"
                    value="fiz"
                >
                    <Field>
                        <FieldLabel className="mt-5">
                            Ф.И.О. (последнее – при наличии)
                        </FieldLabel>
                        <Input
                            required
                            placeholder="Иванов Иван Иванович"
                            onChange={(e) => {
                                const values = e.target.value.split(' ')
                                updateCommon(
                                    'individualClient.fullName.firstName',
                                    values[0] || '',
                                )
                                updateCommon(
                                    'individualClient.fullName.middleName',
                                    values[1] || '',
                                )
                                updateCommon(
                                    'individualClient.fullName.lastName',
                                    values[2] || '',
                                )
                                setIsSelectedThreeStep(true)
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Дата рождения</FieldLabel>
                        <Input
                            required
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.birthday',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Паспорт серия</FieldLabel>
                        <Input
                            required
                            type="text"
                            placeholder="0000 000000"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.passportSerial',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Паспорт номер</FieldLabel>
                        <Input
                            required
                            type="text"
                            placeholder="000000"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.pasportNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Кем выдан</FieldLabel>
                        <Input
                            required
                            type="text"
                            placeholder="Кем выдан"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.issuedBy',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Дата выдачи паспорта
                        </FieldLabel>
                        <Input
                            required
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.pasportIssueDate',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">ИНН</FieldLabel>
                        <Input
                            required
                            type="text"
                            placeholder="1234567890"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.inn',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">СНИЛС</FieldLabel>
                        <Input
                            required
                            type="text"
                            placeholder="123-456-789 00"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.snils',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Адрес регистрации
                        </FieldLabel>
                        <Input
                            required
                            placeholder="г. Казань, ул. Ленина, д. 1"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.address',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Почтовый адрес</FieldLabel>
                        <Input
                            required
                            placeholder="г. Казань, ул. Ленина, д. 1"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.postalAddress',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Телефон</FieldLabel>
                        <Input
                            required
                            placeholder="+7 999 123-45-67"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.phoneNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Email</FieldLabel>
                        <Input
                            required
                            placeholder="example@mail.ru"
                            type="email"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.email',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Доверенность</FieldLabel>
                        <Input
                            required
                            placeholder="Номер доверенности"
                            type="number"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.trustee.trustNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                        <Input
                            required
                            placeholder="Дата выдачи доверенности"
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.trustee.trustDateFrom',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                        <Input
                            required
                            placeholder="Доверенный представитель"
                            type="text"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.trustee.trusteeName',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                        <Input
                            required
                            placeholder="Срок действия до"
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'individualClient.trustee.trustDateTo',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>
                </TabsContent>

                {/* Для юридических лиц */}
                <TabsContent
                    className="mt-20 space-y-4 sm:w-80 lg:w-96 xl:w-110"
                    value="ur"
                >
                    <Field>
                        <FieldLabel className="mt-5">
                            Полное наименование организации
                        </FieldLabel>
                        <Input
                            required
                            placeholder="ООО «Пример»"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.nameFull',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                                setIsSelectedThreeStep(true)
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Сокращённое наименование организации
                        </FieldLabel>
                        <Input
                            required
                            placeholder="«Пример»"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.nameShort',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">ОГРН</FieldLabel>
                        <Input
                            required
                            placeholder="1234567890123"
                            onChange={(e) => {
                                updateCommon('legalClient.ogrn', e.target.value)
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">ИНН</FieldLabel>
                        <Input
                            required
                            placeholder="1234567890"
                            onChange={(e) => {
                                updateCommon('legalClient.inn', e.target.value)
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Место нахождения
                        </FieldLabel>
                        <Input
                            required
                            placeholder="г. Казань, ул. Ленина, д.1"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.factAddress',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Почтовый адрес</FieldLabel>
                        <Input
                            required
                            placeholder="г. Казань, а/я 10"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.postalAddress',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Телефон</FieldLabel>
                        <Input
                            required
                            placeholder="+7 999 123-45-67"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.phoneNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">E-mail</FieldLabel>
                        <Input
                            required
                            placeholder="info@primer.ru"
                            type="email"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.email',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Номер доверенности
                        </FieldLabel>
                        <Input
                            required
                            placeholder="123456"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.trustee.trustNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Дата выдачи доверенности
                        </FieldLabel>
                        <Input
                            required
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.trustee.trustDateFrom',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Срок действия до
                        </FieldLabel>
                        <Input
                            required
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClient.trustee.trustDateTo',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>
                </TabsContent>

                {/* Для ИП */}
                <TabsContent
                    className="mt-20 space-y-4 sm:w-80 lg:w-96 xl:w-110"
                    value="ind"
                >
                    <Field>
                        <FieldLabel className="mt-5">
                            Наименование ИП
                        </FieldLabel>
                        <Input
                            required
                            placeholder="ИП Иванов Иван Иванович"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.fullName.firstName',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                                setIsSelectedThreeStep(true)
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">ОГРНИП</FieldLabel>
                        <Input
                            placeholder="123456789012345"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.ogrn',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">ИНН</FieldLabel>
                        <Input
                            placeholder="123456789012"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.inn',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Адрес регистрации
                        </FieldLabel>
                        <Input
                            placeholder="г. Казань, ул. Пушкина, д. 9"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.factAddress',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Почтовый адрес</FieldLabel>
                        <Input
                            placeholder="г. Казань, а/я 15"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.postalAddress',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Телефон собственника
                        </FieldLabel>
                        <Input
                            placeholder="+7 999 111-22-33"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.phoneNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Телефон представителя
                        </FieldLabel>
                        <Input
                            onChange={(e) => {
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                            placeholder="+7 999 222-33-44"
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">E-mail</FieldLabel>
                        <Input
                            placeholder="ip@example.ru"
                            type="email"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.email',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Номер доверенности
                        </FieldLabel>
                        <Input
                            placeholder="123456"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.trustee.trustNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Дата выдачи доверенности
                        </FieldLabel>
                        <Input
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.trustee.trustDateFrom',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Срок действия до
                        </FieldLabel>
                        <Input
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientIP.trustee.trustDateTo',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>
                </TabsContent>

                {/* Для государственных органов */}
                <TabsContent
                    className="mt-20 space-y-4 sm:w-80 lg:w-96 xl:w-110"
                    value="gos"
                >
                    <Field>
                        <FieldLabel className="mt-5">
                            Полное наименование органа
                        </FieldLabel>
                        <Input
                            placeholder="Министерство образования Республики Татарстан"
                            onChange={(e) => {
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                                updateCommon(
                                    'legalClientGov.nameFull',
                                    e.target.value,
                                )
                                setIsSelectedThreeStep(true)
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Сокращённое наименование органа
                        </FieldLabel>
                        <Input
                            placeholder="Минобр РТ"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.nameShort',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Реквизиты нормативного акта
                        </FieldLabel>
                        <Input
                            placeholder="Закон РТ №XX, приказ №YY, устав и пр."
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.actingBasis',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Место нахождения
                        </FieldLabel>
                        <Input
                            placeholder="г. Казань, ул. Кремлёвская, д. 10"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.location',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">Почтовый адрес</FieldLabel>
                        <Input
                            placeholder="г. Казань, а/я 45"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.postalAddress',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Контактный телефон
                        </FieldLabel>
                        <Input
                            placeholder="+7 843 123-45-67"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.phoneNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">E-mail</FieldLabel>
                        <Input
                            placeholder="govinfo@tatar.ru"
                            type="email"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.email',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Номер доверенности
                        </FieldLabel>
                        <Input
                            placeholder="123456"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.trustee.trustNumber',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Дата выдачи доверенности
                        </FieldLabel>
                        <Input
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.trustee.trustDateFrom',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>

                    <Field>
                        <FieldLabel className="mt-5">
                            Срок действия до
                        </FieldLabel>
                        <Input
                            type="date"
                            onChange={(e) => {
                                updateCommon(
                                    'legalClientGov.trustee.trustDateTo',
                                    e.target.value,
                                )
                                setQuantityFilledUpInputs((item) => {
                                    if (e.target.value.length) {
                                        return item + 1
                                    } else {
                                        return item - 1
                                    }
                                })
                            }}
                        />
                    </Field>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ThreeStepOfGroupButton
