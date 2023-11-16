import Boton from '../Boton';
import Card from 'react-bootstrap/Card';
import { TemaComponente } from '../../utils/Utils';
import Campo from '../Campo';

function LoginAdmin() {
  return (
    <Card style={{ width: '28rem' }} className="mx-auto">
      <Card.Header as="h5"  className="bg-primary text-center text-white py-3">Administracion Agenda | Calendario</Card.Header>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Campo id='email' etiqueta='Usuario(correo)' placeholder="Usuario"/>
        <Campo id='apellido' etiqueta='Contraseña' placeholder="Contraseña"/>
        
        
      </Card.Body>
      <Card.Footer className="text-muted d-flex justify-content-around py-3">
        <Boton key={"Recuperar Contraseña"} variant={TemaComponente.Secundario} etiqueta='Recuperar Contraseña' 
          onClick={() => {

            }
            }
        />
        <Boton key={"Iniciar Sesion"} variant={TemaComponente.PrimarioInverso} etiqueta='Iniciar Sesión'/>
      </Card.Footer>
    </Card>
  );
}


export default LoginAdmin;