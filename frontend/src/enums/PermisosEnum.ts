export enum PermisosEnum {
  CREAR_EVENTO = "Crear Evento",
  CREAR_USUARIO = "Crear Usuario",
  CREAR_FILTRO = "Crear Filtro",
  CREAR_SIMBOLO = "Crear Símbolo",

  MODIFICAR_EVENTO = "Modificar Evento",
  MODIFICAR_USUARIO = "Modificar Usuario",
  MODIFICAR_FILTRO = "Modificar Filtro",
  MODIFICAR_SIMBOLO = "Modificar Símbolo",

  ELIMINAR_EVENTO = "Eliminar Evento",
  ELIMINAR_USUARIO = "Eliminar Usuario",
  ELIMINAR_FILTRO = "Eliminar Filtro",
  ELIMINAR_SIMBOLO = "Eliminar Símbolo"
}

export type PermisosOptionsType = { value: PermisosEnum, label: PermisosEnum }

export const PermisosOptions: PermisosOptionsType[] = (Object.values(PermisosEnum) as Array<PermisosEnum>)
  .map((value) => ({
    value: value,
    label: value
  }))
