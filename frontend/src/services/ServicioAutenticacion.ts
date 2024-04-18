import axios from "axios"
import Usuario from "../models/Usuario.ts";
import Configuraciones from "../utils/Configuraciones.ts";

class ServicioAutenticacion {
  public static async login(usuario: Usuario) {
    return (await axios.post(Configuraciones.apiURL + "login", usuario)).data
  }

  public static async logout() {
    return (await axios.post(Configuraciones.apiURL + "logout")).data
  }
}

export default ServicioAutenticacion
