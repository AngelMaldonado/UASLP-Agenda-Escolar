class Evento {
    public readonly cat_evento_id: number
    public usuario_id: number
    public nombre: string
    public fecha_inicio: Date
    public fecha_fin: Date
    public hipervinculos: string[]
    public imagen: string
    public descripcion: string
    public ruta: string

  
    constructor()
    constructor(cat_evento_id: number, usuario_id: number, nombre: string, fecha_inicio: Date, fecha_fin: Date, hipervinculos: string[], imagen: string, descripcion: string, ruta: string)
    constructor(cat_evento_id?: number, usuario_id?: number, nombre?: string, fecha_inicio?: Date, fecha_fin?: Date, hipervinculos?: string[], imagen?: string, descripcion?: string, ruta?: string)
    {
      this.cat_evento_id = cat_evento_id ?? -1
      this.usuario_id = usuario_id ?? -1
      this.nombre = nombre ?? ""
      this.fecha_inicio = fecha_inicio ?? new Date()
      this.fecha_fin = fecha_fin ?? new Date()
      this.hipervinculos = hipervinculos ?? []
      this.imagen = imagen ?? ""
      this.descripcion = descripcion ?? ""
      this.ruta = ruta ?? ""
    }
  }
  
  export default Evento
  