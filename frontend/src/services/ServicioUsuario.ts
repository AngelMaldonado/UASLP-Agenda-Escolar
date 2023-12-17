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
      const response = await axios.post(Configuraciones.apiURL + "usuarios", {
        nombre: usuario.nombres + " " + usuario.apellidos,
        tipo: usuario.tipo,
        email: usuario.email,
        permisos: usuario.permisos
      })
      return response.status == 200
    } catch (err) {
      return err
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