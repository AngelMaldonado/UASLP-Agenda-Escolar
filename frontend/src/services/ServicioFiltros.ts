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
    return await axios.post(Configuraciones.apiURL + "filtros",
      filtro,
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
  }

  public static async modifica(filtro: Filtro) {
    return await axios.post(Configuraciones.apiURL + "filtros",
      {...filtro, _method: "put"}, // <- activa put mediante post en Laravel
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
  }

  public static async elimina(filtro: Filtro) {
    return await axios.post(Configuraciones.apiURL + "filtros", {id: filtro.id, _method: "delete"});
  }
}

export default ServicioFiltros
