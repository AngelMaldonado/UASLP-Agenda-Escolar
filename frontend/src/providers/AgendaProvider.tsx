import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import Evento from "../models/Evento.ts";
import Filtro from "../models/Filtro.ts";
import {useObtenEventos} from "../hooks/HooksEvento.ts";
import ModalEvento from "../components/Modales/ModalEvento/ModalEvento.tsx";

export enum AgendaContextDataEnum {
  FiltrosUsuario = "filtrosUsuario",
  AñosBusqueda = "añosBusqueda",
  MesesBusqueda = "mesesBusqueda",
  TextoBusqueda = "textoBusqueda",
  Mes = "mes",
  Año = "año",
  Eventos = "eventos",
  EventoActual = "eventoActual",
}

type DataContextType = {
  filtrosUsuario?: Filtro[],
  añosBusqueda?: number[],
  mesesBusqueda?: number[],
  textoBusqueda?: string,
  mes?: number,
  año?: number,
  eventos?: Evento[],
  eventoActual?: Evento
}

type AgendaContextType = { data: DataContextType, setData: Dispatch<SetStateAction<DataContextType>> }

export const AgendaContext = createContext<AgendaContextType>({
  data: {},
  setData: () => undefined,
})

export default function AgendaProvider({children}: { children: React.ReactNode }) {
  const {eventos} = useObtenEventos()

  const [contexto, setContexto] = useState<DataContextType>({
    eventos: eventos,
    eventoActual: undefined,
    filtrosUsuario: [],
    textoBusqueda: "",
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),
  })

  useEffect(() => setContexto(prevState =>
    ({
      ...prevState,
      eventos: Evento.FiltraEventos(
        contexto.filtrosUsuario,
        contexto.textoBusqueda,
        eventos
      ),
    })
  ), [
    eventos,
    contexto.filtrosUsuario,
    contexto.textoBusqueda,
    contexto.añosBusqueda,
    contexto.mesesBusqueda,
    contexto.mes,
    contexto.año
  ]);

  return (
    <AgendaContext.Provider value={{data: contexto, setData: setContexto}}>
      {children}
      <ModalEvento/>
    </AgendaContext.Provider>
  )
}
