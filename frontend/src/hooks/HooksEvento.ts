import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioEvento from "../services/ServicioEvento.ts";

export const useObtenEventos = (mes: number) => {
  const {
    data: eventos,
    isLoading
  } = useQuery({
    queryKey: "eventos",
    queryFn: () => ServicioEvento.obtenEventos(mes)
  })
  return {eventos: eventos, isLoading}
}

export const useAgregaEvento = () => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaEvento
  } = useMutation({
    mutationFn: ServicioEvento.nuevo,
    onSuccess: () => queryClient.invalidateQueries("eventos")
  })
  return {agregaEvento}
}

export const useModificaEvento = () => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaEvento
  } = useMutation({
    mutationFn: ServicioEvento.modifica,
    onSuccess: () => queryClient.invalidateQueries("eventos")
  })
  return {modificaEvento}
}
///Agregar funcion deeliminar   /checar funcion del QueryClient

export const useEliminaEvento = () => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaEvento
  } = useMutation({
    mutationFn: ServicioEvento.elimina,
    onSuccess: () => queryClient.invalidateQueries("eventos")
  })
  return {eliminaEvento}
}
