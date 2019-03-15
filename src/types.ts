export type ValueOf<T extends {}> = T[keyof T]
export type ReFuncs<T> = {
  [key in keyof T]: (key: string[], props?: any) => string
}
