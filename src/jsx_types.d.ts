declare namespace JSX {
  interface IntrinsicElements {
    character: {negate?: boolean}
    text: {}
    optional: {}
    mayRepeat: {lazy?: boolean}
    repeat: {lazy?: boolean}
    group: {ignore?: boolean}
    beginsWith: {}
    endsWith: {}
    repeatN: {exactly: number} | {atLeast: number; upTo: number}
    lookAhead: {negate?: boolean}
    lookBehind: {negate?: boolean}
    union: {}
    wordBreak: {}
    any: {}
    whiteSpace: {}
    nonWhiteSpace: {}
    digit: {}
  }
}
