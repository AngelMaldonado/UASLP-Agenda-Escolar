import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import Evento from "../models/Evento.ts";
import Filtro from "../models/Filtro.ts";
import {useObtenEventos} from "../hooks/HooksEvento.ts";
import {useObtenFiltros} from "../hooks/HooksFiltro.ts";
import ModalEvento from "../components/Modales/ModalEvento/ModalEvento.tsx";

type DataContextType = {
  filtros?: Filtro[],
  filtrosUsuario?: Filtro[],
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
  const {filtros} = useObtenFiltros()

  const [contexto, setContexto] = useState<DataContextType>({
    filtros: filtros,
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
      filtros: filtros,
      eventos: Evento.FiltraEventos(contexto.mes!, contexto.año!, contexto.filtrosUsuario, contexto.textoBusqueda, eventos),
    })
  ), [eventos, filtros, contexto.filtrosUsuario, contexto.textoBusqueda, contexto.mes, contexto.año]);

  return (
    <AgendaContext.Provider value={{data: contexto, setData: setContexto}}>
      {children}
      <ModalEvento/>
    </AgendaContext.Provider>
  )
}
