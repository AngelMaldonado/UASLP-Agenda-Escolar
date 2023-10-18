import './App.css'

import {Route, Routes} from "react-router-dom";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";

import '../Klendario/styles.css'; // Importa los estilos del calendario

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Publico/>}/>
        <Route path="/administracion" element={<Administrador/>}/>
      </Routes>
    </>
  )
}

export default App;
