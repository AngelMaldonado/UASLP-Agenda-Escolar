import {Dispatch, SetStateAction, useState} from "react";

export const [errores, setErrores] = useState({});
export const [eliminando, setEliminando] = useState(false);

export const {modificaEvento, modificacionExitosa, reset} = useModificaEvento(setErrores);
export const {eliminaEvento, eliminacionExitosa} = useEliminaEvento(setErrores);
export const cambiaEvento = useModelChange(setEvento as Dispatch<SetStateAction<Object>>);