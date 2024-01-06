import './_login.scss'
import FormularioLogin from '../../components/Formularios/FormularioLogin';
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Container from "react-bootstrap/Container";

export default function Login() {
  return (
    <Container fluid className="p-0 vh-100">
      <NavbarUASLP/>
      <FormularioLogin/>
    </Container>
  );
}
