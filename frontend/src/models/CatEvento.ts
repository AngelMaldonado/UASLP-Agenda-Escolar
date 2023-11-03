/*class CatEvento {
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
}*/
const CatEventos: { value: string, label: string }[] = [
  {
    value: "Inscripción y pago de programas de posgrado",
    label: "Inscripción y pago de programas de posgrado"
  },
  {
    value: "Período vacacional de la UASLP",
    label: "Período vacacional de la UASLP"
  },
  {
    value: "Reunión de inicio de semestre con Profesores de la facultad",
    label: "Reunión de inicio de semestre con Profesores de la facultad"
  },
  {
    value: "Aplicación del examen general de conocimientos como opción de titulación",
    label: "Aplicación del examen general de conocimientos como opción de titulación"
  },
  {
    value: "1er reunión de información alumnos de nuevo ingreso",
    label: "1er reunión de información alumnos de nuevo ingreso"
  },
  {value: "Inicio de clases del semestre", label: "Inicio de clases del semestre"},
  {
    value: "Periodo de bajas de materias del Departamento Físico Matemáticas",
    label: "Periodo de bajas de materias del Departamento Físico Matemáticas"
  },
  {
    value: "Reunión del Consejo de Posgrado de la Facultad de Ingeniería",
    label: "Reunión del Consejo de Posgrado de la Facultad de Ingeniería"
  },
  {value: "Período de altas y bajas de materias del DUI", label: "Período de altas y bajas de materias del DUI"},
  {
    value: "Sesión ordinaria del H. Consejo Técnico Consultivo",
    label: "Sesión ordinaria del H. Consejo Técnico Consultivo"
  },
  {value: "Inicio de cursos del DUI", label: "Inicio de cursos del DUI"},
  {value: "Día inhábil", label: "Día inhábil"},
  {value: "Inicio de cursos de posgrado", label: "Inicio de cursos de posgrado"},
  // ... Agrega los demás eventos aquí
]

export default CatEventos
