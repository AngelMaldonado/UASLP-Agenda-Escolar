import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioSimbolos from "../services/ServicioSimbolos.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";

export const useObtenSimbolos = () => {
  const {
    data: simbolos,
    isLoading
  } = useQuery({
    queryKey: "simbolos",
    queryFn: ServicioSimbolos.obten
  })
  return {simbolos: simbolos, isLoading}
}

export const useAgregaSimbolo = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaSimbolo,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.nuevo,
    onSuccess: () => queryClient.invalidateQueries("simbolos"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {agregaSimbolo, registroExitoso: isSuccess, reset}
}

export const useModificaSimbolo = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaSimbolo,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.modifica,
    onSuccess: () => queryClient.invalidateQueries("simbolos"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {modificaSimbolo, modificacionExitosa: isSuccess, reset}
}

export const useEliminaSimbolo = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaSimbolo,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.elimina,
    onSuccess: () => queryClient.invalidateQueries("simbolos"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {eliminaSimbolo, eliminacionExitosa: isSuccess, reset}
}
