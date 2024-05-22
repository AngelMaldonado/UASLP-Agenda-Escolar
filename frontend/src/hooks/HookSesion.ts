import {useMutation, useQuery, useQueryClient} from "react-query";
import ServicioSesion from "../services/ServicioSesion.ts";

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
  } = useMutation({
    mutationFn: ServicioSesion.extiendeSesion,
    onSuccess: () => queryClient.invalidateQueries("sesion"),
    onError: (_) => localStorage.removeItem("token"),
  })
  return {extiendeSesion}
}
