import Usuario from "../models/Usuario.ts";
import {createContext, Dispatch, SetStateAction, useState} from "react";

type SesionInfoContextType = {
  usuario?: Usuario,
  usuarios?: Usuario[],
}

type SesionContextType = { data: SesionInfoContextType, setData: Dispatch<SetStateAction<SesionInfoContextType>> }

export const SesionContext = createContext<SesionContextType>({
  data: {},
  setData: () => undefined,
})

export default function SesionProvider({children}: { children: React.ReactNode }) {
  const [contexto, setContexto] = useState<SesionInfoContextType>({})
}
