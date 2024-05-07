import {SetStateAction} from "react";

export default function useObjectAttributeChange(setObject: (state: SetStateAction<Object>) => void) {
  return ((field: string, value: any) => setObject(prevState => ({...prevState, [field]: value})))
}

export function useObjectChangeTimeout(setObject: (state: SetStateAction<Object>) => void) {
  return ((object: {}) => {
    setObject(object)
    setTimeout(() => setObject({}), 5000)
  })
}
