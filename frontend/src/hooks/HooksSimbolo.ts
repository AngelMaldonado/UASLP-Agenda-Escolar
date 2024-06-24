import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioSimbolos from "../services/ServicioSimbolos.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import {modalTimeout} from "../utils/Constantes.ts";

export const useObtenSimbolos = () => {
  const {
    data: simbolos,
    isLoading
  } = useQuery({
    queryKey: "simbolos",
    queryFn: ServicioSimbolos.obten,
    refetchOnMount: false
  })
  return {simbolos: simbolos, isLoading}
}

export const useAgregaSimbolo = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaSimbolo,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.nuevo,
    onSuccess: () => queryClient.invalidateQueries("simbolos"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {agregaSimbolo, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaSimbolo = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaSimbolo,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.modifica,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("simbolos")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {modificaSimbolo, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaSimbolo = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaSimbolo,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.elimina,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("simbolos")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {eliminaSimbolo, eliminacionExitosa: isSuccess, eliminando: isLoading, reset}
}
