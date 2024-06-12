import {Image} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo_ingenieria from "../../../assets/logo_ingenieria.svg"
import logo_uaslp from "../../../assets/logo_uaslp.svg"

export default function NavbarUASLP() {
  return (
    <Nav className="NavbarUASLP navbar-expand py-2">
      <Container className="d-flex gap-3 p-4">
        <a href="https://www.uaslp.mx/">
          <Image fluid className="h-100" src={logo_uaslp} alt="Logo uaslp"/>
        </a>
        <div className="vr"></div>
        <a href="https://www.ingenieria.uaslp.mx/">
          <Image fluid className="h-100" src={logo_ingenieria} alt="Logo ingenieria"/>
        </a>
      </Container>
    </Nav>
  );
}
