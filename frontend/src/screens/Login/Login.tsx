/**
 * Universidad Autónoma de San Luis Potosí, Facultad de Ingeniería
 *
 * - Login.tsx
 * - Componente contendor de la NavbarUASLP y el formulario para
 *   iniciar sesión
 */

/** Importación de bibliotecas y dependencias **/
import './_login.scss'
import NavbarUASLP from "../../components/Navbars/NavbarUASLP";
import Container from "react-bootstrap/Container";
import CardLogin from "../../components/Formularios/FormularioLogin";
import {useObtenSesion} from "../../hooks/HookSesion.ts";
import {Navigate} from "react-router-dom";

/**
 * Función principal del componente/pantalla Login
 **/
export default function Login() {
  const {sesion, isLoading} = useObtenSesion()

  if (!isLoading) {
    if (sesion?.usuario)
      return <Navigate to={"/administracion"}/>

    return (
      <Container fluid className="p-0 vh-100">
        <NavbarUASLP/>
        <CardLogin/>
      </Container>
    );
  }
}
