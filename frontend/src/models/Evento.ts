import {es} from "yup-locales"
import {array, date, mixed, number, object, ObjectSchema, setLocale, string} from "yup"
import {TipoEventoEnum} from "../enums";
import Filtro from "./Filtro.ts";

setLocale(es)

class Evento {
  public readonly id: number | undefined
  public cat_evento_id: number | undefined
  public usuario_id: number | undefined
  public filtros: number[] | undefined
  public nombre: string | undefined
  public fecha_inicio: Date | undefined
  public fecha_fin: Date | undefined
  public hipervinculo: string | undefined
  public hipervinculos: (string | undefined)[] | undefined
  public imagen: string | Object | undefined
  public descripcion: string | undefined
  public simbolo: string | undefined
  public simbolo_id: number | undefined
  public tipo: string | undefined

  constructor(id?: number,
              cat_evento?: number,
              filtros: number[] = [],
              usuario_id?: number,
              nombre?: string,
              fecha_inicio?: Date,
              fecha_fin?: Date,
              hipervinculo: string = "",
              hipervinculos: string[] = [],
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
    this.hipervinculo = hipervinculo
    this.hipervinculos = hipervinculos
    this.imagen = imagen
    this.descripcion = descripcion
    this.simbolo = simbolo
    this.simbolo_id = simbolo_id
    this.tipo = tipo
  }

  public static schema: ObjectSchema<Evento> = object({
    id: number(),
    cat_evento_id: number().label('evento de catálogo').when("tipo", {
      is: TipoEventoEnum.CATALOGO,
      then: schema => schema.required(),
    }).when("tipo", {
      is: TipoEventoEnum.FACULTAD,
      then: schema => schema.notRequired()
    }).when("tipo", {
      is: TipoEventoEnum.ALUMNADO,
      then: schema => schema.notRequired()
    }),
    filtros: array().when("tipo", {
      is: (value: string) => value == TipoEventoEnum.FACULTAD || value == TipoEventoEnum.CATALOGO,
      then: schema => schema.required().min(1),
    }),
    usuario_id: number().required(),
    nombre: string().when("tipo", {
      is: (value: string) => value == TipoEventoEnum.ALUMNADO || value == TipoEventoEnum.FACULTAD,
      then: schema => schema.max(100).required(),
      otherwise: schema => schema.nullable()
    }),
    fecha_inicio: date().label('fecha de inicio').required(),
    fecha_fin: date().label('fecha de fin').required(),
    hipervinculo: string().url("ingrese una url válida (https://dominio.com)"),
    hipervinculos: array().of(string().url("ingrese una url válida (https://dominio.com)"))
      .max(4, "solo se permiten 5 hipervínculos por evento"),
    imagen: mixed(),
    descripcion: string().label('descripción').required(),
    simbolo: string(),
    simbolo_id: number().label('símbolo').when("tipo", {
      is: (value: string) => value == TipoEventoEnum.FACULTAD || value == TipoEventoEnum.CATALOGO,
      then: schema => schema.required()
    }),
    tipo: string().label('tipo de evento').required().test(v => Object.values(TipoEventoEnum).includes(v as TipoEventoEnum))
  })

  static ParseEventosCalendario(eventos: Evento[]) {
    return eventos.map(evento => {
      const {id, ...atributos} = evento
      return {
        id: evento.id?.toString() ?? "",
        start: evento.fecha_inicio?.toISOString(),
        end: evento.fecha_fin?.toISOString(),
        title: evento.nombre,
        ...atributos,
      }
    })
  }

  static FiltraEventos(mes: number, año: number, filtros?: Filtro[], texto?: string, eventos?: Evento[]) {
    eventos?.sort((a, b) => a.fecha_inicio!.getTime() - b.fecha_inicio!.getTime())

    return eventos?.filter(evento => {
      let incluir = true

      if (filtros && filtros.length > 0)
        incluir = filtros.some(f => evento.filtros?.includes(f.id!))

      if (texto != "")
        incluir = evento.nombre?.toLowerCase().includes(texto!.toLowerCase()) ?? false

      if (evento.fecha_inicio?.getMonth() != mes || evento.fecha_inicio?.getFullYear() != año)
        incluir = false

      return incluir
    })
  }
}


export default Evento
