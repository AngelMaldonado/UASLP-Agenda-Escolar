import {useQuery} from "react-query";
import ServicioCatEvento from "../services/ServicioCatEvento.ts";

export const useObtenCatEventos = () => {
  const {
    data: cat_eventos,
    isLoading
  } = useQuery({
    queryKey: "cat_eventos",
    queryFn: ServicioCatEvento.obten
  })
  return {cat_eventos: cat_eventos, isLoading}
}
