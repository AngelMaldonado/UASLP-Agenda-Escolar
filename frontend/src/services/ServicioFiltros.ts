import axios from "axios"
import {Configuraciones} from "../utils/Constantes.ts"
import Filtro from "../models/Filtro.ts"

class ServicioFiltros {
  public static async obten() {
    try {
      return (await axios.get<Filtro[]>(Configuraciones.apiURL + "filtros")).data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  public static async nuevo(filtro: Filtro) {
    console.log(filtro)
    try {
      await axios.post(Configuraciones.apiURL + "filtros",
        filtro,
        {headers: {'Content-Type': 'multipart/form-data'}}
      );
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async modifica(filtro: Filtro) {
    try {
      await axios.post(Configuraciones.apiURL + "filtros",
        {...filtro, _method: "put"}, // <- activa put mediante post en Laravel
        {headers: {'Content-Type': 'multipart/form-data'}}
      );
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async elimina(filtro: Filtro) {
    try {
      await axios.post(Configuraciones.apiURL + "filtros", {id: filtro.id, _method: "delete"});
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default ServicioFiltros
