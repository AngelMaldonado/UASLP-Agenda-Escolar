import {SetStateAction, useContext} from "react";
import {AgendaContext} from "../providers/AgendaProvider.tsx";

export default function useObjectAttributeChange(setObject: (state: SetStateAction<object>) => void) {
  return ((field: string, value: any) => setObject(prevState => ({...prevState, [field]: value})))
}

export function useObjectChangeTimeout(setObject: (state: SetStateAction<object>) => void) {
  return ((object: object) => {
    setObject(object)
    setTimeout(() => setObject({}), 5000)
  })
}

export function useCambiaContexto() {
  const {setData} = useContext(AgendaContext)
  const cambiaContexto = useObjectAttributeChange(setData)
  return {cambiaContexto}
}
