import './App.css'

import {Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";
import Card from '../../screens/Card/Card';

import '../Klendario/styles.css'; // Importa los estilos del calendario

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Publico/>}/>
          <Route path="/administracion" element={<Administrador/>}/>
          <Route path="/card" element={<Card/>}/>
       </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App;
