import axios from "axios"
import {Configuraciones} from "../utils/Constantes.ts"
import Simbologia from "../models/Simbologia.ts";

class ServicioSimbolos {
  public static async obten() {
    try {
      return (await axios.get<Simbologia[]>(Configuraciones.apiURL + "simbolos")).data
    } catch (err) {
      console.log(err)
      return []
    }
  }

  public static async nuevo(simbolo: Simbologia) {
    return await axios.post(Configuraciones.apiURL + "simbolos",
      simbolo,
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
  }

  public static async modifica(simbolo: Simbologia) {
    return await axios.post(Configuraciones.apiURL + "simbolos",
      {...simbolo, _method: "put"}, // <- activa put mediante post en Laravel
      {headers: {'Content-Type': 'multipart/form-data'}}
    );
  }

  public static async elimina(simbolo: Simbologia) {
    return await axios.post(Configuraciones.apiURL + "simbolos", {id: simbolo.id, _method: "delete"});
  }
}

export default ServicioSimbolos
