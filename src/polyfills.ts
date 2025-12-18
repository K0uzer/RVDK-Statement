/**
 * Полифилы для старых браузеров
 * Этот файл импортируется в main.tsx при legacy-сборке
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extend-native */

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

export {}
