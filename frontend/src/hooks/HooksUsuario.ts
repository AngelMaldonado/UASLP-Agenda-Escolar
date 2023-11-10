import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioUsuario from "../services/ServicioUsuario.ts";

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

export const useAgregaUsuario = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaUsuario
  } = useMutation({
    mutationFn: ServicioUsuario.nuevo,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios")
      onSuccess()
    }
  })
  return {agregaUsuario}
}

export const useModificaUsuario = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: modificaUsuario
  } = useMutation({
    mutationFn: ServicioUsuario.modifica,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios")
      onSuccess()
    }
  })
  return {modificaUsuario}
}
///Agregar funcion deeliminar   /checar funcion del QueryClient

export const useEliminaUsuario = (onSuccess: () => void) => {
  const queryClient = useQueryClient()
  const {
    mutate: eliminaUsuario
  } = useMutation({
    mutationFn: ServicioUsuario.elimina,
    onSuccess: () => {
      queryClient.invalidateQueries("usuarios")
      onSuccess()
    }
  })
  return {eliminaUsuario}
}
