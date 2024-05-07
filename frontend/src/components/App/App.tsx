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
import Configuraciones from "../../utils/Configuraciones.ts";

const queryClient = new QueryClient();
try {
  axios.defaults.withCredentials = true
  axios.defaults.headers["Accept"] = "applicacion/json"
  await axios.get(Configuraciones.sanctumURL + "csrf-cookie")
} catch (_) {
}

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

export default App;
