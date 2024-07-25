import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioEvento from "../services/ServicioEvento.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import {modalTimeout} from "../utils/Constantes.ts";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";

export const useObtenEventos = () => {
  const {
    data: eventos,
    isFetching,
  } = useQuery({
    queryKey: "eventos",
    queryFn: () => ServicioEvento.obtenEventos()
  })
  return {eventos: eventos, cargandoEventos: isFetching}
}

export const useAgregaEvento = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: agregaEvento,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioEvento.nuevo,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        queryClient.invalidateQueries("eventos")
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {agregaEvento, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaEvento = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: modificaEvento,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioEvento.modifica,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("eventos")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {modificaEvento, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaEvento = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: eliminaEvento,
    isSuccess,
    isLoading,
  } = useMutation({
    mutationFn: ServicioEvento.elimina,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("eventos")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {eliminaEvento, eliminacionExitosa: isSuccess, eliminando: isLoading}
}
