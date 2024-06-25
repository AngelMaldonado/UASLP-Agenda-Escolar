import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import ServicioAutenticacion from "../services/ServicioAutenticacion.ts";
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction} from "react";
import Usuario from "../models/Usuario.ts";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";
import {useObtenSesion} from "./HookSesion.ts";

export const useLogin = (setErrors: Dispatch<SetStateAction<object>>) => {
  const onBackendErrors = useObjectChangeTimeout(setErrors as Dispatch<SetStateAction<object>>)
  const navigate = useNavigate()
  const {refetch} = useObtenSesion()

  const {
    mutate: login,
    isSuccess,
    isLoading
  } = useMutation({
    mutationFn: ServicioAutenticacion.login,
    onSuccess: (respuesta) => {
      if (respuesta.status == 200) {
        localStorage.setItem("token", `Bearer ${(<Usuario>respuesta.data).token}`)
        axios.defaults.headers.common = {"Authorization": localStorage.getItem("token")}
        refetch().then(() => navigate("/administracion"))
      } else onBackendErrors((<ErrorsObject>respuesta.data).errors)
    },
    onError: (error: AxiosError<ErrorsObject>) => onBackendErrors((error.response!.data.errors))
  })

  return {login, autenticacionExitosa: isSuccess, isLoading}
}

export const useLogout = () => {
  const navigate = useNavigate()

  const {
    mutate: logout,
    isLoading
  } = useMutation({
    mutationFn: ServicioAutenticacion.logout,
    onSuccess: () => {
      localStorage.removeItem("token")
      navigate("/")
    },
  })
  return {logout: logout, saliendo: isLoading}
}
