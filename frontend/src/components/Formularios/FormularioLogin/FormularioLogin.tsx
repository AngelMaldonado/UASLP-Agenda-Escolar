import "./_formularioLogin.scss"
import Boton from '../../Inputs/Boton';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import {TemaComponente} from '../../../utils/Utils.ts';
import CampoTexto, {CampoDesplegable, TipoCampoTexto} from '../../Inputs/Campo';
import {TipoUsuarioEnum, TipoUsuarioOptions} from "../../../enums";
import {Dispatch, SetStateAction, useState} from "react";
import Usuario from "../../../models/Usuario.ts";
import Modelo from "../../../models/Modelo.ts";
import {Form} from "react-bootstrap";
import useModelChange from "../../../hooks/HookModelChange.ts";

const formLoginId = "form-login"

function FormularioLogin() {
  const [usuario, setUsuario] = useState(new Usuario())
  const onUsuarioChange = useModelChange(setUsuario as Dispatch<SetStateAction<Modelo>>)

  return (
    <Container className="mt-5">
      <Card className="FormularioLogin border">
        <Card.Header as="h6" className="text-center text-white py-3">
          Administración Agenda | Calendario
        </Card.Header>
        <Card.Body>
          {formulario()}
        </Card.Body>
        <Card.Footer className="d-flex gap-2 py-3">
          <Boton key={"iniciar-sesion"}
                 variant={TemaComponente.PrimarioInverso}
                 etiqueta="Iniciar Sesión"
                 onClick={() => {
                   console.log(usuario)
                   if (valida())
                     console.log("A loggear...")
                 }}
          />
        </Card.Footer>
      </Card>
    </Container>
  );

  function formulario() {
    return (
      <Form id={formLoginId} className="fs-6 d-flex flex-column gap-2">
        <CampoDesplegable id="tipo"
                          required
                          options={TipoUsuarioOptions}
                          etiqueta="Tipo de usuario"
                          placeholder="Usuario"
                          onChange={onUsuarioChange.onSingleChange}
        />
        {usuario.tipo === TipoUsuarioEnum.ADMINISTRADOR || usuario.tipo === TipoUsuarioEnum.SECUNDARIO ?
          <CampoTexto id="rpe"
                      required
                      etiqueta="RPE"
                      placeholder="RPE"
                      type={TipoCampoTexto.Texto}
                      onChange={onUsuarioChange.onSingleChange}
                      maxLength={6}
                      pattern={"[0-9]{6}"}
                      mensajeError="Ingrese el RPE (6 dígitos)"/>
          : null}
        {usuario.tipo === TipoUsuarioEnum.BECARIO ?
          <CampoTexto id="email"
                      required
                      type={TipoCampoTexto.Email}
                      value={usuario.email}
                      etiqueta="Usuario(correo)"
                      placeholder="Usuario"
                      onChange={onUsuarioChange.onSingleChange}/>
          : null}
        <CampoTexto id="contraseña"
                    required
                    etiqueta="Contraseña"
                    type="password"
                    placeholder="Contraseña"
                    onChange={onUsuarioChange.onSingleChange}
                    mensajeError="Ingrese una contraseña"/>
      </Form>
    )
  }

  function valida() {
    return (document.getElementById(formLoginId) as HTMLFormElement).reportValidity()
  }
}


export default FormularioLogin;
