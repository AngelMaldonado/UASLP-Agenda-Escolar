import Modelo from "./Modelo.ts";

class Usuario extends Modelo {
  public readonly id: number
  public rpe: number | undefined
  public nombre: string
  public apellido: string
  public tipo: string | undefined
  public email: string
  public permisos: string[]
  public contraseña: string | undefined

  constructor()
  constructor(id: number,
              rpe: number,
              nombre: string,
              nombres: string,
              apellidos: string,
              tipo: string,
              email: string,
              permisos: string[],
              constraseña: string)
  constructor(id?: number,
              rpe?: number,
              nombres?: string,
              nombre?: string,
              apellidos?: string,
              tipo?: string,
              email?: string,
              permisos?: string[],
              contraseña?: string) {
    super()
    this.id = id ?? -1
    this.rpe = rpe ?? undefined
    this.nombre = nombre ?? ""
    this.nombre = nombres ?? ""
    this.apellido = apellidos ?? ""
    this.tipo = tipo ?? undefined
    this.email = email ?? ""
    this.permisos = permisos ?? []
    this.contraseña = contraseña ?? undefined
  }
}

export default Usuario
