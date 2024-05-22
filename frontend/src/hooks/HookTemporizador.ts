import {useEffect, useState} from "react";

export default function useTemporizador(fechaObjetivo: Date | string) {
  const tiempoFinal = new Date(fechaObjetivo).getTime()
  const [cuentaRegresiva, setCuentaRegresiva] = useState(
    tiempoFinal - new Date().getTime()
  )

  useEffect(() => {
    const intervalo = setInterval(() => {
      setCuentaRegresiva(tiempoFinal - new Date().getTime())
    }, 1000)

    return () => clearInterval(intervalo)
  }, [cuentaRegresiva])

  return tiempoRestante(cuentaRegresiva)
}

const tiempoRestante = (cuentaRegresiva: number) => {
  const horas = Math.floor(
    (cuentaRegresiva % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((cuentaRegresiva % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((cuentaRegresiva % (1000 * 60)) / 1000);

  return [horas, minutos, seconds];
}
