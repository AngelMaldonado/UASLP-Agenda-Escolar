import {Button, Image} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {useContext} from "react";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";
import {useLogout} from "../../../hooks/HookAutenticacion.ts";

export default function NavbarUASLP() {
  const usuario = useContext(AgendaContext).data.usuario

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
        {divCerrarSesion()}
      </Container>
    </Nav>
  );

  function divCerrarSesion() {
    if (usuario?.autenticado) {
      const {logout} = useLogout()
      return (
        <div className="Usuario ms-auto d-flex gap-4 align-items-end">
          <h5 className="text-light">Bienvenido, {usuario.nombre}</h5>
          <Button variant="danger" onClick={() => logout()}>Cerrar sesión</Button>
        </div>
      )
    } else return null
  }
}
