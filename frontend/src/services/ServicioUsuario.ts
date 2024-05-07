import axios from "axios"
import Configuraciones from "../utils/Configuraciones.ts"
import Usuario from "../models/Usuario.ts";

class ServicioUsuario {
  public static async obtenUsuarios() {
    try {
      return (await axios.get<Usuario[]>(Configuraciones.apiURL + "usuarios")).data
    } catch (err) {
      //console.log(err)
      return []
    }
  }

  public static async nuevo(usuario: Usuario) {
    return (await axios.post(Configuraciones.apiURL + "usuarios", usuario))
  }

  public static async modifica(usuario: Usuario) {
    return (await axios.put(Configuraciones.apiURL + "usuarios", usuario)).data
  }


  public static async elimina(usuario: Usuario) {
    try {
      await axios.delete(Configuraciones.apiURL + "usuarios", {data: {id: usuario.id}});
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

}

export default ServicioUsuario
