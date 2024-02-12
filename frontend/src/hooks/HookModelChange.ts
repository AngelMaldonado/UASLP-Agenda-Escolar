import {SetStateAction} from "react";

export default function useModelChange(setModel: (state: SetStateAction<Object>) => void) {
  return ((field: string, value: any) => setModel(prevState => ({...prevState, [field]: value})))
}
