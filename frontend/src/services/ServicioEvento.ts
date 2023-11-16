// TODO: en elimina ver que se pasará para identificar el evento a eliminar

import axios from "axios"
import Configuraciones from "../utils/Configuraciones.ts"
import Evento from "../models/Evento.ts";

class ServicioEvento {
  public static async obtenEventos() {
    try {
      return (await axios.get<Evento[]>(Configuraciones.apiURL + "eventos")).data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  public static async nuevo(evento: Evento) {
    try {
      await axios.post(Configuraciones.apiURL + "eventos", {
        ...evento,
        usuario_id: 1,
        fecha_inicio: evento.fecha_inicio.toISOString().split("T")[0],
        fecha_fin: evento.fecha_fin.toISOString().split("T")[0]
      })
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async modifica(evento: Evento) {
    try {
      await axios.put(Configuraciones.apiURL + "eventos", evento)
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async elimina(evento: Evento) {
    try {
      await axios.delete(Configuraciones.apiURL + "eventos", {data: {id: evento}});
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

}

export default ServicioEvento