export enum TipoUsuarioEnum {
  ADMINISTRADOR = "Administrador",
  SECUNDARIO = "Administrador Secundario",
  BECARIO = "Becario"
}

export const TipoUsuarioOptions = (Object.values(TipoUsuarioEnum) as Array<TipoUsuarioEnum>)
  .map((value) => ({
    value: value,
    label: value
  }))
