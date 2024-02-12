import {PermisosEnum, TipoUsuarioEnum} from "../enums";
import {array, number, object, ObjectSchema, ref, string} from "yup";
import {es} from "yup-locales"
import {setLocale} from "yup"

setLocale(es)

class Usuario {
  public readonly id: number | undefined
  public rpe: number | undefined
  public nombre: string | undefined
  public apellido: string | undefined
  public tipo: string | undefined
  public email: string | undefined
  public permisos: string[] | undefined
  public contraseña: string | undefined
  public contraseña_confirmation: string | undefined

  constructor(
    id?: number,
    rpe?: number,
    nombre?: string,
    apellido?: string,
    tipo?: string,
    email?: string,
    permisos = <string[]>[],
    contraseña?: string,
    contraseña_confirmation?: string) {
    this.id = id
    this.rpe = rpe
    this.nombre = nombre
    this.apellido = apellido
    this.tipo = tipo
    this.email = email
    this.permisos = permisos
    this.contraseña = contraseña
    this.contraseña_confirmation = contraseña_confirmation
  }

  public static schema: ObjectSchema<Usuario> = object({
    id: number(),
    rpe: number().when("tipo", {
      is: TipoUsuarioEnum.SECUNDARIO,
      then: schema => schema.positive().integer().required()
        .test("rpe", "Deben ser 6 dígitos", v => v.toString().length == 6),
      otherwise: schema => schema.nullable()
    }),
    nombre: string().when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.max(50).required(),
      otherwise: schema => schema.nullable()
    }),
    apellido: string().when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.max(50).required(),
      otherwise: schema => schema.nullable()
    }),
    tipo: string().required().test(v => Object.values(TipoUsuarioEnum).includes(v as TipoUsuarioEnum)),
    email: string().when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.email().max(320).required(),
      otherwise: schema => schema.nullable()
    }),
    permisos: array().min(1).max(Object.values(PermisosEnum).length).required(),
    contraseña: string().when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.max(60).required(),
      otherwise: schema => schema.nullable()
    }),
    contraseña_confirmation: string().label("re contraseña").when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.required()
        .oneOf([ref("contraseña")], "Las contraseñas deben coincidir"),
      otherwise: schema => schema.nullable()
    })
  })

  public static login_schema: ObjectSchema<any> = object({
    tipo: string().required().test(v => Object.values(TipoUsuarioEnum).includes(v as TipoUsuarioEnum)),
    email: string().when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.email().max(320).required(),
      otherwise: schema => schema.nullable()
    }),
    rpe: number().when("tipo", {
      is: TipoUsuarioEnum.SECUNDARIO,
      then: schema => schema.positive().integer().required()
        .test("rpe", "Deben ser 6 dígitos", v => v.toString().length == 6),
      otherwise: schema => schema.nullable()
    }),
    contraseña: string().when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.max(60).required(),
      otherwise: schema => schema.nullable()
    }),
  })
}

export default Usuario
