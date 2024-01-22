import './_app.scss'

import {Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import Publico from "../../screens/Publico";
import Administrador from "../../screens/Administrador";
import Card from '../../screens/Card/Card';
import Login from "../../screens/Login";

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Publico/>}/>
          <Route path="/administracion" element={<Administrador/>}/>
          <Route path="/card" element={<Card/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App;
