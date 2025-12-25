/**
 * Секция пожаротушения
 * Внутреннее, автоматическое, наружное
 */

import { Input } from '@/shared/ui'
import { Field, FieldDescription } from '@/shared/ui'
import type { UpdateFormFn } from '@/shared/lib/form-utils'
import { RequiredLabel } from './RequiredLabel'
import { isFieldRequired, SERVICE_TITLES } from '@/shared/config/constants'

interface FirefightingSectionProps {
    selectedServiceName: string
    updateCommon: UpdateFormFn
}

export function FirefightingSection({
    selectedServiceName,
    updateCommon,
}: FirefightingSectionProps) {
    return (
        <Field>
            <RequiredLabel required={isFieldRequired(selectedServiceName, 'firefightingInner')}>
                Водоснабжение на нужды пожаротушения (л/с)
            </RequiredLabel>
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm w-28">Внутреннего:</span>
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumeInnerFirefightingPerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="л/с"
                        type="number"
                        min={0}
                        className="flex-1"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm w-28">Автоматического:</span>
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumeAutoFirefightingPerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="л/с"
                        type="number"
                        min={0}
                        className="flex-1"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm w-28">Наружного:</span>
                    <Input
                        onChange={(e) => {
                            updateCommon(
                                'objectiveInfo.supplyVolumeOuterFirefightingPerSecond',
                                +e.target.value,
                            )
                        }}
                        placeholder="л/с"
                        type="number"
                        min={0}
                        className="flex-1"
                    />
                </div>
            </div>
            {selectedServiceName === SERVICE_TITLES.FIREFIGHTING && (
                <FieldDescription className="text-orange-600">
                    Для услуги «Пожаротушение» все поля обязательны и не могут быть равны нулю
                </FieldDescription>
            )}
        </Field>
    )
}

