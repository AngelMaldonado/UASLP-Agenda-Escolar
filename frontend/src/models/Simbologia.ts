import {mixed, number, object, ObjectSchema} from "yup"
import {es} from "yup-locales"
import {setLocale} from "yup"

setLocale(es)

class Simbologia {
  public readonly id: number | undefined
  public simbolo: string | Object | undefined

  constructor(
    id?: number,
    simbolo?: string,
  ) {
    this.id = id
    this.simbolo = simbolo
  }

  public static schema: ObjectSchema<Simbologia> = object({
    id: number(),
    simbolo: mixed().label("símbolo").required().test("simbolo", "el archivo debe ser .webp", value =>
      value instanceof File ? value.type == "image/webp" : true
    ),
  })
}

export default Simbologia
