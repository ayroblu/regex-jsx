type ReProps<T> = {
  children?: {}
} & T
declare namespace JSX {
  interface IntrinsicElements {
    character: ReProps<{negate?: boolean}>
    raw: ReProps<{}>
    optional: ReProps<{}>
    mayRepeat: ReProps<{lazy?: boolean}>
    repeat: ReProps<{lazy?: boolean}>
    group: ReProps<{ignore?: boolean}>
    beginsWith: ReProps<{}>
    endsWith: ReProps<{}>
    repeatN: ReProps<{exactly: number} | {atLeast: number; upTo: number}>
    lookAhead: ReProps<{negate?: boolean}>
    lookBehind: ReProps<{negate?: boolean}>
    union: ReProps<{}>
    wordBreak: {}
    any: {}
    whiteSpace: {}
    nonWhiteSpace: {}
    digit: {}
  }
}
