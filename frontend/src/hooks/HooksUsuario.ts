import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioUsuario from "../services/ServicioUsuario.ts";
import {AxiosError} from "axios"
import {ErrorsObject} from "../utils/Utils.ts";
import Usuario from "../models/Usuario.ts";
import {SetStateAction} from "react";

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

export const useAgregaUsuario = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaUsuario,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.nuevo,
    onSuccess: () => queryClient.invalidateQueries("usuarios"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {agregaUsuario, registroExitoso: isSuccess, reset}
}

export const useModificaUsuario = (
  onError: ({}) => void,
  setUsuario?: (state: SetStateAction<Usuario>) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaUsuario,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioUsuario.modifica,
    onSuccess: (data: Usuario) =>
      queryClient.invalidateQueries("usuarios").then(() => setUsuario ? (data) : null),
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
    onSuccess: () => queryClient.invalidateQueries("usuarios"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {eliminaUsuario: eliminaUsuario, eliminacionExitosa: isSuccess, reset}
}
