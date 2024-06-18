import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioSesion from "../services/ServicioSesion.ts";
import {modalTimeout} from "../utils/Constantes.ts";

export const useObtenSesion = () => {
  const {
    data: sesion,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["sesion"],
    queryFn: () => ServicioSesion.obtenSesion(),
    onError: (_) => localStorage.removeItem("token"),
  })
  return {sesion, isLoading, refetch}
}

export const useExtiendeSesion = () => {
  const queryClient = useQueryClient()

  const {
    mutate: extiendeSesion,
    isSuccess,
    isLoading,
    reset
  } = useMutation({
    mutationFn: ServicioSesion.extiendeSesion,
    onSuccess: () => {
      queryClient.invalidateQueries("sesion")
      setTimeout(() => reset(), modalTimeout)
    },
    onError: (_) => localStorage.removeItem("token"),
  })
  return {extiendeSesion, extensionExitosa: isSuccess, extendiendo: isLoading}
}
