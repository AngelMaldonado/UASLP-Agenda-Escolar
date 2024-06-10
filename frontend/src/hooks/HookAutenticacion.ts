import {useMutation} from "react-query";
import axios, {AxiosError} from "axios";
import {ErrorsObject} from "../utils/Tipos.ts";
import ServicioAutenticacion from "../services/ServicioAutenticacion.ts";
import {useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction} from "react";
import Usuario from "../models/Usuario.ts";
import {useObjectChangeTimeout} from "./HookObjectChange.ts";
import {useObtenSesion} from "./HookSesion.ts";

export const useLogin = (setErrors: (field: string, value: string) => void) => {
  const onBackendErrors = useObjectChangeTimeout(setErrors as Dispatch<SetStateAction<Object>>)
  const navigate = useNavigate()
  const {refetch} = useObtenSesion()

  const {
    mutate: login,
    isSuccess,
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

  return {login, autenticacionExitosa: isSuccess}
}

export const useLogout = () => {
  const navigate = useNavigate()

  const {
    mutate: logout,
  } = useMutation({
    mutationFn: ServicioAutenticacion.logout,
    onSuccess: () => {
      localStorage.removeItem("token")
      navigate("/")
    },
  })
  return {logout: logout}
}