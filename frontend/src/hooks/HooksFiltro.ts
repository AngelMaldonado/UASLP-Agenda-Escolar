import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioFiltros from "../services/ServicioFiltros.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import {modalTimeout} from "../utils/Constantes.ts";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";

export const useObtenFiltros = () => {
  const {
    data: filtros,
    isLoading
  } = useQuery({
    queryKey: "filtros",
    queryFn: ServicioFiltros.obten,
    refetchOnMount: false
  })
  return {filtros: filtros, isLoading}
}

export const useAgregaFiltro = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: agregaFiltro,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.nuevo,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        queryClient.invalidateQueries("filtros")
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data.errors)
  })
  return {agregaFiltro, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaFiltro = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: modificaFiltro,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.modifica,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("filtros")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data!.errors)
  })
  return {modificaFiltro, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaFiltro = (onError: (obj: object) => void) => {
  const queryClient = useQueryClient()
  const onBackendErrors = useObjectChangeTimeout(onError)

  const {
    mutate: eliminaFiltro,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.elimina,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200)
        setTimeout(() => {
          queryClient.invalidateQueries("filtros")
        }, modalTimeout)
      else onBackendErrors(<ErrorsObject>respuesta!.data!.errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors(error.response!.data.errors)
  })
  return {eliminaFiltro, eliminacionExitosa: isSuccess, eliminando: isLoading, reset}
}
