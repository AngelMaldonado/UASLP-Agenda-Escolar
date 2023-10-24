class Usuario {
  public readonly id: number
  public nombre: string
  public nombres: string
  public apellidos: string
  public tipo: string
  public email: string
  public permisos: string[]

  constructor()
  constructor(id: number, nombre: string, nombres: string, apellidos: string, tipo: string, email: string, permisos: string[])
  constructor(id?: number, nombres?: string, nombre?: string, apellidos?: string, tipo?: string, email?: string, permisos?: string[]) {
    this.id = id ?? -1
    this.nombre = nombre ?? ""
    this.nombres = nombres ?? ""
    this.apellidos = apellidos ?? ""
    this.tipo = tipo ?? ""
    this.email = email ?? ""
    this.permisos = permisos ?? []
  }
}

export default Usuario
