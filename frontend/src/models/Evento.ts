class Evento {
  public id: number | undefined
  public cat_evento_id: number | undefined
  public usuario_id: number
  public filtros: number[]
  public nombre: string | undefined
  public fecha_inicio: Date
  public fecha_fin: Date
  public hipervinculos: string[]
  public imagen: string | File | undefined
  public descripcion: string
  public simbolo_id: number | undefined
  public tipo: string | undefined

  constructor()
  constructor(id: number,
              cat_evento_id: number,
              filtros: number[],
              usuario_id: number,
              nombre: string,
              fecha_inicio: Date,
              fecha_fin: Date,
              hipervinculos: string[],
              imagen: string,
              descripcion: string,
              simbolo: number,
              tipo: string)
  constructor(id?: number,
              cat_evento?: number,
              filtros?: number[],
              usuario_id?: number,
              nombre?: string,
              fecha_inicio?: Date,
              fecha_fin?: Date,
              hipervinculos?: string[],
              imagen?: string,
              descripcion?: string,
              simbolo?: number,
              tipo?: string) {
    this.id = id ?? undefined
    this.cat_evento_id = cat_evento ?? undefined
    this.filtros = filtros ?? []
    this.usuario_id = usuario_id ?? -1
    this.nombre = nombre ?? undefined
    this.fecha_inicio = fecha_inicio ?? new Date()
    this.fecha_fin = fecha_fin ?? new Date()
    this.hipervinculos = hipervinculos ?? []
    this.imagen = imagen ?? undefined
    this.descripcion = descripcion ?? ""
    this.simbolo_id = simbolo ?? undefined
    this.tipo = tipo ?? undefined
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
