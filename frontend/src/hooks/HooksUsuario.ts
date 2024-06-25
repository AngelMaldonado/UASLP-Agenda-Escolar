import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioUsuario from "../services/ServicioUsuario.ts";
import {AxiosError} from "axios"
import {ErrorsObject} from "../utils/Tipos.ts";
import {Dispatch, SetStateAction} from "react";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";
import {modalTimeout} from "../utils/Constantes.ts";

export const useObtenUsuarios = () => {
  const {
    data: usuarios,
    isLoading
  } = useQuery({
    queryKey: "usuarios",
    queryFn: ServicioUsuario.obtenUsuarios
  })
  return {usuarios, isLoading}
}

export const useAgregaUsuario = (setErrors: Dispatch<SetStateAction<object>>) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(setErrors)

  const {
    mutate: agregaUsuario,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.nuevo,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        queryClient.invalidateQueries("usuarios")
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data.errors)
  })
  return {agregaUsuario, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaUsuario = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: modificaUsuario,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.modifica,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("usuarios")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data.errors)
  })
  return {modificaUsuario, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaUsuario = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: eliminaUsuario,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.elimina,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("usuarios")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onError(error.response!.data!.errors)
  })
  return {eliminaUsuario: eliminaUsuario, eliminacionExitosa: isSuccess, eliminando: isLoading, reset}
}
