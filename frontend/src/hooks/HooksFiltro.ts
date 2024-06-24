import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioFiltros from "../services/ServicioFiltros.ts";
import {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import {modalTimeout} from "../utils/Constantes.ts";

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

export const useAgregaFiltro = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaFiltro,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.nuevo,
    onSuccess: () => queryClient.invalidateQueries("filtros"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {agregaFiltro, registroExitoso: isSuccess, agregando: isLoading, reset}
}

export const useModificaFiltro = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaFiltro,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.modifica,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("filtros")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {modificaFiltro, modificacionExitosa: isSuccess, modificando: isLoading, reset}
}

export const useEliminaFiltro = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaFiltro,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.elimina,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries("filtros")
      }, modalTimeout)
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {eliminaFiltro, eliminacionExitosa: isSuccess, eliminando: isLoading, reset}
}
