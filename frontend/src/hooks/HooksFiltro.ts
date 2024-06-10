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
    queryFn: ServicioFiltros.obten
  })
  return {filtros: filtros, isLoading}
}

export const useAgregaFiltro = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaFiltro,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioFiltros.nuevo,
    onSuccess: () => queryClient.invalidateQueries("filtros"),
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {agregaFiltro, registroExitoso: isSuccess, reset}
}

export const useModificaFiltro = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaFiltro,
    isSuccess,
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
  return {modificaFiltro, modificacionExitosa: isSuccess, reset}
}

export const useEliminaFiltro = (onError: ({}) => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaFiltro,
    isSuccess,
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
  return {eliminaFiltro, eliminacionExitosa: isSuccess, reset}
}
