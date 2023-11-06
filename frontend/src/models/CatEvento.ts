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

export type CatEventoOption = {
  value: string,
  label: string,
  simbolo: string
}

const CatEventos: CatEventoOption[] = [
  {
    value: "Inscripción y pago de programas de posgrado",
    label: "Inscripción y pago de programas de posgrado",
    simbolo: `./public/simbologia/1.webp`,
  },
  {
    value: "Período vacacional de la UASLP",
    label: "Período vacacional de la UASLP",
    simbolo: `./public/simbologia/2.webp`,
  },
  {
    value: "Reunión de inicio de semestre con Profesores de la facultad",
    label: "Reunión de inicio de semestre con Profesores de la facultad",
    simbolo: `./public/simbologia/3.webp`,
  },
  {
    value: "Aplicación del examen general de conocimientos como opción de titulación",
    label: "Aplicación del examen general de conocimientos como opción de titulación",
    simbolo: `./public/simbologia/4.webp`,
  },
  {
    value: "1er reunión de información alumnos de nuevo ingreso",
    label: "1er reunión de información alumnos de nuevo ingreso",
    simbolo: `./public/simbologia/5.webp`,
  },
  {
    value: "Inicio de clases del semestre",
    label: "Inicio de clases del semestre",
    simbolo: `./public/simbologia/6.webp`,
  },
  {
    value: "Periodo de bajas de materias del Departamento Físico Matemáticas",
    label: "Periodo de bajas de materias del Departamento Físico Matemáticas",
    simbolo: `./public/simbologia/7.webp`,
  },
  {
    value: "Reunión del Consejo de Posgrado de la Facultad de Ingeniería",
    label: "Reunión del Consejo de Posgrado de la Facultad de Ingeniería",
    simbolo: `./public/simbologia/8.webp`,
  },
  {
    value: "Período de altas y bajas de materias del DUI",
    label: "Período de altas y bajas de materias del DUI",
    simbolo: `./public/simbologia/9.webp`,
  },
  {
    value: "Sesión ordinaria del H. Consejo Técnico Consultivo",
    label: "Sesión ordinaria del H. Consejo Técnico Consultivo",
    simbolo: `./public/simbologia/10.webp`,
  },
  {
    value: "Inicio de cursos del DUI",
    label: "Inicio de cursos del DUI",
    simbolo: `./public/simbologia/11.webp`,
  },
  {
    value: "Día inhábil",
    label: "Día inhábil",
    simbolo: `./public/simbologia/12.webp`,
  },
];

export default CatEventos
