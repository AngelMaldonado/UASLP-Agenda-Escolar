import axios from "axios"
import {Configuraciones} from "../utils/Constantes.ts"
import Usuario from "../models/Usuario.ts";

class ServicioUsuario {
  public static async obtenUsuarios() {
    try {
      return (await axios.get<Usuario[]>(
        Configuraciones.apiURL + "usuarios",
        {
          transformResponse: [data => JSON.parse(data, (key, value) => {
            if (key != "rpe")
              return value
            else if (key == null)
              return undefined
          })]
        }
      )).data
    } catch (err) {
      return []
    }
  }

  public static async nuevo(usuario: Usuario) {
    return (await axios.post(Configuraciones.apiURL + "usuarios", usuario))
  }

  public static async modifica(usuario: Usuario) {
    return (await axios.post(Configuraciones.apiURL + "usuarios", {...usuario, _method: "put"}))
  }


  public static async elimina(usuario: Usuario) {
    return await axios.post(Configuraciones.apiURL + "usuarios", {id: usuario.id, _method: "delete"});
  }
}

export default ServicioUsuario
