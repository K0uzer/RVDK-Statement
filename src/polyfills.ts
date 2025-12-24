/**
 * Полифилы для старых браузеров (поддержка браузеров Windows 7)
 * Этот файл импортируется в main.tsx первым, до всех остальных импортов
 * 
 * Поддерживаемые браузеры на Windows 7:
 * - Internet Explorer 11
 * - Chrome 49-109 (последняя версия для Win7)
 * - Firefox 52-115 (последняя версия для Win7)
 * - Edge Legacy (до перехода на Chromium)
 * 
 * Полифилы добавляются только если функции отсутствуют в браузере
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extend-native */

// ==================== БАЗОВЫЕ ПОЛИФИЛЫ ====================

// Полифил для globalThis (IE11, старые Edge)
if (typeof globalThis === 'undefined') {
    ;(window as any).globalThis = window
}

// Полифил для Array.prototype.at() (Chrome < 92, Firefox < 90, Safari < 15)
if (!(Array.prototype as any).at) {
    ;(Array.prototype as any).at = function (index: number) {
        const len = this.length
        const relativeIndex = index >= 0 ? index : len + index
        return relativeIndex >= 0 && relativeIndex < len
            ? this[relativeIndex]
            : undefined
    }
}

// Полифил для String.prototype.at()
if (!(String.prototype as any).at) {
    ;(String.prototype as any).at = function (index: number) {
        const len = this.length
        const relativeIndex = index >= 0 ? index : len + index
        return relativeIndex >= 0 && relativeIndex < len
            ? this.charAt(relativeIndex)
            : undefined
    }
}

// Полифил для Object.hasOwn() (Chrome < 93, Firefox < 92, Safari < 15.4)
if (!(Object as any).hasOwn) {
    ;(Object as any).hasOwn = function (obj: object, prop: PropertyKey): boolean {
        return Object.prototype.hasOwnProperty.call(obj, prop)
    }
}

// Полифил для structuredClone (Chrome < 98, Firefox < 94, Safari < 15.4)
if (typeof structuredClone === 'undefined') {
    ;(window as any).structuredClone = function <T>(obj: T): T {
        return JSON.parse(JSON.stringify(obj))
    }
}

// Полифил для requestIdleCallback (Safari)
if (typeof requestIdleCallback === 'undefined') {
    ;(window as any).requestIdleCallback = function (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
    ): number {
        const start = Date.now()
        return window.setTimeout(() => {
            callback({
                didTimeout: false,
                timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
            })
        }, options?.timeout ?? 1) as unknown as number
    }

    ;(window as any).cancelIdleCallback = function (id: number): void {
        clearTimeout(id)
    }
}

// ==================== REQUESTANIMATIONFRAME (для анимаций) ====================

// requestAnimationFrame полифил для IE9 и старых браузеров
if (typeof requestAnimationFrame === 'undefined') {
    ;(window as any).requestAnimationFrame = function (callback: FrameRequestCallback): number {
        return window.setTimeout(() => {
            callback(Date.now())
        }, 1000 / 60) as unknown as number
    }

    ;(window as any).cancelAnimationFrame = function (id: number): void {
        clearTimeout(id)
    }
}

// ==================== MATCHMEDIA (для адаптивности) ====================

// matchMedia полифил для IE9 и старых браузеров
if (typeof window.matchMedia === 'undefined') {
    ;(window as any).matchMedia = function (query: string): MediaQueryList {
        const mediaQueryList: any = {
            matches: false,
            media: query,
            onchange: null,
            addListener: function () {},
            removeListener: function () {},
            addEventListener: function () {},
            removeEventListener: function () {},
            dispatchEvent: function () {
                return false
            },
        }

        // Простая проверка медиа-запросов
        if (query.includes('max-width')) {
            const match = query.match(/max-width:\s*(\d+)px/)
            if (match) {
                const maxWidth = parseInt(match[1], 10)
                mediaQueryList.matches = window.innerWidth <= maxWidth
            }
        } else if (query.includes('min-width')) {
            const match = query.match(/min-width:\s*(\d+)px/)
            if (match) {
                const minWidth = parseInt(match[1], 10)
                mediaQueryList.matches = window.innerWidth >= minWidth
            }
        }

        // Обновляем при изменении размера окна
        const updateMatches = () => {
            if (query.includes('max-width')) {
                const match = query.match(/max-width:\s*(\d+)px/)
                if (match) {
                    const maxWidth = parseInt(match[1], 10)
                    const newMatches = window.innerWidth <= maxWidth
                    if (newMatches !== mediaQueryList.matches) {
                        mediaQueryList.matches = newMatches
                        if (mediaQueryList.onchange) {
                            mediaQueryList.onchange()
                        }
                    }
                }
            } else if (query.includes('min-width')) {
                const match = query.match(/min-width:\s*(\d+)px/)
                if (match) {
                    const minWidth = parseInt(match[1], 10)
                    const newMatches = window.innerWidth >= minWidth
                    if (newMatches !== mediaQueryList.matches) {
                        mediaQueryList.matches = newMatches
                        if (mediaQueryList.onchange) {
                            mediaQueryList.onchange()
                        }
                    }
                }
            }
        }

        window.addEventListener('resize', updateMatches)

        return mediaQueryList
    }
}

