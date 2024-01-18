import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioFiltros from "../services/ServicioFiltros.ts";

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

export const useAgregaFiltro = () => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaFiltro
  } = useMutation({
    mutationFn: ServicioFiltros.nuevo,
    onSuccess: () => queryClient.invalidateQueries("filtros")
  })
  return {agregaSimbolo: agregaFiltro}
}

export const useModificaFiltro = () => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaFiltro
  } = useMutation({
    mutationFn: ServicioFiltros.modifica,
    onSuccess: () => queryClient.invalidateQueries("filtros")
  })
  return {modificaFiltro: modificaFiltro}
}

export const useEliminaFiltro = () => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaFiltro
  } = useMutation({
    mutationFn: ServicioFiltros.elimina,
    onSuccess: () => queryClient.invalidateQueries("filtros")
  })
  return {eliminaFiltro: eliminaFiltro}
}
