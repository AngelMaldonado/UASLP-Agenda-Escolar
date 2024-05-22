import axios from "axios"
import Usuario from "../models/Usuario.ts";
import {Configuraciones} from "../utils/Constantes.ts";
import {ErrorsObject} from "../utils/Tipos.ts";

class ServicioAutenticacion {
  public static async login(usuario: Usuario) {
    return (await axios.post<Usuario | ErrorsObject>(Configuraciones.apiURL + "login", usuario))
  }

  public static async logout() {
    return (await axios.post(Configuraciones.apiURL + "logout"))
  }
}

export default ServicioAutenticacion
