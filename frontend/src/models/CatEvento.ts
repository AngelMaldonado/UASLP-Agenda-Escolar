export default class CatEvento {
  public readonly id: number
  public nombre: string
  public descripcion: string
  public simbolo_id: number

  constructor()
  constructor(id: number, nombre: string, descripcion: string, simbolo_id: number)
  constructor(id?: number, nombre?: string, descripcion?: string, simbolo_id?: number) {
    this.id = id ?? -1
    this.nombre = nombre ?? ""
    this.descripcion = descripcion ?? ""
    this.simbolo_id = simbolo_id ?? -1
  }

  public static obtenOpcionesDesplegable(catalogo: CatEvento[]) {
    return catalogo.map(evento => ({value: evento, label: evento.nombre}))
  }
}

const eventos_catalogo: CatEvento[] = [
  new CatEvento(1, "Inscripción y pago de programas de posgrado", "Descripción del evento 1", 1),
  new CatEvento(2, "Período vacacional de la UASLP", "Descripción del evento 2", 2),
  new CatEvento(3, "Reunión de inicio de semestre con Profesores de la facultad", "Descripción del evento 3", 3),
];

export type CatEventoOption = {
  value: CatEvento,
  label: string,
}

export const eventos_catalogo_opciones: { value: CatEvento | string, label: string }[] =
  eventos_catalogo.map(evento => ({value: evento, label: evento.nombre}))

export function opcion_catalogo(id: number | null): {
  value: CatEvento | string,
  label: string
} | undefined {
  return eventos_catalogo_opciones.find(opcion => {
    if (opcion.value instanceof CatEvento) {
      return opcion.value.id == id
    }
  })
}
