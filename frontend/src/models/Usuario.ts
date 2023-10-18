class Usuario {

  private _id: number
  private _nombre: string
  private _tipo: string
  private _email: string
  private _permisos: string

  constructor(id: number, nombre: string, tipo: string, email: string, permisos: string) {
    this._id = id
    this._nombre = nombre
    this._tipo = tipo
    this._email = email
    this._permisos = permisos
  }


  get permisos(): string {
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

  get id(): number {
    return this._id;
  }
}

export default Usuario
