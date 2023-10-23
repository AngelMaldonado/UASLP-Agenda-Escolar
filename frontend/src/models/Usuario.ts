// TODO: Hacer Parse de los permisos correctamente en tipo string[]

class Usuario {
  private readonly _id: number
  private _nombre: string
  private _apellidos: string
  private _tipo: string
  private _email: string
  private _permisos: string[]

  constructor()
  constructor(id: number, nombre: string, apellidos: string, tipo: string, email: string, permisos: string[])
  constructor(id?: number, nombre?: string, apellidos?: string, tipo?: string, email?: string, permisos?: string[]) {
    this._id = id ?? -1
    this._nombre = nombre ?? ""
    this._apellidos = apellidos ?? ""
    this._tipo = tipo ?? ""
    this._email = email ?? ""
    this._permisos = permisos ?? []
  }

  get permisos(): string[] {
    return this._permisos;
  }

  get email(): string {
    return this._email;
  }

  get tipo(): string {
    return this._tipo;
  }

  get nombre(): string {
    return this._nombre;
  }

  get apellidos(): string {
    return this._apellidos;
  }

  get id(): number {
    return this._id;
  }

  set permisos(value: string[]) {
    this._permisos = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set tipo(value: string) {
    this._tipo = value;
  }

  set apellidos(value: string) {
    this._apellidos = value;
  }

  set nombre(value: string) {
    this._nombre = value;
  }
}

export default Usuario
