class Evento {
  public cat_evento_id: number
  public cat_area_id: number
  public cat_comunidad_id: number
  public usuario_id: number
  public nombre: string
  public fecha_inicio: Date
  public fecha_fin: Date
  public hipervinculos: string[]
  public imagen: string
  public descripcion: string
  public simbolo: string

  constructor()
  constructor(cat_evento_id: number, cat_area_id: number, cat_comunidad_id: number, usuario_id: number, nombre: string, fecha_inicio: Date, fecha_fin: Date, hipervinculos: string[], imagen: string, descripcion: string, simbolo: string)
  constructor(cat_evento_id?: number, cat_area_id?: number, cat_comunidad_id?: number, usuario_id?: number, nombre?: string, fecha_inicio?: Date, fecha_fin?: Date, hipervinculos?: string[], imagen?: string, descripcion?: string, simbolo?: string) {
    this.cat_evento_id = cat_evento_id ?? -1
    this.cat_area_id = cat_area_id ?? -1
    this.cat_comunidad_id = cat_comunidad_id ?? -1
    this.usuario_id = usuario_id ?? -1
    this.nombre = nombre ?? ""
    this.fecha_inicio = fecha_inicio ?? new Date()
    this.fecha_fin = fecha_fin ?? new Date()
    this.hipervinculos = hipervinculos ?? []
    this.imagen = imagen ?? ""
    this.descripcion = descripcion ?? ""
    this.simbolo = simbolo ?? ""
  }
}

export default Evento
