export default class CatEvento {
  public readonly id: number
  public nombre: string
  public descripcion: string
  public simbolo: string

  constructor()
  constructor(id: number, nombre: string, descripcion: string, simbolo: string)
  constructor(id?: number, nombre?: string, descripcion?: string, simbolo?: string) {
    this.id = id ?? -1
    this.nombre = nombre ?? ""
    this.descripcion = descripcion ?? ""
    this.simbolo = simbolo ?? ""
  }

  public static obtenOpcionesDesplegable(catalogo: CatEvento[]) {
    return catalogo.map(evento => ({value: evento, label: evento.nombre}))
  }
}

const eventos_catalogo: CatEvento[] = [
  new CatEvento(1, "Inscripción y pago de programas de posgrado", "Descripción del evento 1", "/simbologia/1.webp"),
  new CatEvento(2, "Período vacacional de la UASLP", "Descripción del evento 2", "/simbologia/2.webp"),
  new CatEvento(3, "Reunión de inicio de semestre con Profesores de la facultad", "Descripción del evento 3", "/simbologia/3.webp"),
  new CatEvento(4, "Aplicación del examen general de conocimientos como opción de titulación", "Descripción del evento 4", "/simbologia/4.webp"),
  new CatEvento(5, "1er reunión de información alumnos de nuevo ingreso", "Descripción del evento 5", "/simbologia/5.webp"),
  new CatEvento(6, "Inicio de clases del semestre", "Descripción del evento 6", "/simbologia/6.webp"),
  new CatEvento(7, "Periodo de bajas de materias del Departamento Físico Matemáticas", "Descripción del evento 7", "/simbologia/7.webp"),
  new CatEvento(8, "Reunión del Consejo de Posgrado de la Facultad de Ingeniería", "Descripción del evento 8", "/simbologia/8.webp"),
  new CatEvento(9, "Período de altas y bajas de materias del DUI", "Descripción del evento 9", "/simbologia/9.webp"),
  new CatEvento(10, "Sesión ordinaria del H. Consejo Técnico Consultivo", "Descripción del evento 10", "/simbologia/10.webp"),
];

export type CatEventoOption = {
  value: CatEvento,
  label: string,
}

export const eventos_catalogo_opciones: { value: CatEvento | string, label: string }[] =
  eventos_catalogo.map(evento => ({value: evento, label: evento.nombre}))

export function obten_evento_catalogo_opcion(id: number | null): {
  value: CatEvento | string,
  label: string
} | undefined {
  return eventos_catalogo_opciones.find(opcion => {
    if (opcion.value instanceof CatEvento) {
      return opcion.value.id == id
    }
  })
}
