class Filtro {
  public id: number | null
  public nombre: string
  public icono: string | File
  public categoria: string

  constructor()
  constructor(
    id: number,
    descripcion: string,
    icono: string,
    categoria: string,
  )
  constructor(
    id?: number,
    descripcion?: string,
    icono?: string,
    categoria?: string
  ) {
    this.id = id ?? null
    this.nombre = descripcion ?? ""
    this.icono = icono ?? ""
    this.categoria = categoria ?? ""
  }
}

export default Filtro
