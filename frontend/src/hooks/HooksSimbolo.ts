import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioSimbolos from "../services/ServicioSimbolos.ts";

export const useObtenSimbolos = () => {
  const {
    data: simbolos,
    isLoading
  } = useQuery({
    queryKey: "simbolos",
    queryFn: ServicioSimbolos.obten
  })
  return {simbolos: simbolos, isLoading}
}

export const useAgregaSimbolo = () => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaSimbolo
  } = useMutation({
    mutationFn: ServicioSimbolos.nuevo,
    onSuccess: () => queryClient.invalidateQueries("simbolos")
  })
  return {agregaSimbolo: agregaSimbolo}
}

export const useModificaSimbolo = () => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaSimbolo
  } = useMutation({
    mutationFn: ServicioSimbolos.modifica,
    onSuccess: () => queryClient.invalidateQueries("simbolos")
  })
  return {modificaSimbolo: modificaSimbolo}
}

export const useEliminaSimbolo = () => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaSimbolo
  } = useMutation({
    mutationFn: ServicioSimbolos.elimina,
    onSuccess: () => queryClient.invalidateQueries("simbolos")
  })
  return {eliminaSimbolo: eliminaSimbolo}
}
