import './App.css'

import {Route, Routes} from "react-router-dom";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";
import Card from '../../screens/Card/Card';

import '../Klendario/styles.css'; // Importa los estilos del calendario

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Publico/>}/>
        <Route path="/administracion" element={<Administrador/>}/>
        <Route path="/card" element={<Card/>}/>
      </Routes>
    </>
  )
}

export default App;
