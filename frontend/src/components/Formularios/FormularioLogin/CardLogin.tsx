import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Boton from "../../Inputs/Boton";
import {TemaComponente} from "../../../utils/Utils.ts";
import FormularioLogin from "./FormularioLogin.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import Usuario from "../../../models/Usuario.ts";
import useModelChange from "../../../hooks/HookModelChange.ts";
import {ValidationError} from "yup";
import {useLogin} from "../../../hooks/HookAutenticacion.ts";

function CardLogin() {
  const [usuario, setUsuario] = useState(new Usuario())
  const [errores, setErrores] = useState({})

  const onUsuarioChange = useModelChange(setUsuario as Dispatch<SetStateAction<Object>>)
  const {login} = useLogin((data: {}) => {
    setErrores(data)
    setTimeout(() => setErrores({}), 5000)
  })

  return (
    <Container className="mt-5">
      <Card className="FormularioLogin border">
        <Card.Header as="h6" className="text-center text-white py-3">
          Administración Agenda | Calendario
        </Card.Header>
        <Card.Body>
          <FormularioLogin usuario={usuario} setUsuario={onUsuarioChange} errores={errores}/>
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
      .catch((r: ValidationError) => {
        setErrores({[r.path!]: r.errors})
        setTimeout(() => setErrores({}), 5000)
      })
  }
}

export default CardLogin