// ==================== DOM API ПОЛИФИЛЫ ====================

// Element.matches() полифил для IE9
if (!Element.prototype.matches) {
    Element.prototype.matches =
        (Element.prototype as any).matchesSelector ||
        (Element.prototype as any).webkitMatchesSelector ||
        (Element.prototype as any).mozMatchesSelector ||
        (Element.prototype as any).msMatchesSelector ||
        function (this: Element, selector: string): boolean {
            const doc = (this as any).document || this.ownerDocument
            const matches = doc.querySelectorAll(selector)
            let i = matches.length
            while (--i >= 0 && matches.item(i) !== this) {
                // continue
            }
            return i > -1
        }
}

// Element.closest() полифил для IE11
if (!Element.prototype.closest) {
    Element.prototype.closest = function (selector: string): Element | null {
        let element: Element | null = this
        while (element && element.nodeType === 1) {
            if (element.matches(selector)) {
                return element
            }
            element = element.parentElement
        }
        return null
    }
}

// NodeList.forEach() полифил для IE11
if (!NodeList.prototype.forEach) {
    ;(NodeList.prototype as any).forEach = function (
        callback: (value: Node, index: number, list: NodeList) => void,
        thisArg?: any,
    ): void {
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this)
        }
    }
}

// HTMLCollection.forEach() полифил для IE11
if (!(HTMLCollection.prototype as any).forEach) {
    ;(HTMLCollection.prototype as any).forEach = function (
        callback: (value: Element, index: number, list: HTMLCollection) => void,
        thisArg?: any,
    ): void {
        for (let i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this)
        }
    }
}

// ==================== CUSTOM EVENT (для событий) ====================

// CustomEvent полифил для IE11
if (typeof CustomEvent !== 'function') {
    ;(window as any).CustomEvent = function <T = any>(
        type: string,
        params?: CustomEventInit<T>,
    ): CustomEvent<T> {
        params = params || { bubbles: false, cancelable: false, detail: undefined }
        const evt = document.createEvent('CustomEvent')
        evt.initCustomEvent(
            type,
            params.bubbles || false,
            params.cancelable || false,
            params.detail,
        )
        return evt as any
    }
    ;(window as any).CustomEvent.prototype = Object.create(Event.prototype)
}

// ==================== CLASS LIST (для работы с классами) ====================

// classList полифил для IE9 (базовая версия)
if (!document.createElement('div').classList) {
    ;(function () {
        const prototype = Element.prototype as any
        const descriptor = Object.getOwnPropertyDescriptor(prototype, 'classList')
        if (!descriptor) {
            Object.defineProperty(prototype, 'classList', {
                get: function () {
                    const self = this
                    const update = function (fn: Function) {
                        return function (value: string) {
                            const classes = self.className.split(/\s+/g)
                            const index = classes.indexOf(value)
                            fn(classes, value, index)
                            self.className = classes.join(' ')
                        }
                    }
                    return {
                        add: update(function (classes: string[], value: string, index: number) {
                            if (index === -1) classes.push(value)
                        }),
                        remove: update(function (classes: string[], _value: string, index: number) {
                            if (index > -1) classes.splice(index, 1)
                        }),
                        toggle: update(function (classes: string[], value: string, index: number) {
                            if (index === -1) classes.push(value)
                            else classes.splice(index, 1)
                        }),
                        contains: function (value: string) {
                            return self.className.split(/\s+/g).indexOf(value) > -1
                        },
                    }
                },
            })
        }
    })()
}

// ==================== DATASET (для data-атрибутов) ====================

// dataset полифил для IE11
if (!document.createElement('div').dataset) {
    ;(function () {
        const prototype = Element.prototype as any
        Object.defineProperty(prototype, 'dataset', {
            get: function () {
                const element = this
                const map: { [key: string]: string } = {}
                const attributes = element.attributes
                for (let i = 0; i < attributes.length; i++) {
                    const attr = attributes[i]
                    if (attr.name.indexOf('data-') === 0) {
                        const key = attr.name.substr(5).replace(/-([a-z])/g, function (g: string) {
                            return g[1].toUpperCase()
                        })
                        map[key] = attr.value
                    }
                }
                return map
            },
        })
    })()
}

// ==================== ARRAY.FROM ДЛЯ NODELIST ====================

// Убеждаемся, что Array.from работает с NodeList (если полифил неполный)
if (Array.from) {
    const originalFrom = Array.from
    const testNodeList = document.querySelectorAll('*')
    try {
        // Проверяем, работает ли Array.from с NodeList
        Array.from(testNodeList)
    } catch (e) {
        // Если не работает, заменяем
        Array.from = function <T>(arrayLike: ArrayLike<T> | Iterable<T>): T[] {
            if (arrayLike instanceof NodeList || arrayLike instanceof HTMLCollection) {
                const result: any[] = []
                for (let i = 0; i < arrayLike.length; i++) {
                    result.push(arrayLike[i])
                }
                return result as T[]
            }
            return originalFrom(arrayLike)
        }
    }
}

export {}
