import "./_formulario-usuario.scss"
import Usuario from "../../../models/Usuario.ts"
import {Form} from "react-bootstrap"
import Formal from "react-formal"
import Select, {
  components,
  MultiValueGenericProps,
} from "react-select"
import {
  PermisosEnum,
  PermisosOptions,
  PermisosOptionsType,
  TipoUsuarioEnum,
  TipoUsuarioOptions,
  TipoUsuarioOptionsType,
} from "../../../enums"
import {useState} from "react";

type FormularioUsuarioProps = {
  usuario: Usuario,
  setUsuario: ((field: string, value: string | PermisosEnum[]) => void),
  errores: {},
}

function FormularioUsuario(props: FormularioUsuarioProps) {
  const [errores, setErrores] = useState({})

  const Input = (inputProps: any) => <components.Input {...inputProps} autoComplete="off" aria-autocomplete="none"/>
  const MultiValueLabel = (props: MultiValueGenericProps) => {
    return (
      <components.MultiValueLabel {...props}>
        {typeof props.data == "object" ? props.children : props.data.toString()}
      </components.MultiValueLabel>
    );
  }

  return (
    <Formal schema={Usuario.schema}
            value={props.usuario}
            errors={{...errores, ...props.errores}}
            onError={errors => setErrores(errors)}>
      <span className="text-muted fst-italic">Campos requeridos *</span>
      <Form.Group>
        <Form.Label>Tipo de usuario*</Form.Label>
        <Formal.Field name="tipo"
                      as={Select}
                      className="form-control"
                      classNamePrefix="select"
                      unstyled
                      components={{Input}}
                      placeholder="Eliga el tipo de usuario"
                      noOptionsMessage={() => <>Sin opciones</>}
                      options={TipoUsuarioOptions.slice(1)}
                      mapToValue={props.usuario.tipo ?
                        v =>
                          TipoUsuarioOptions.slice(1).find(o => o.value === v.tipo)
                        : undefined
                      }
                      onChange={(o: TipoUsuarioOptionsType) => props.setUsuario("tipo", o.value)}
        />
        <Formal.Message for="tipo" className="d-flex text-danger"/>
        {camposTipoUsuario()}
        <Form.Label>Permisos*</Form.Label>
        <Formal.Field name="permisos"
                      as={Select}
                      className="form-control"
                      classNamePrefix="select"
                      unstyled
                      isMulti
                      components={{MultiValueLabel}}
                      closeMenuOnSelect={false}
                      placeholder="Eliga los permisos que tendrá el usuario"
                      noOptionsMessage={() => <>Sin opciones</>}
                      options={PermisosOptions}
                      mapToValue={props.usuario.permisos!.length > 0 ?
                        v => PermisosOptions.filter(p => v.permisos?.includes(p.value))
                        : undefined}
                      onChange={(e: PermisosOptionsType[]) => {
                        props.setUsuario("permisos", e.map(p => p.value))
                      }}
        />
        <Formal.Message for="permisos" className="d-flex text-danger"/>
      </Form.Group>
    </Formal>
  );

  function camposTipoUsuario() {
    switch (props.usuario.tipo) {
      case TipoUsuarioEnum.SECUNDARIO:
        return camposAdministrador()
      case TipoUsuarioEnum.BECARIO:
        return camposBecario()
      default:
        return null
    }
  }

  function camposBecario() {
    return (
      <>
        <Form.Label htmlFor="nombre">Nombre(s)*</Form.Label>
        <Formal.Field name="nombre"
                      className="form-control"
                      placeholder="Escriba el(los) nombre(s)"
                      onChange={e => props.setUsuario("nombre", e.target.value)}
        />
        <Formal.Message for="nombre" className="d-flex text-danger"/>
        <Form.Label htmlFor="apellido">Apellidos*</Form.Label>
        <Formal.Field name="apellido"
                      className="form-control"
                      placeholder="Escriba los apellidos"
                      onChange={e => props.setUsuario("apellido", e.target.value)}
        />
        <Formal.Message for="apellido" className="d-flex text-danger"/>
        <Form.Label htmlFor="email">Correo*</Form.Label>
        <Formal.Field name="email"
                      className="form-control"
                      placeholder="Escriba el correo del usuario (ejemplo@dominio.com)"
                      onChange={e => props.setUsuario("email", e.target.value)}
        />
        <Formal.Message for="email" className="d-flex text-danger"/>
        <Form.Label htmlFor="contraseña">Contraseña*</Form.Label>
        <Formal.Field name="contraseña"
                      type="password"
                      className="form-control"
                      placeholder="Escriba una contraseña para el usuario"
                      onChange={e => props.setUsuario("contraseña", e.target.value)}
        />
        <Formal.Message for="contraseña" className="d-flex text-danger"/>
        <Form.Label htmlFor="contraseña_confirmation">Confirmar contraseña*</Form.Label>
        <Formal.Field name="contraseña_confirmation"
                      type="password"
                      className="form-control"
                      placeholder="Confirme la contraseña del usuario"
                      onChange={e => props.setUsuario("contraseña_confirmation", e.target.value)}
        />
        <Formal.Message for="contraseña_confirmation" className="d-flex text-danger"/>
      </>
    )
  }

  function camposAdministrador() {
    return (
      <>
        <Form.Label>RPE*</Form.Label>
        <Formal.Field
          name="rpe"
          className="form-control"
          placeholder="RPE Ej. 123456"
          onChange={e => props.setUsuario("rpe", e.target.value)}
        />
        <Formal.Message for="rpe" className="d-flex text-danger"/>
        <Form.Label htmlFor="contraseña">Contraseña*</Form.Label>
        <Formal.Field name="contraseña"
                      type="password"
                      className="form-control"
                      placeholder="Escriba una contraseña para el usuario"
                      onChange={e => props.setUsuario("contraseña", e.target.value)}
        />
        <Formal.Message for="contraseña" className="d-flex text-danger"/>
      </>
    )
  }
}

export default FormularioUsuario
