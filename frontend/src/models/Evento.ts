import CatEvento from "./CatEvento.ts";

class Evento {
  public cat_evento: CatEvento | null
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

  constructor()
  constructor(cat_evento: CatEvento,
              comunidades: number[],
              areas: number[],
              usuario_id: number,
              nombre: string,
              fecha_inicio: Date,
              fecha_fin: Date,
              hipervinculos: string[],
              imagen: string,
              descripcion: string,
              simbolo: string)
  constructor(cat_evento?: CatEvento,
              comunidades?: number[],
              areas?: number[],
              usuario_id?: number,
              nombre?: string,
              fecha_inicio?: Date,
              fecha_fin?: Date,
              hipervinculos?: string[],
              imagen?: string,
              descripcion?: string,
              simbolo?: string) {
    this.cat_evento = cat_evento ?? null
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
  }
}

export default Evento
