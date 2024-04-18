import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Utils.ts";
import ServicioAutenticacion from "../services/ServicioAutenticacion.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AgendaContext} from "../providers/AgendaProvider.tsx";
import Usuario from "../models/Usuario.ts";

export const useLogin = (onError: ({}) => void) => {
  const navigate = useNavigate()
  const context = useContext(AgendaContext)

  const {
    mutate: login,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioAutenticacion.login,
    onSuccess: (data) => {
      if (data) {
        context.setData(prevState => ({...prevState, usuario: {...data.data.usuario, autenticado: true}}))
        axios.defaults.headers.common = {"Authorization": `Bearer ${data.data.usuario.token}`}
        navigate("/administracion")
      }
    },
    onError: (error: AxiosError) => onError((<ErrorsObject>error.response!.data!))
  })
  return {login, autenticacionExitosa: isSuccess, reset}
}

export const useLogout = () => {
  const navigate = useNavigate()
  const setData = useContext(AgendaContext).setData
  const {
    mutate: logout,
  } = useMutation({
    mutationFn: ServicioAutenticacion.logout,
    onSuccess: () => {
      setData(prevState => ({...prevState, usuario: new Usuario()}))
      delete axios.defaults.headers.common["Authorization"]
      navigate("/")
    },
  })
  return {logout: logout}
}
