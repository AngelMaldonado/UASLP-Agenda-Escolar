import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import Evento from "../models/Evento.ts";
import Filtro from "../models/Filtro.ts";
import {useObtenEventos} from "../hooks/HooksEvento.ts";
import {useObtenFiltros} from "../hooks/HooksFiltro.ts";
import ModalEvento from "../components/Modales/ModalEvento/ModalEvento.tsx";
import Usuario from "../models/Usuario.ts";

type DataContextType = {
  usuario?: Usuario,
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
  const [contexto, setContexto] = useState<DataContextType>({
    usuario: new Usuario(),
    filtros: [],
    filtrosUsuario: [],
    textoBusqueda: "",
    mes: new Date().getMonth(),
    año: new Date().getFullYear(),
    eventos: [],
    eventoActual: undefined
  })

  const {eventos} = useObtenEventos()
  const {filtros} = useObtenFiltros()

  useEffect(() => setContexto(prevState =>
    ({
      ...prevState,
      filtros: filtros,
      eventos: Evento.FiltraEventos(contexto.filtrosUsuario, contexto.textoBusqueda, eventos),
    })
  ), [eventos, filtros, contexto.filtrosUsuario, contexto.textoBusqueda, contexto.mes]);

  return (
    <AgendaContext.Provider value={{data: contexto, setData: setContexto}}>
      {children}
      <ModalEvento/>
    </AgendaContext.Provider>
  )
}
