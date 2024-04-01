import {useContext} from "react";
import {AgendaContext} from "./AgendaProvider.tsx";
import {Navigate} from "react-router-dom";

export default function RutaPrivada({children}: { children: React.ReactNode }) {
  const autenticado = useContext(AgendaContext).data.usuario?.autenticado
  return autenticado ? children : <Navigate to="/login"/>
}
