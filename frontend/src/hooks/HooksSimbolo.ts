import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioSimbolos from "../services/ServicioSimbolos.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import {modalTimeout} from "../utils/Constantes.ts";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";

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

export const useAgregaSimbolo = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: agregaSimbolo,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.nuevo,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        queryClient.invalidateQueries("simbolos")
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {agregaSimbolo, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaSimbolo = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: modificaSimbolo,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.modifica,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("simbolos")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {modificaSimbolo, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaSimbolo = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: eliminaSimbolo,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSimbolos.elimina,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("simbolos")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {eliminaSimbolo, eliminacionExitosa: isSuccess, eliminando: isLoading, reset}
}
