import CatEvento from "../models/CatEvento.ts";
import axios from "axios";
import Configuraciones from "../utils/Configuraciones.ts";

export default class ServicioCatEvento {
  public static async obten() {
    try {
      return (await axios.get<CatEvento[]>(Configuraciones.apiURL + "cat_eventos")).data
    } catch (err) {
      console.log(err)
      return []
    }
  }
}
