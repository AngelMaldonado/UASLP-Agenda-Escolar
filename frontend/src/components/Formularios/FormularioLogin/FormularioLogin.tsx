import Boton from '../../Inputs/Boton';
import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import {TemaComponente} from '../../../utils/Utils.ts';
import Campo from '../../Inputs/Campo';
import "./_formularioLogin.scss"

function FormularioLogin() {
  return (
    <Container className="my-5">
      <Card className="FormularioLogin">
        <Card.Header as="h6" className="text-center text-white py-3">Administracion Agenda | Calendario</Card.Header>
        <Card.Body className="fs-6">
          <Campo id='email' etiqueta='Usuario(correo)' placeholder="Usuario"/>
          <Campo id='apellido' etiqueta='Contraseña' placeholder="Contraseña"/>
        </Card.Body>
        <Card.Footer className="d-flex gap-2 py-3">
          <Boton key={"Recuperar Contraseña"}
                 variant={TemaComponente.Secundario}
                 etiqueta='Recuperar Contraseña'
                 onClick={() => {
                 }}
          />
          <Boton key={"Iniciar Sesion"}
                 variant={TemaComponente.PrimarioInverso}
                 etiqueta='Iniciar Sesión'
          />
        </Card.Footer>
      </Card>
    </Container>
  );
}


export default FormularioLogin;
