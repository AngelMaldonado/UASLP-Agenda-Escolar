// TODO: en elimina ver que se pasará para identificar el evento a eliminar

import axios from "axios"
import Configuraciones from "../utils/Configuraciones.ts"
import Evento from "../models/Evento.ts";

class ServicioEvento {
  public static async obtenEventos(mes: number) {
    try {
      return (await axios.get<Evento[]>(
        Configuraciones.apiURL + "eventos",
        {
          params: {mes: mes + 1},
          transformResponse: [data => JSON.parse(data, (key, value) => {
            if (key == "fecha_inicio" || key == "fecha_fin") {
              return new Date(value)
            }
            return value
          })]
        }
      )).data
    } catch (err) {
      //console.log(err)
      return []
    }
  }

  public static async nuevo(evento: Evento) {
    try {
      await axios.post(Configuraciones.apiURL + "eventos", {
        ...evento,
        usuario_id: 1,
        fecha_inicio: evento.fecha_inicio?.toISOString().split("T")[0],
        fecha_fin: evento.fecha_fin?.toISOString().split("T")[0]
      }, {headers: {'Content-Type': 'multipart/form-data'}})
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async modifica(evento: Evento) {
    try {
      await axios.post(Configuraciones.apiURL + "eventos",
        {...evento, _method: "put"},
        {headers: {'Content-Type': 'multipart/form-data'}}
      )
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async elimina(evento: Evento) {
    try {
      await axios.delete(Configuraciones.apiURL + "eventos", {data: {id: evento.id}});
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

}

export default ServicioEvento
