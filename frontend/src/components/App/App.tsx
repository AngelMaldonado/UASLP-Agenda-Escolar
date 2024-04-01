import './_app.scss'

import {Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";
import Login from "../../screens/Login";
import axios from "axios"
import RutaPrivada from "../../providers/RutaPrivada.tsx";
import AgendaProvider from "../../providers/AgendaProvider.tsx";
import Configuraciones from "../../utils/Configuraciones.ts";

axios.defaults.withCredentials = true
await axios.get(Configuraciones.sanctumURL + "csrf-cookie")
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AgendaProvider>
        <Routes>
          <Route path="/" element={<Publico/>}/>
          <Route path="/administracion" element={
            <RutaPrivada>
              <Administrador/>
            </RutaPrivada>
          }/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </AgendaProvider>
    </QueryClientProvider>
  )
}

export default App;
