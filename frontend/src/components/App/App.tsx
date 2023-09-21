import './App.css'
import Navbar from "../Navbar";
import Usuarios from "../Usuarios/Usuarios.tsx";

function App() {

  return (
    <>
      <Navbar/>
      <div className="BarraFiltro"></div>
      <div className="BarraAdmin"></div>
      <Usuarios />
    </>
  )
}

export default App
