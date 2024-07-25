import {PermisosEnum, TipoUsuarioEnum} from "../enums";
import {array, number, object, ObjectSchema, ref, setLocale, string} from "yup";
import {es} from "yup-locales"

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
  public token: string | undefined
  public color: number | undefined

  constructor(
    id?: number,
    rpe?: number,
    nombre?: string,
    apellido?: string,
    tipo?: string,
    email?: string,
    permisos = <string[]>[],
    contraseña?: string,
    contraseña_confirmation?: string,
    token?: string,
    color?: number) {
    this.id = id
    this.rpe = rpe
    this.nombre = nombre
    this.apellido = apellido
    this.tipo = tipo
    this.email = email
    this.permisos = permisos
    this.contraseña = contraseña
    this.contraseña_confirmation = contraseña_confirmation
    this.token = token
    this.color = color
  }

  public static schema: ObjectSchema<Usuario> = object({
    id: number(),
    rpe: number().when("tipo", {
      is: TipoUsuarioEnum.SECUNDARIO,
      then: schema => schema.required().integer().positive()
        .test("rpe", "deben ser 6 dígitos", v => v.toString().length == 6)
        .typeError("ingrese un número de 6 dígitos"),
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
    tipo: string().label('tipo de usuario').required().test(v => Object.values(TipoUsuarioEnum).includes(v as TipoUsuarioEnum)),
    email: string().label('correo').when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.email().max(320).required(),
      otherwise: schema => schema.nullable()
    }),
    permisos: array().min(1, 'elija al menos 1 permiso').max(Object.values(PermisosEnum).length).required(),
    contraseña: string().max(60).required(),
    contraseña_confirmation: string().label("re contraseña").required().oneOf([ref("contraseña")], "las contraseñas deben coincidir"),
    token: string(),
    color: number(),
  })

  public static login_schema: ObjectSchema<any> = object({
    tipo: string().label('tipo de usuario').required()
      .test(v => Object.values(TipoUsuarioEnum).includes(v as TipoUsuarioEnum)),
    email: string().label('correo').when("tipo", {
      is: TipoUsuarioEnum.BECARIO,
      then: schema => schema.email().max(320).required(),
      otherwise: schema => schema.nullable()
    }).when("tipo", {
      is: TipoUsuarioEnum.ADMINISTRADOR,
      then: schema => schema.email().max(320).required(),
      otherwise: schema => schema.nullable()
    }),
    rpe: number().when("tipo", {
      is: TipoUsuarioEnum.SECUNDARIO,
      then: schema => schema.positive().integer().required()
        .test("rpe", "Deben ser 6 dígitos", v => v.toString().length == 6),
      otherwise: schema => schema.nullable()
    }),
    contraseña: string().required().max(60),
  })
}

export default Usuario
