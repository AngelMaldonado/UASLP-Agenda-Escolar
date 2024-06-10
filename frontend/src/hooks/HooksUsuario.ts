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

export const useAgregaUsuario = (setErrors: (field: string, value: string) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(setErrors as Dispatch<SetStateAction<Object>>)

  const {
    mutate: agregaUsuario,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.nuevo,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        queryClient.invalidateQueries("usuarios")
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors((error.response!.data.errors))
  })
  return {agregaUsuario, registroExitoso: isSuccess, reset}
}

export const useModificaUsuario = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaUsuario,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.modifica,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("usuarios")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {modificaUsuario, modificacionExitosa: isSuccess, reset}
}

export const useEliminaUsuario = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaUsuario,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.elimina,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("usuarios")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {eliminaUsuario: eliminaUsuario, eliminacionExitosa: isSuccess, reset}
}
