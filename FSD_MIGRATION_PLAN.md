# План миграции компонентов на FSD архитектуру

## 📋 Текущее состояние

### Проблемы:
1. **70+ компонентов** в `src/components/` вместо FSD слоев
2. **Дублирование файлов** (компоненты есть и в `components/`, и в FSD слоях через re-export)
3. **Старые директории** остались с копиями файлов
4. **Хуки и утилиты** в неправильных местах

## 🎯 План миграции (по приоритетам)

### Этап 1: Перемещение UI компонентов (КРИТИЧНО)

#### 1.1. Переместить `src/components/ui/` → `src/shared/ui/`
**Файлов**: 60+
**Сложность**: Высокая (много импортов)
**Риск**: Высокий (shadcn/ui может использовать старые пути)

**Действия**:
1. Переместить все файлы из `components/ui/` в `shared/ui/`
2. Обновить `shared/ui/index.ts` - убрать re-export, использовать прямые экспорты
3. Обновить все импорты `@/components/ui/*` → `@/shared/ui`
4. Обновить `components.json` для shadcn/ui (если нужно)
5. Проверить внутренние импорты между UI компонентами

**Файлы для перемещения**:
```
components/ui/* → shared/ui/*
```

### Этап 2: Перемещение компонентов форм

#### 2.1. Переместить переиспользуемые компоненты форм
**Файлы**:
- `components/forms/FormField.tsx` → `shared/ui/FormField.tsx`
- `components/forms/FullNameField.tsx` → `shared/ui/FullNameField.tsx`

#### 2.2. Переместить формы заявителей
**Файлы**:
- `components/forms/IndividualClientForm.tsx` → `features/fill-client-info/ui/IndividualClientForm.tsx`
- `components/forms/LegalClientForm.tsx` → `features/fill-client-info/ui/LegalClientForm.tsx`
- `components/forms/IPClientForm.tsx` → `features/fill-client-info/ui/IPClientForm.tsx`
- `components/forms/GovClientForm.tsx` → `features/fill-client-info/ui/GovClientForm.tsx`

**Обновить**:
- `features/fill-client-info/ui/ClientInfoForm.tsx` - убрать re-export, использовать прямые импорты
- `features/fill-client-info/index.ts` - обновить экспорты

### Этап 3: Перемещение виджетов

#### 3.1. Переместить `components/FirstStepOfForm/` → `widgets/form-steps/ui/`
**Файлы**:
- `components/FirstStepOfForm.tsx` → `widgets/form-steps/ui/ServiceDetailsStep.tsx`
- `components/FirstStepOfForm/constants.ts` → `widgets/form-steps/ui/constants.ts`
- `components/FirstStepOfForm/ServiceSections/*` → `widgets/form-steps/ui/ServiceSections/*`

**Обновить**:
- `widgets/form-steps/ui/ServiceDetailsStep.tsx` - убрать re-export
- `widgets/form-steps/index.ts` - обновить экспорты

#### 3.2. Переместить `components/SuccessPage/` → `widgets/success-page/ui/`
**Файлы**:
- `components/SuccessPage.tsx` → `widgets/success-page/ui/SuccessPage.tsx`
- `components/SuccessPage/*` → `widgets/success-page/ui/*`

**Обновить**:
- `widgets/success-page/ui/SuccessPageWidget.tsx` - убрать re-export
- `widgets/success-page/index.ts` - обновить экспорты

### Этап 4: Перемещение фич

#### 4.1. Переместить `components/ForeStepOfInfoObj/` → `features/fill-object-info/ui/`
**Файлы**:
- `components/ForeStepOfInfoObj.tsx` → `features/fill-object-info/ui/ObjectInfoForm.tsx`
- `components/ForeStepOfInfoObj/*` → `features/fill-object-info/ui/*`

**Обновить**:
- `features/fill-object-info/ui/ObjectInfoForm.tsx` - убрать re-export
- `features/fill-object-info/index.ts` - обновить экспорты

#### 4.2. Переместить `components/TwoStepOfAccordion/` → `features/select-request-reason/ui/`
**Файлы**:
- `components/TwoStepOfAccordion.tsx` → `features/select-request-reason/ui/RequestReasonAccordion.tsx`
- `components/TwoStepOfAccordion/AccordionItem.tsx` → `features/select-request-reason/ui/AccordionItem.tsx`

**Обновить**:
- `features/select-request-reason/ui/RequestReasonAccordion.tsx` - убрать re-export
- `features/select-request-reason/index.ts` - обновить экспорты

#### 4.3. Переместить `components/DocumentsUploadForm.tsx` → `features/upload-documents/ui/`
**Файлы**:
- `components/DocumentsUploadForm.tsx` → `features/upload-documents/ui/DocumentsUpload.tsx`

**Обновить**:
- `features/upload-documents/ui/DocumentsUpload.tsx` - убрать re-export
- `features/upload-documents/index.ts` - обновить экспорты

