import {mixed, number, object, ObjectSchema, string} from "yup"
import {FiltrosCategoriaEnum} from "../enums/FiltroCategoriaEnum.ts"
import {es} from "yup-locales"
import {setLocale} from "yup"

setLocale(es)

class Filtro {
  public readonly id: number | undefined
  public nombre: string | undefined
  public icono: string | Object | undefined
  public categoria: string | undefined

  constructor(
    id?: number,
    nombre?: string,
    icono?: string,
    categoria?: string
  ) {
    this.id = id
    this.nombre = nombre
    this.icono = icono
    this.categoria = categoria
  }

  public static schema: ObjectSchema<Filtro> = object({
    id: number(),
    nombre: string().required().max(60),
    icono: mixed().test("icono", "el archivo debe ser .svg", value =>
      value instanceof File ? value.type == "image/svg+xml" : true
    ),
    categoria: string().required().test(value =>
      Object.values(FiltrosCategoriaEnum).includes(value as FiltrosCategoriaEnum)
    )
  })
}

export default Filtro
