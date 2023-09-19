import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import Usuarios from './components/Usuarios/Usuarios.tsx'
import ModalE from './components/ModalEliminacion/ModalE.tsx'
import 'normalize.css'
import './index.css'
import Form from './components/FormularioAdministrador/Formulario.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Usuarios/>
    <ModalE/>
    
  </React.StrictMode>,
)
