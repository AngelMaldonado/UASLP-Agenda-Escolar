import './App.css'

import {Route, Routes} from "react-router-dom";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";

import '../Klendario/styles.css'; // Importa los estilos del calendario

function App() {
  //const [selectedDate, setSelectedDate] = useState(new Date());

  /*
  const handleDateChange = (date: Date) => {
    console.log('Fecha seleccionada:', date);
    // Aquí puedes realizar acciones adicionales con la fecha seleccionada
    setSelectedDate(date);
  };

   */


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
