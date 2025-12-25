# Feature-Sliced Design (FSD) Architecture

Проект использует архитектуру **Feature-Sliced Design (FSD)** для организации кода.

## 📁 Структура проекта

```
src/
├── app/              # Инициализация приложения, провайдеры, роутинг
├── pages/            # Страницы приложения
├── widgets/          # Крупные самостоятельные блоки интерфейса
├── features/         # Бизнес-логика, интерактивные функции
├── entities/         # Бизнес-сущности (данные, модели)
└── shared/           # Переиспользуемые компоненты, утилиты, константы
```

## 🎯 Слои FSD

### `app/` - Инициализация приложения
- **Назначение**: Инициализация приложения, провайдеры, роутинг
- **Содержимое**:
  - `App.tsx` - главный компонент приложения
  - `providers/` - провайдеры (ErrorBoundary, ServiceWorker)

**Пример использования:**
```typescript
import { App } from '@/app'
```

### `pages/` - Страницы приложения
- **Назначение**: Полноценные страницы приложения
- **Содержимое**:
  - `request-form/` - страница формы заявки

**Пример использования:**
```typescript
import { RequestFormPage } from '@/pages/request-form'
```

### `widgets/` - Крупные блоки интерфейса
- **Назначение**: Крупные самостоятельные блоки интерфейса
- **Содержимое**:
  - `initial-screen/` - начальный экран выбора типа заявки
  - `form-steps/` - шаги формы
  - `success-page/` - страница успешной отправки

**Пример использования:**
```typescript
import { InitialScreen } from '@/widgets/initial-screen'
```

### `features/` - Бизнес-логика
- **Назначение**: Бизнес-функциональность, интерактивные функции
- **Содержимое**:
  - `select-service/` - выбор услуги
  - `select-request-reason/` - выбор основания обращения
  - `fill-client-info/` - заполнение данных заявителя
  - `fill-object-info/` - заполнение информации об объекте
  - `upload-documents/` - загрузка документов
  - `submit-request/` - отправка заявки

**Пример использования:**
```typescript
import { ServiceSelect } from '@/features/select-service'
import { useSubmitRequest } from '@/features/submit-request'
```

### `entities/` - Бизнес-сущности
- **Назначение**: Бизнес-сущности (данные, модели, API)
- **Содержимое**:
  - `request/` - заявки (типы, API, хуки)
  - `service/` - услуги (типы, API, хуки)
  - `client/` - заявители (типы)
  - `document/` - документы (типы)

**Пример использования:**
```typescript
import { useServices } from '@/entities/service'
import { useRequestReasons } from '@/entities/request'
import type { RequestFormData } from '@/entities/request'
```

### `shared/` - Переиспользуемые компоненты
- **Назначение**: Переиспользуемые компоненты, утилиты, константы
- **Содержимое**:
  - `ui/` - UI компоненты (Button, Input, Select и т.д.)
  - `lib/` - утилиты (form-utils, error-handling)
  - `config/` - конфигурации и константы

**Пример использования:**
```typescript
import { Button, Input, Select } from '@/shared/ui'
import { initialFormData, createUpdateFn } from '@/shared/lib/form-utils'
import { config } from '@/shared/config/app-config'
```

## 📦 Импорты

### Рекомендуемые импорты (FSD)
```typescript
// UI компоненты
import { Button, Input, Select } from '@/shared/ui'

// Утилиты
import { initialFormData, createUpdateFn } from '@/shared/lib/form-utils'
import { handleError } from '@/shared/lib/error-handling'

// Конфигурации
import { config } from '@/shared/config/app-config'
import { SERVICE_TITLES } from '@/shared/config/constants'

// Entities
import { useServices } from '@/entities/service'
import { useRequestReasons } from '@/entities/request'
import type { RequestFormData, RequestType } from '@/entities/request'
import type { ClientType } from '@/entities/client'

// Features
import { ServiceSelect } from '@/features/select-service'
import { useSubmitRequest } from '@/features/submit-request'

// Widgets
import { InitialScreen } from '@/widgets/initial-screen'

// Pages
import { RequestFormPage } from '@/pages/request-form'

// App
import { App } from '@/app'
```

### Старые импорты (для обратной совместимости)
Старые алиасы все еще работают, но рекомендуется использовать новые:
```typescript
// Старый способ (не рекомендуется)
import { Button } from '@/components/ui/button'
import { api } from '@/api'
import type { RequestFormData } from '@/types'

// Новый способ (рекомендуется)
import { Button } from '@/shared/ui'
import { api } from '@/entities/request/api'
import type { RequestFormData } from '@/entities/request'
```

## 🔄 Правила импортов

### Разрешенные импорты
- ✅ `shared` → можно импортировать везде
- ✅ `entities` → можно импортировать в `features`, `widgets`, `pages`, `app`
- ✅ `features` → можно импортировать в `widgets`, `pages`, `app`
- ✅ `widgets` → можно импортировать в `pages`, `app`
- ✅ `pages` → можно импортировать в `app`

### Запрещенные импорты
- ❌ `app` → нельзя импортировать никуда
- ❌ `pages` → нельзя импортировать в `widgets`, `features`, `entities`
- ❌ `widgets` → нельзя импортировать в `features`, `entities`
- ❌ `features` → нельзя импортировать в `entities`
- ❌ `entities` → нельзя импортировать в другие `entities`

## 📝 Структура feature/widget/entity

Каждый feature/widget/entity должен иметь следующую структуру:

```
feature-name/
├── ui/              # UI компоненты
│   └── Component.tsx
├── model/           # Бизнес-логика, хуки, типы
│   ├── types.ts
│   └── use-hook.ts
├── api/             # API методы (только для entities)
│   └── index.ts
└── index.ts         # Публичный API (экспорты)
```

## 🎨 Примеры

### Создание нового feature
```typescript
// src/features/new-feature/ui/NewFeature.tsx
import { Button } from '@/shared/ui'
import { useNewFeature } from '../model/use-new-feature'

export function NewFeature() {
    const { data } = useNewFeature()
    return <Button>{data}</Button>
}

// src/features/new-feature/model/use-new-feature.ts
export function useNewFeature() {
    // логика
    return { data: 'example' }
}

// src/features/new-feature/index.ts
export { NewFeature } from './ui/NewFeature'
export { useNewFeature } from './model/use-new-feature'
```

### Создание нового entity
```typescript
// src/entities/new-entity/model/types.ts
export interface NewEntity {
    id: number
    name: string
}

// src/entities/new-entity/api/index.ts
import { api } from '../../request/api'

export const newEntityApi = {
    getEntities: () => api.get('/entities'),
}

// src/entities/new-entity/index.ts
export * from './model'
export * from './api'
```

## 🚀 Преимущества FSD

1. **Масштабируемость** - легко добавлять новые features
2. **Изоляция** - каждый слой изолирован от других
3. **Переиспользование** - shared компоненты доступны везде
4. **Тестируемость** - легко тестировать изолированные слои
5. **Читаемость** - понятная структура проекта

## 📚 Дополнительные ресурсы

- [Feature-Sliced Design](https://feature-sliced.design/)
- [FSD Methodology](https://feature-sliced.design/docs/get-started/overview)

