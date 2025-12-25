# Отчет о соответствии проекта архитектуре FSD

## Дата проверки: 2024

## Найденные нарушения

### 1. Дублирование файлов
- ❌ `src/App.tsx` - старый файл, не используется (используется `src/app/App.tsx`)
- ✅ `src/app/App.tsx` - правильный FSD-совместимый файл

### 2. Импорты из не-FSD директорий

#### 2.1. Импорты из `@/components`
**Нарушение**: Компоненты должны быть в соответствующих FSD слоях (widgets, features, shared/ui)

**Файлы с нарушениями**:
- `src/App.tsx` (старый) - импортирует из `@/components/ClientInfoStep`, `@/components/FirstStepOfForm`, и т.д.
- `src/widgets/success-page/ui/SuccessPageWidget.tsx` - импортирует из `@/components/SuccessPage`
- `src/widgets/form-steps/ui/ServiceDetailsStep.tsx` - импортирует из `@/components/FirstStepOfForm`
- `src/features/upload-documents/ui/DocumentsUpload.tsx` - импортирует из `@/components/DocumentsUploadForm`
- `src/features/fill-object-info/ui/ObjectInfoForm.tsx` - импортирует из `@/components/ForeStepOfInfoObj`
- `src/features/fill-client-info/ui/ClientInfoForm.tsx` - импортирует из `@/components/forms`
- `src/features/select-request-reason/ui/RequestReasonAccordion.tsx` - импортирует из `@/components/TwoStepOfAccordion`

**Решение**: Компоненты уже обернуты в FSD слои, но импорты должны быть обновлены для прямого использования компонентов из слоев.

#### 2.2. Импорты из `@/config`
**Нарушение**: Конфигурация должна быть в `shared/config`

**Файлы с нарушениями**:
- `src/api/index.ts` - импортирует из `@/config`

**Решение**: Переместить `src/config/` в `shared/config/` или обновить импорты.

#### 2.3. Импорты из `@/types`
**Нарушение**: Типы должны быть в `entities/*/model/types` или `shared/types`

**Файлы с нарушениями**:
- `src/api/index.ts` - импортирует `ServiceT`, `AccordionT`, `RequestFormData` из `@/types`
- `src/hooks/useApiData.ts` - импортирует `ServiceT`, `AccordionT` из `@/types`
- `src/config/initialScreen.ts` - импортирует `RequestType` из `@/types`
- `src/config/requestTypes.ts` - импортирует `RequestType` из `@/types`
- `src/config/clientTabs.ts` - импортирует `ClientType` из `@/types`
- `src/utils/form.ts` - импортирует `RequestFormData` из `@/types`
- `src/constants/documents.ts` - импортирует `RequestType` из `@/types`

**Решение**: Переместить типы в соответствующие entity слои или `shared/types`.

#### 2.4. Импорты из `@/utils`
**Нарушение**: Утилиты должны быть в `shared/lib`

**Файлы с нарушениями**:
- `src/components/forms/FormField.tsx` - импортирует `UpdateFormFn` из `@/utils/form`

**Решение**: Переместить `src/utils/` в `shared/lib/` или обновить импорты.

#### 2.5. Импорты из `@/api`
**Нарушение**: API должен быть в `entities/*/api`

**Файлы с нарушениями**:
- `src/hooks/useApiData.ts` - импортирует из `@/api`

**Решение**: API уже частично перемещен в `entities/request/api` и `entities/service/api`. Обновить импорты.

#### 2.6. Импорты из `@/constants`
**Нарушение**: Константы должны быть в `shared/config` или `shared/constants`

**Файлы с нарушениями**:
- `src/components/FirstStepOfForm/constants.ts` - импортирует из `@/constants/services`

**Решение**: Переместить `src/constants/` в `shared/config/` или `shared/constants/`.

#### 2.7. Импорты из `@/hooks`
**Нарушение**: Хуки должны быть в `shared/lib` или в соответствующих слоях

**Файлы с нарушениями**:
- `src/components/ui/sidebar.tsx` - импортирует из `@/hooks/use-mobile`

**Решение**: Переместить хуки в `shared/lib/` или в соответствующие слои.

### 3. Структура директорий

#### 3.1. `src/components/`
**Проблема**: Большая директория с компонентами, которые должны быть в разных FSD слоях

**Текущее состояние**:
- `src/components/ui/` - базовые UI компоненты (должны быть в `shared/ui`)
- `src/components/forms/` - формы заявителей (должны быть в `features/fill-client-info`)
- `src/components/FirstStepOfForm/` - детали услуги (должны быть в `widgets/form-steps`)
- `src/components/TwoStepOfAccordion/` - основание обращения (должны быть в `features/select-request-reason`)
- `src/components/ForeStepOfInfoObj/` - информация об объекте (должны быть в `features/fill-object-info`)
- `src/components/DocumentsUploadForm.tsx` - загрузка документов (должен быть в `features/upload-documents`)
- `src/components/SuccessPage/` - страница успеха (должен быть в `widgets/success-page`)
- `src/components/ClientInfoStep.tsx` - информация о клиенте (должен быть в `features/fill-client-info`)

