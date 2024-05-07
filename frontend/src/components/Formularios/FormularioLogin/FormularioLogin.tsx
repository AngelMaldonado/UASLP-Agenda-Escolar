// TODO: apagar autocompletado de tipo de usuario y contraseña

import "./_formularioLogin.scss"
import {TipoUsuarioEnum, TipoUsuarioOptions, TipoUsuarioOptionsType} from "../../../enums";
import {useState} from "react";
import Usuario from "../../../models/Usuario.ts";
import {Form} from "react-bootstrap";
import Formal from "react-formal";
import Select from "react-select";
import {ErrorsObject} from "../../../utils/Utils.ts";

type FormularioLoginProps = {
  usuario: Usuario,
  setUsuario: ((field: string, value: string | number) => void),
  errores: ErrorsObject,
}

function FormularioLogin(props: FormularioLoginProps) {
  const [errores, setErrores] = useState({})

  return (
    <Formal schema={Usuario.login_schema}
            errors={{...errores, ...props.errores}}
            onError={errors => setErrores(errors)}>
      <Form.Group>
        {tipo()}
        {props.usuario.tipo == TipoUsuarioEnum.BECARIO || props.usuario.tipo == TipoUsuarioEnum.ADMINISTRADOR ?
          correo() : null
        }
        {props.usuario.tipo == TipoUsuarioEnum.SECUNDARIO ? rpe() : null}
        {contraseña()}
      </Form.Group>
      <Form.Control type="hidden" name="auth"/>
      <Formal.Message for="auth" className="d-flex text-danger"/>
    </Formal>
  )

  function tipo() {
    return (<>
      <Form.Label>Tipo de usuario*</Form.Label>
      <Formal.Field name="tipo"
                    as={Select}
                    className="form-control"
                    classNamePrefix="select"
                    unstyled
                    isSearchable={false}
                    placeholder="Eliga el tipo de usuario"
                    noOptionsMessage={() => <>Sin opciones</>}
                    options={TipoUsuarioOptions}
                    mapFromValue={{"tipo": option => (option as TipoUsuarioOptionsType).value}}
                    mapToValue={props.usuario.tipo ?
                      v =>
                        TipoUsuarioOptions.slice(1).find(o => o.value === v.tipo)
                      : undefined
                    }
                    onChange={(o: TipoUsuarioOptionsType) => props.setUsuario("tipo", o.value)}
      />
      <Formal.Message for="tipo" className="d-flex text-danger"/>
    </>)
  }

  function correo() {
    return (<>
      <Form.Label htmlFor="email">Correo*</Form.Label>
      <Formal.Field name="email"
                    className="form-control"
                    placeholder="Escriba el correo del usuario (ejemplo@dominio.com)"
                    onChange={e => props.setUsuario("email", e.target.value)}
      />
      <Formal.Message for="email" className="d-flex text-danger"/>
    </>)
  }

  function rpe() {
    return (<>
      <Form.Label>RPE*</Form.Label>
      <Formal.Field
        name="rpe"
        className="form-control"
        placeholder="RPE Ej. 123456"
        onChange={e => props.setUsuario("rpe", e.target.value)}
      />
      <Formal.Message for="rpe" className="d-flex text-danger"/>
    </>)
  }

  function contraseña() {
    return (<>
      <Form.Label htmlFor="contraseña">Contraseña*</Form.Label>
      <Formal.Field name="contraseña"
                    type="password"
                    className="form-control"
                    placeholder="Escriba una contraseña para el usuario"
                    onChange={e => props.setUsuario("contraseña", e.target.value)}
      />
      <Formal.Message for="contraseña" className="d-flex text-danger"/>
    </>)
  }
}


export default FormularioLogin;
