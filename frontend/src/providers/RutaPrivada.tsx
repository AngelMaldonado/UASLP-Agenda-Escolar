import {useObtenSesion} from "../hooks/HookSesion.ts";
import React from "react";
import {Navigate} from "react-router-dom";

export default function RutaPrivada({children}: { children: React.ReactNode }) {
  const {sesion, isLoading} = useObtenSesion()

  if (!isLoading)
    return sesion?.usuario ? children : <Navigate to="/login"/>
}
