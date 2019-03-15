import {isTruthy} from './utils'
import {ValueOf, ReFuncs} from './types'

const functionalRe = mapTextFunctions({
  character: (text: string, {negate}: {negate?: boolean}) =>
    `[${negate ? '^' : ''}${text}]`,
  raw: (text: string) => `${text}`,
  optional: (text: string) => `${text}?`,
  mayRepeat: (text: string, {lazy}: {lazy?: boolean}) =>
    `${text}*${lazy ? '?' : ''}`,
  repeat: (text: string, {lazy}: {lazy?: boolean}) =>
    `${text}+${lazy ? '?' : ''}`,
  group: (text: string, {ignore}: {ignore?: boolean} = {}) =>
    `(${ignore ? '?:' : ''}${text})`,
  beginsWith: (text: string) => `^${text}`,
  endsWith: (text: string) => `${text}$`,
  repeatN: (
    text: string,
    props: {exactly: number} | {atLeast: number; upTo: number},
  ) =>
    'exactly' in props && props.exactly > 0 && Number.isInteger(props.exactly)
      ? `${text}{${props.exactly}}`
      : 'atLeast' in props &&
        props.atLeast > 0 &&
        Number.isInteger(props.atLeast)
      ? `${text}{${props.atLeast},${
          props.upTo && props.upTo >= props.atLeast && Number.isInteger
            ? props.upTo
            : ''
        }}`
      : text,
  lookAhead: (text: string, {negate}: {negate?: boolean}) =>
    `(?${negate ? '!' : '='}${text})`,
  lookBehind: (text: string, {negate}: {negate?: boolean}) =>
    `(?<${negate ? '!' : '='}${text})`,
})
const otherFunctionalRe = {
  union: (text: string[]) => text.join('|'),
  pattern: (
    text: string[],
    {global, caseInsensitive}: {global?: boolean; caseInsensitive?: boolean},
  ) =>
    new RegExp(
      getText(text),
      [global && 'g', caseInsensitive && 'i'].filter(isTruthy).join(''),
    ),
}
export const r = {
  wordBreak: '\\b',
  any: '.',
  whiteSpace: '\\s',
  nonWhiteSpace: '\\S',
  digit: '\\d',
  ...functionalRe,
  ...otherFunctionalRe,
}
export function re<T extends ValueOf<typeof r>>(
  name: keyof typeof r,
  props: T,
  ...children: string[]
) {
  const text = r[name]
  if (!text) throw new Error(`Name not found: ${name}`)
  return typeof text === 'string' ? text : text(children, (props || {}) as any)
}
function getText(text: string[]): string {
  return text.join('')
}
function inter<T>(cb: (text: string, props: T) => string) {
  return (text: string[], props: T) => cb(getText(text), props)
}
function mapTextFunctions<T>(input: T): ReFuncs<T> {
  return Object.entries(input).reduce(
    (a, [key, value]) => {
      a[key as keyof T] = inter(value)
      return a
    },
    {} as ReFuncs<T>,
  )
}
