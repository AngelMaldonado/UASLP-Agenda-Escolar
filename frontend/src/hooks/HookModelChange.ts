import {SetStateAction} from "react";
import Modelo from "../models/Modelo.ts";

export default function useModelChange(setModel: (state: SetStateAction<Modelo>) => void) {
  return {
    onSingleChange: (field: string, value: any) => setModel(prevState => ({...prevState, [field]: value})),
    onMultipleChange: (field: string, value: any) => setModel(prevState => ({...prevState, [field]: value}))
  }
}
