import Configuraciones from "../utils/Configuraciones.ts"
import axios from "axios"
import Usuario from "../models/Usuario.ts";

class UsuarioService {
  private static URL: string = Configuraciones.apiURL + "usuarios"

  public static obtenUsuarios() {
    return axios.get(this.URL)
  }

  public static nuevo(usuario: Usuario) {
    return axios.post(JSON.stringify(usuario))
  }

  public static eliminaUsuario(id) {
    return axios.post(id);
  }
}

export default UsuarioService
