export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isUndefined(value: unknown): value is undefined {
  return typeof value === 'undefined'
}
export function isNotUndefined(value: unknown): value is undefined {
  return typeof value !== 'undefined'
}

export function isNull(value: unknown): value is null {
  return value === null
}

export function isArrayNotEmpty<T>(arr: T[] | undefined | null): boolean {
  return arr !== undefined && arr !== null && arr.length > 0
}
export function isArrayEmpty<T>(arr: T[] | undefined | null): boolean {
  return arr !== undefined && arr !== null && arr.length === 0
}

export function isErrorInstance(value: unknown): value is Error {
  return value instanceof Error
}

export function hasObjectValidKeys(obj: object | null | undefined): boolean {
  return obj ? Object.keys(obj).length > 0 : false
}

export function isJSXElement(element: unknown): element is JSX.Element {
  return element !== null && typeof element === 'object' && 'props' in element
}

export function isNotZeroNumber(value: unknown): value is number {
  return typeof value === 'number' && value !== 0
}
export function isZeroNumber(value: unknown): value is number {
  return typeof value === 'number' && value === 0
}
