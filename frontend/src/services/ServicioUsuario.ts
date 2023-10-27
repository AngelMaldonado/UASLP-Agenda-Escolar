import axios from "axios"
import Configuraciones from "../utils/Configuraciones.ts"
import Usuario from "../models/Usuario.ts";

class ServicioUsuario {
  public static async obtenUsuarios() {
    try {
      return (await axios.get<Usuario[]>(Configuraciones.apiURL + "usuarios")).data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  public static async nuevo(usuario: Usuario) {
    try {
      await axios.post(Configuraciones.apiURL + "usuarios", {
        nombre: usuario.nombres + " " + usuario.apellidos,
        tipo: usuario.tipo,
        email: usuario.email,
        permisos: usuario.permisos
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async modifica(usuario: Usuario) {
    try {
      await axios.put(Configuraciones.apiURL + "usuarios", usuario)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  /*
  public static eliminaUsuario(id) {
    return axios.post(id);
  }
   */
}

export default ServicioUsuario
