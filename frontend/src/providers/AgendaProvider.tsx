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
  eventos?: Evento[],
  eventoActual?: Evento
}

type PublicContextType = { data: DataContextType, setData: Dispatch<SetStateAction<DataContextType>> }

export const PublicContext = createContext<PublicContextType>({
  data: {},
  setData: () => undefined,
})

export default function AgendaProvider({children}: { children: React.ReactNode }) {
  const [contexto, setContexto] = useState<DataContextType>({
    filtros: [],
    filtrosUsuario: [],
    textoBusqueda: "",
    mes: new Date().getMonth(),
    eventos: [],
    eventoActual: undefined
  })

  const {eventos} = useObtenEventos(contexto.mes ?? new Date().getMonth())
  const {filtros} = useObtenFiltros()

  useEffect(() => setContexto(prevState =>
    ({
      ...prevState,
      filtros: filtros,
      eventos: Evento.FiltraEventos(contexto.filtrosUsuario, contexto.textoBusqueda, eventos)
    })
  ), [eventos, filtros, contexto.filtrosUsuario, contexto.textoBusqueda, contexto.mes]);

  return (
    <PublicContext.Provider value={{data: contexto, setData: setContexto}}>
      {children}
      <ModalEvento/>
    </PublicContext.Provider>
  )
}
