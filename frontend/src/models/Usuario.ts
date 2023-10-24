// TODO: Hacer Parse de los permisos correctamente en tipo string[]

class Usuario {
  public readonly id: number
  public nombres: string
  public apellidos: string
  public tipo: string
  public email: string
  public permisos: string[]

  constructor()
  constructor(id: number, nombre: string, apellidos: string, tipo: string, email: string, permisos: string[])
  constructor(id?: number, nombre?: string, apellidos?: string, tipo?: string, email?: string, permisos?: string[]) {
    this.id = id ?? -1
    this.nombres = nombre ?? ""
    this.apellidos = apellidos ?? ""
    this.tipo = tipo ?? ""
    this.email = email ?? ""
    this.permisos = permisos ?? []
  }
}

export default Usuario
