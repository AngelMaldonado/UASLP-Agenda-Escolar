import Configuraciones from "../utils/Configuraciones.ts"
import axios from "axios"

class UsuarioService {
  private static URL: string = Configuraciones.apiURL + "usuarios"

  public static obtenUsuarios() {
    return axios.get(this.URL)
  }

  public static eliminaUsuario(id) {
    return axios.post(id);
  }
}

export default UsuarioService
