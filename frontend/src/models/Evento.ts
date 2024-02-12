import {es} from "yup-locales"
import {array, date, mixed, number, object, ObjectSchema, setLocale, string} from "yup"
import {TipoEventoEnum} from "../enums";

setLocale(es)

class Evento {
  public readonly id: number | undefined
  public cat_evento_id: number | undefined
  public usuario_id: number | undefined
  public filtros: number[] | undefined
  public nombre: string | undefined
  public fecha_inicio: Date | undefined
  public fecha_fin: Date | undefined
  public hipervinculos: (string | undefined)[] | undefined
  public imagen: string | Object | undefined
  public descripcion: string | undefined
  public simbolo: string | undefined
  public simbolo_id: number | undefined
  public tipo: string | undefined

  constructor(id?: number,
              cat_evento?: number,
              filtros?: number[],
              usuario_id?: number,
              nombre?: string,
              fecha_inicio?: Date,
              fecha_fin?: Date,
              hipervinculos: string[] = [""],
              imagen?: string,
              descripcion?: string,
              simbolo?: string,
              simbolo_id?: number,
              tipo?: string) {
    this.id = id
    this.cat_evento_id = cat_evento
    this.filtros = filtros
    this.usuario_id = usuario_id
    this.nombre = nombre
    this.fecha_inicio = fecha_inicio
    this.fecha_fin = fecha_fin
    this.hipervinculos = hipervinculos
    this.imagen = imagen
    this.descripcion = descripcion
    this.simbolo = simbolo
    this.simbolo_id = simbolo_id
    this.tipo = tipo
  }

  public static schema: ObjectSchema<Evento> = object({
    id: number(),
    cat_evento_id: number().when("tipo", {
      is: TipoEventoEnum.CATALOGO,
      then: schema => schema.required("evento de catálogo es un campo obligatorio"),
    }),
    filtros: array().when("tipo", {
      is: (value: string) => value == TipoEventoEnum.FACULTAD || value == TipoEventoEnum.CATALOGO,
      then: schema => schema.required(),
    }),
    usuario_id: number().required(),
    nombre: string().when("tipo", {
      is: (value: string) => value == TipoEventoEnum.ALUMNADO || value == TipoEventoEnum.FACULTAD,
      then: schema => schema.max(100).required(),
      otherwise: schema => schema.nullable()
    }),
    fecha_inicio: date().required("fecha de inicio es un campo requerido"),
    fecha_fin: date().required("fecha de fin es un campo requerido"),
    hipervinculos: array().of(string().url("ingrese una url válida (https://dominio.com)"))
      .max(6, "solo se permiten 5 hipervínculos por evento"),
    imagen: mixed(),
    descripcion: string().required(),
    simbolo: string(),
    simbolo_id: number().when("tipo", {
      is: (value: string) => value == TipoEventoEnum.FACULTAD || value == TipoEventoEnum.CATALOGO,
      then: schema => schema.required("símbolo es un campo requerido")
    }),
    tipo: string().required().test(v => Object.values(TipoEventoEnum).includes(v as TipoEventoEnum))
  })

  static ParseEventosCalendario(eventos: Evento[]) {
    return eventos.map(evento => {
      const {id, ...atributos} = evento
      return {
        id: evento.id?.toString() ?? "",
        start: evento.fecha_inicio.toISOString(),
        end: evento.fecha_fin.toISOString(),
        title: evento.nombre,
        ...atributos,
      }
    })
  }
}

export default Evento
