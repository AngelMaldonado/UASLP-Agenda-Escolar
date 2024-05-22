import axios from "axios"
import {Configuraciones} from "../utils/Constantes.ts"
import Simbologia from "../models/Simbologia.ts";

class ServicioSimbolos {
  public static async obten() {
    try {
      return (await axios.get<Simbologia[]>(Configuraciones.apiURL + "simbolos")).data
    } catch (err) {
      //console.log(err)
      return []
    }
  }

  public static async nuevo(simbolo: Simbologia) {
    try {
      await axios.post(Configuraciones.apiURL + "simbolos",
        simbolo,
        {headers: {'Content-Type': 'multipart/form-data'}}
      );
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async modifica(simbolo: Simbologia) {
    try {
      await axios.post(Configuraciones.apiURL + "simbolos",
        {...simbolo, _method: "put"}, // <- activa put mediante post en Laravel
        {headers: {'Content-Type': 'multipart/form-data'}}
      );
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  public static async elimina(simbolo: Simbologia) {
    try {
      await axios.delete(Configuraciones.apiURL + "simbolos", {data: {id: simbolo.id}});
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export default ServicioSimbolos
