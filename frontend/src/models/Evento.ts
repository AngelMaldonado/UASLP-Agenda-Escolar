class Evento {
  public id: number | null
  public cat_evento_id: number | null
  public comunidades: number[]
  public areas: number[]
  public usuario_id: number
  public nombre: string
  public fecha_inicio: Date
  public fecha_fin: Date
  public hipervinculos: string[]
  public imagen: string
  public descripcion: string
  public simbolo: string
  public tipo: string

  constructor()
  constructor(id: number,
              cat_evento_id: number,
              comunidades: number[],
              areas: number[],
              usuario_id: number,
              nombre: string,
              fecha_inicio: Date,
              fecha_fin: Date,
              hipervinculos: string[],
              imagen: string,
              descripcion: string,
              simbolo: string,
              tipo: string)
  constructor(id?: number,
              cat_evento?: number,
              comunidades?: number[],
              areas?: number[],
              usuario_id?: number,
              nombre?: string,
              fecha_inicio?: Date,
              fecha_fin?: Date,
              hipervinculos?: string[],
              imagen?: string,
              descripcion?: string,
              simbolo?: string,
              tipo?: string) {
    this.id = id ?? null
    this.cat_evento_id = cat_evento ?? null
    this.comunidades = comunidades ?? []
    this.areas = areas ?? []
    this.usuario_id = usuario_id ?? -1
    this.nombre = nombre ?? ""
    this.fecha_inicio = fecha_inicio ?? new Date()
    this.fecha_fin = fecha_fin ?? new Date()
    this.hipervinculos = hipervinculos ?? []
    this.imagen = imagen ?? ""
    this.descripcion = descripcion ?? ""
    this.simbolo = simbolo ?? ""
    this.tipo = tipo ?? ""
  }

  static ParseEventosCalendario(eventos: Evento[]) {
    return eventos.map(evento => {
      const {id, ...atributos} = evento
      return {
        id: evento.id?.toString() ?? "",
        start: evento.fecha_inicio.toISOString(),
        end: evento.fecha_fin.toISOString(),
        title: evento.nombre,
        ...atributos,
      }
    })
  }
}

export default Evento
