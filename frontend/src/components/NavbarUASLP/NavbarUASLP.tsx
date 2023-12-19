import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import {Image} from "react-bootstrap";

export default function NavbarUASLP() {
  return (
    <Nav className="NavbarUASLP navbar-expand py-2">
      <Container className="d-flex gap-3 p-4">
        <a href="https://www.uaslp.mx/">
          <Image fluid className="h-100" src="/logo_uaslp.svg" alt="Logo uaslp"/>
        </a>
        <div className="vr"></div>
        <a href="https://www.ingenieria.uaslp.mx/">
          <Image fluid className="h-100" src="/logo_ingenieria.svg" alt="Logo ingenieria"/>
        </a>
      </Container>
    </Nav>
  );
}
