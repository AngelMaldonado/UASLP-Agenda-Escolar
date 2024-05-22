import Usuario from "./Usuario.ts";

class Sesion {
  public usuario?: Usuario
  public usuarios?: Usuario[]
  public expiracion?: Date

  constructor(usuario?: Usuario, usuarios?: Usuario[], expiracion?: Date) {
    this.usuario = usuario
    this.usuarios = usuarios
    this.expiracion = expiracion
  }
}

export default Sesion
