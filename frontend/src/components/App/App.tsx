/**
 * Universidad Autónoma de San Luis Potosí, Facultad de Ingeniería
 *
 * - App.tsx
 * - Componente padre del frontend, en este componente se instancia
 *   ReactQuery y se definen los componentes que se utilizarán para
 *   renderizar las distintas rutas, además de la protección a la ruta
 *   de administración.
 */

/** Importación de bibliotecas y dependencias **/
import "./_app.scss";
import {Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";
import Login from "../../screens/Login";
import Entrar from "../../components/User/Auth/Login.tsx";
import Register from "../../components/User/Register/Register.tsx";
import axios from "axios";
import RutaPrivada from "../../providers/RutaPrivada.tsx";
import AgendaProvider from "../../providers/AgendaProvider.tsx";
import {Configuraciones} from "../../utils/Constantes.ts";

/** Instanciación de la dependencia de QueryClient **/
const queryClient = new QueryClient();
// Establece que por defecto las peticiones tendrán credenciales (tokens)
axios.defaults.withCredentials = true
// Establece que por defecto axios recibirá respuestas en formato json
axios.defaults.headers["Accept"] = "applicacion/json"
axios.defaults.headers.common = {"Authorization": localStorage.getItem("token")}

/**
 * Intenta obtener la cookie del backend para establecer la comunicación
 * con el servicio, si no se logra, arrojar un error y mostrarlo en consola
 **/
try {
  await axios.get(Configuraciones.sanctumURL + "csrf-cookie")
} catch (error) {
  console.log(error)
}

/**
 * Función principal del componente App
 *
 * Establece como componente padre QueryClientProvider para
 * los componentes hijos tengan acceso al servicio, seguido del
 * AgendaProvider que contiene el contexto general del frontend
 * (usuarios activos, eventos, filtros, filtros elegidos, etc.).
 *
 * Las rutas las envuelve el componente Routes, dentro esta cada
 * ruta individual definida por su path (url) y su elemento
 * (componente), para el caso de la ruta de administración, queda
 * protegida por el componente RutaPrivada, el cual valida que el
 * cliente (usuario) este validado en el sistema para darle acceso
 * a tal ruta.
 **/
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AgendaProvider>
        <Routes>
          <Route path="/" element={<Publico/>}/>
          <Route
            path="/administracion"
            element={
              <RutaPrivada>
                <Administrador/>
              </RutaPrivada>
            }
          />
          <Route path="/login" element={<Login/>}/>
          <Route path="/entrar" element={<Entrar/>}/>
          <Route path="/registro" element={<Register/>}/>
        </Routes>
      </AgendaProvider>
    </QueryClientProvider>
  )
}

/** Exporta el componente App **/
export default App;
