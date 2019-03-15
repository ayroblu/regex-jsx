export function isNotNull<T>(t: T | null | undefined): t is T {
  return t !== null && t !== undefined
}
export function isTruthy<T>(t: T | null | undefined | false | ''): t is T {
  return !!t
}
