type CamelCase<S extends string> =
  S extends `${infer FirstWord}_${infer SecondChar}${infer Remaining}`
    ? `${Lowercase<FirstWord>}${Uppercase<SecondChar>}${CamelCase<Remaining>}`
    : Lowercase<S>

type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : Lowercase<S>

export type Camelize<T> = {
  [key in keyof T as CamelCase<string & key>]: T[key] extends Array<
    infer ArrayItem
  >
    ? ArrayItem extends T[keyof T]
      ? Camelize<ArrayItem>[]
      : T[key]
    : T[key]
}

export type Decamelize<T> = {
  [key in keyof T as SnakeCase<string & key>]: T[key] extends Array<
    infer ArrayItem
  >
    ? ArrayItem extends T[keyof T]
      ? Decamelize<ArrayItem>[]
      : T[key]
    : T[key]
}

export type Options = {
  embedFormId: string
  submitButtonId: string
  paymentOrderId: string
  paymentPointId: string
  iframe3dsId?: string
  inputs?: InputOptions
}

type InputOptions = {
  style?: { borderRadius?: string; borderColor?: string; borderWidth?: string }
  placeholders?: { cardNumber: string; expirationDate: string; cvv: string }
}

export type Events = {
  initialized: void
  loaded: void
  validation: { isValid: boolean; errors: any }
  '3ds:status': any
  submit: {}
  error: {}
  success: {}
}
