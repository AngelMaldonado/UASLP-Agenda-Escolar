import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioEvento from "../services/ServicioEvento.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import {modalTimeout} from "../utils/Constantes.ts";

export const useObtenEventos = () => {
  const {
    data: eventos,
    isLoading,
  } = useQuery({
    queryKey: ["eventos"],
    queryFn: () => ServicioEvento.obtenEventos()
  })
  return {eventos: eventos, isLoading}
}

export const useAgregaEvento = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaEvento,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioEvento.nuevo,
    onSuccess: () => queryClient.invalidateQueries("eventos"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {agregaEvento, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaEvento = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaEvento,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioEvento.modifica,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("eventos")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {modificaEvento, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaEvento = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaEvento,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioEvento.elimina,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("eventos")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {eliminaEvento, eliminacionExitosa: isSuccess, eliminando: isLoading, reset}
}
