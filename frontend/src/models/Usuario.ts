class Usuario {
  public readonly id: number
  public rpe: number | undefined
  public nombre: string
  public apellido: string
  public tipo: string | undefined
  public email: string
  public permisos: string[]

  constructor()
  constructor(id: number, rpe: number, nombre: string, nombres: string, apellidos: string, tipo: string, email: string, permisos: string[])
  constructor(id?: number, rpe?: number, nombres?: string, nombre?: string, apellidos?: string, tipo?: string, email?: string, permisos?: string[]) {
    this.id = id ?? -1
    this.rpe = rpe ?? undefined
    this.nombre = nombre ?? ""
    this.nombre = nombres ?? ""
    this.apellido = apellidos ?? ""
    this.tipo = tipo ?? undefined
    this.email = email ?? ""
    this.permisos = permisos ?? []
  }
}

export default Usuario
