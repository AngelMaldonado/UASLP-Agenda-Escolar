import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Utils.ts";
import ServicioAutenticacion from "../services/ServicioAutenticacion.ts";
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useContext} from "react";
import {AgendaContext} from "../providers/AgendaProvider.tsx";
import Usuario from "../models/Usuario.ts";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";

export const useLogin = (setErrors: (field: string, value: string) => void) => {
  const navigate = useNavigate()
  const context = useContext(AgendaContext)
  const onBackendErrors = useObjectChangeTimeout(setErrors as Dispatch<SetStateAction<Object>>)

  const {
    mutate: login,
    isSuccess,
    reset
  } = useMutation({
    mutationFn: ServicioAutenticacion.login,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200) {
        context.setData(prevState =>
          ({...prevState, usuario: {...<Usuario>respuesta.data, autenticado: true}})
        )
        axios.defaults.headers.common = {"Authorization": `Bearer ${(<Usuario>respuesta.data).token}`}
        navigate("/administracion")
      } else onBackendErrors((<ErrorsObject>respuesta.data).errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors((error.response!.data.errors))
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