#### 4.4. Переместить `components/ClientInfoStep.tsx` → `features/fill-client-info/ui/`
**Файлы**:
- `components/ClientInfoStep.tsx` → `features/fill-client-info/ui/ClientInfoStep.tsx`

**Обновить**:
- `features/fill-client-info/ui/ClientInfoForm.tsx` - убрать re-export, переименовать или объединить
- `features/fill-client-info/index.ts` - обновить экспорты

### Этап 5: Перемещение Error Boundary

#### 5.1. Удалить дубликаты Error Boundary
**Файлы** (уже есть в `shared/ui/`):
- `components/ErrorBoundary.tsx` - удалить (есть `shared/ui/ErrorBoundary.tsx`)
- `components/LazyErrorBoundary.tsx` - удалить (есть `shared/ui/LazyErrorBoundary.tsx`)
- `components/LoadingFallback.tsx` - удалить (есть `shared/ui/LoadingFallback.tsx`)

**Обновить**:
- Все импорты на `@/shared/ui/error-boundary`

### Этап 6: Перемещение хуков и утилит

#### 6.1. Переместить хуки
**Файлы**:
- `hooks/use-mobile.ts` → `shared/lib/hooks/use-mobile.ts`
- `hooks/useApiData.ts` - удалить (уже есть в `entities/request/model/use-api-data.ts`)

**Обновить**:
- `shared/lib/index.ts` - добавить экспорт хуков
- Все импорты `@/hooks/*` → `@/shared/lib/hooks/*`

#### 6.2. Удалить дубликаты утилит
**Файлы**:
- `lib/utils.ts` - удалить (уже есть `shared/lib/utils.ts`)

**Обновить**:
- Все импорты `@/lib/utils` → `@/shared/lib/utils` (уже обновлено через re-export)

### Этап 7: Перемещение API

#### 7.1. Переместить API в entities
**Файлы**:
- `api/index.ts` - разделить на:
  - `entities/request/api/request-api.ts` (методы для заявок)
  - `entities/service/api/service-api.ts` (методы для услуг)

**Обновить**:
- `entities/request/api/index.ts` - обновить экспорты
- `entities/service/api/index.ts` - обновить экспорты
- Все импорты `@/api` → `@/entities/*/api`

### Этап 8: Очистка старых директорий

#### 8.1. Удалить старые директории (после проверки всех импортов)
- `src/config/` - удалить (файлы в `shared/config/`)
- `src/constants/` - удалить (файлы в `shared/config/`)
- `src/types/` - удалить или переместить типы в entities
- `src/utils/` - удалить (файлы в `shared/lib/`)
- `src/api/` - удалить (файлы в `entities/*/api/`)
- `src/components/` - удалить после перемещения всех компонентов
- `src/components/lazy/` - удалить (пустая)
- `src/hooks/` - удалить (файлы в `shared/lib/hooks/`)
- `src/lib/` - удалить (файлы в `shared/lib/`)

### Этап 9: Перемещение файлов из корня

#### 9.1. Переместить файлы
- `App.css` → `app/App.css` или `shared/styles/App.css`
- `polyfills.ts` → `shared/lib/polyfills.ts`

**Обновить**:
- `main.tsx` - обновить импорты

## ⚠️ Важные замечания

1. **shadcn/ui**: Компоненты в `components/ui/` могут быть сгенерированы shadcn/ui. После перемещения нужно:
   - Обновить `components.json` с новыми путями
   - Или оставить `components/ui/` только для shadcn/ui и реэкспортировать через `shared/ui/`

2. **Внутренние импорты**: UI компоненты импортируют друг друга. После перемещения нужно обновить все относительные импорты.

3. **Тестирование**: После каждого этапа нужно:
   - Проверить сборку проекта
   - Проверить работу приложения
   - Проверить линтер

4. **Постепенная миграция**: Можно делать по этапам, не обязательно все сразу.

## 📊 Оценка сложности

- **Этап 1** (UI компоненты): 🔴 Высокая (60+ файлов, много импортов)
- **Этап 2** (Формы): 🟡 Средняя (6 файлов)
- **Этап 3** (Виджеты): 🟡 Средняя (10+ файлов)
- **Этап 4** (Фичи): 🟡 Средняя (15+ файлов)
- **Этап 5** (Error Boundary): 🟢 Низкая (3 файла, удаление)
- **Этап 6** (Хуки/утилиты): 🟢 Низкая (2 файла)
- **Этап 7** (API): 🟡 Средняя (1 файл, разделение)
- **Этап 8** (Очистка): 🟢 Низкая (удаление)
- **Этап 9** (Корневые файлы): 🟢 Низкая (2 файла)

## 🚀 Рекомендуемый порядок выполнения

1. **Начать с простого**: Этапы 5, 6, 9 (удаление дубликатов, хуки, корневые файлы)
2. **Затем среднее**: Этапы 2, 3, 4 (формы, виджеты, фичи)
3. **В конце сложное**: Этап 1 (UI компоненты) и Этап 7 (API)
4. **Финальная очистка**: Этап 8 (удаление старых директорий)
