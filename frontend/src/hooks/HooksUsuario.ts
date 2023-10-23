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

export const useAgregaUsuario = () => {
  const queryClient = useQueryClient()
  const {
    mutate: agregaUsuario
  } = useMutation({
    mutationFn: ServicioUsuario.nuevo,
    onSuccess: () => queryClient.invalidateQueries("usuarios")
  })
  return {agregaUsuario}
}
