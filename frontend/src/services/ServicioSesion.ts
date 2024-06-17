//TODO: evitar que se imprima en consola el error de 401 al intentar obtener la sesión

import axios from "axios"
import {Configuraciones} from "../utils/Constantes.ts";
import Sesion from "../models/Sesion.ts";
import Usuario from "../models/Usuario.ts";

class ServicioSesion {
  public static async obtenSesion() {
    try {
      let sesion = (await axios.get<Sesion>(Configuraciones.apiURL + "sesion")).data
      sesion.usuarios = sesion.usuarios?.map((usuario) => {
        const color = sessionStorage.getItem(`color-usuario-${usuario.id}`) ?? this.generaColor(usuario)
        return ({
          ...usuario,
          color: parseInt(color)
        } as Usuario)
      })
      return sesion
    } catch (error) {
      console.log(error)
      sessionStorage.clear()
      return new Sesion()
    }
  }

  public static async extiendeSesion() {
    try {
      return (await axios.post(Configuraciones.apiURL + "sesion", {_method: "put"}))
    } catch (_) {
      sessionStorage.clear()
      return new Sesion()
    }
  }

  private static generaColor(usuario: Usuario) {
    const color = (Math.random() * 360).toString()
    sessionStorage.setItem(`color-usuario-${usuario.id}`, color)
    return color
  }
}

export default ServicioSesion
