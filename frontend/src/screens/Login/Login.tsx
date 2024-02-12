import './_login.scss'
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Container from "react-bootstrap/Container";
import CardLogin from "../../components/Formularios/FormularioLogin";

export default function Login() {
  return (
    <Container fluid className="p-0 vh-100">
      <NavbarUASLP/>
      <CardLogin/>
    </Container>
  );
}
