export enum TemaComponente {
  Primario = "primary", PrimarioInverso = "primary-inverse",
  Secundario = "secondary",
  SecundarioInverso = "secondary-inverse",
  Danger = "danger", DangerInverso = "danger-inverse",
  Success = "success", SuccessInverso = "success-inverse",
}

export type ErrorsObject = { [key: string]: Array<string> }
