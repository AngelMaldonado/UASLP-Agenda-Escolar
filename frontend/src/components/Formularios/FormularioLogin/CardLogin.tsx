import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Tipos.ts";
import FormularioLogin from "./FormularioLogin.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import Usuario from "../../../models/Usuario.ts";
import useObjectAttributeChange, {useObjectChangeTimeout} from "../../../hooks/HookObjectChange.ts";
import {ValidationError} from "yup";
import {useLogin} from "../../../hooks/HookAutenticacion.ts";

function CardLogin() {
  const [usuario, setUsuario] = useState(new Usuario())
  const [errores, setErrores] = useState({})

  const onUsuarioChange = useObjectAttributeChange(setUsuario as Dispatch<SetStateAction<Object>>)
  const onValidationError = useObjectChangeTimeout(setErrores as Dispatch<SetStateAction<Object>>)
  const {login} = useLogin(setErrores)

  return (
    <Container className="mt-5">
      <Card className="FormularioLogin border">
        <Card.Header as="h6" className="text-center text-white py-3">
          Administración Agenda | Calendario
        </Card.Header>
        <Card.Body>
          <FormularioLogin usuario={usuario}
                           setUsuarioProp={onUsuarioChange}
                           setUsuario={setUsuario}
                           errores={errores}/>
        </Card.Body>
        <Card.Footer className="d-flex gap-2 py-3">
          <Boton key={"iniciar-sesion"}
                 variant={TemaComponente.PrimarioInverso}
                 etiqueta="Iniciar Sesión"
                 onClick={iniciaSesion}
          />
        </Card.Footer>
      </Card>
    </Container>
  );

  function iniciaSesion() {
    Usuario.login_schema.validate(usuario)
      .then(_ => login(usuario))
      .catch((r: ValidationError) => onValidationError({[r.path!]: r.errors}))
  }
}

export default CardLogin