**Решение**: Компоненты уже обернуты в FSD слои через re-export, но нужно обновить импорты для прямого использования.

#### 3.2. `src/config/`
**Проблема**: Конфигурация должна быть в `shared/config`

**Текущее состояние**: Есть и `src/config/`, и `src/shared/config/`

**Решение**: Объединить или переместить файлы из `src/config/` в `src/shared/config/`.

#### 3.3. `src/constants/`
**Проблема**: Константы должны быть в `shared/config` или `shared/constants`

**Решение**: Переместить в `shared/config/` или `shared/constants/`.

#### 3.4. `src/types/`
**Проблема**: Типы должны быть в `entities/*/model/types` или `shared/types`

**Решение**: Переместить типы в соответствующие entity слои или `shared/types`.

#### 3.5. `src/utils/`
**Проблема**: Утилиты должны быть в `shared/lib`

**Текущее состояние**: Есть и `src/utils/`, и `src/shared/lib/`

**Решение**: Объединить или переместить файлы из `src/utils/` в `src/shared/lib/`.

#### 3.6. `src/api/`
**Проблема**: API должен быть в `entities/*/api`

**Текущее состояние**: Есть и `src/api/`, и `entities/request/api`, `entities/service/api`

**Решение**: Переместить оставшиеся файлы из `src/api/` в соответствующие entity слои.

#### 3.7. `src/hooks/`
**Проблема**: Хуки должны быть в `shared/lib` или в соответствующих слоях

**Решение**: Переместить хуки в `shared/lib/` или в соответствующие слои.

### 4. Пустые директории
- `src/components/lazy/` - пустая директория, можно удалить

## План исправления

### Этап 1: Удаление неиспользуемых файлов
1. ✅ Удалить `src/App.tsx` (старый файл) - **ВЫПОЛНЕНО**
2. ⚠️ Удалить `src/components/lazy/` (пустая директория) - можно удалить вручную

### Этап 2: Перемещение файлов в FSD слои
1. Переместить `src/config/` → `src/shared/config/`
2. Переместить `src/constants/` → `src/shared/config/` или `src/shared/constants/`
3. Переместить типы из `src/types/` в соответствующие entity слои или `src/shared/types/`
4. Переместить `src/utils/` → `src/shared/lib/`
5. Переместить оставшиеся файлы из `src/api/` в соответствующие entity слои
6. Переместить `src/hooks/` → `src/shared/lib/` или в соответствующие слои

### Этап 3: Обновление импортов
1. ✅ Обновить все импорты из `@/components` на импорты из соответствующих FSD слоев - **ВЫПОЛНЕНО** (частично, re-export через FSD слои)
2. ✅ Обновить все импорты из `@/config` на `@/shared/config` - **ВЫПОЛНЕНО** (`src/api/index.ts`)
3. ✅ Обновить все импорты из `@/constants` на `@/shared/config` - **ВЫПОЛНЕНО** (`src/components/FirstStepOfForm/constants.ts`)
4. ✅ Обновить все импорты из `@/types` на импорты из соответствующих entity слоев - **ВЫПОЛНЕНО** (все файлы конфигурации и утилиты)
5. ✅ Обновить все импорты из `@/utils` на `@/shared/lib` - **ВЫПОЛНЕНО** (`src/components/forms/FormField.tsx`)
6. ✅ Обновить все импорты из `@/api` на импорты из соответствующих entity слоев - **ВЫПОЛНЕНО** (`src/hooks/useApiData.ts`)
7. ⚠️ Обновить все импорты из `@/hooks` на `@/shared/lib` - **ЧАСТИЧНО** (остался один импорт в `src/components/ui/sidebar.tsx` - shadcn компонент)

### Этап 4: Обновление алиасов
1. Удалить старые алиасы из `vite.config.ts` (оставить только FSD алиасы)
2. Обновить `components.json` для shadcn/ui (если используется)

### Этап 5: Проверка
1. Проверить, что все импорты корректны
2. Проверить, что проект собирается без ошибок
3. Проверить, что все тесты проходят (если есть)

## Приоритет исправлений

### Высокий приоритет
1. Удаление неиспользуемых файлов
2. Обновление импортов в активных файлах (widgets, features, pages, app)
3. Перемещение конфигурации и констант

### Средний приоритет
1. Перемещение типов
2. Перемещение утилит
3. Перемещение API

### Низкий приоритет
1. Перемещение хуков
2. Обновление алиасов
3. Финальная проверка

