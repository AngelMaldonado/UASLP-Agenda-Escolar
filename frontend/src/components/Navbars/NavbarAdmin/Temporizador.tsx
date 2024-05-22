import {useExtiendeSesion, useObtenSesion} from "../../../hooks/HookSesion.ts";
import {TemaComponente} from "../../../utils/Tipos.ts";
import Boton from "../../Inputs/Boton";
import {Stack} from "react-bootstrap";
import useTemporizador from "../../../hooks/HookTemporizador.ts";
import {useLogout} from "../../../hooks/HookAutenticacion.ts";
import Modal from "../../Modales/Modal";

export function Temporizador() {
  const {sesion} = useObtenSesion()
  const {extiendeSesion} = useExtiendeSesion()
  const {logout} = useLogout()
  const [horas, minutos, segundos] = useTemporizador(new Date(sesion?.expiracion!))

  return (
    <Stack gap={2} className="Temporizador align-items-center">
      <p className="m-0">
        Tiempo
        restante: {horas >= 10 ? horas : `0${horas}`}:{minutos >= 10 ? minutos : `0${minutos}`}:{segundos >= 10 ? segundos : `0${segundos}`}
      </p>
      <Boton variant={TemaComponente.Secundario}
             disabled={!(horas == 0 && minutos < 5)}
             etiqueta="Extender sesión"
             onClick={extiendeSesion}
      />
      <Boton variant={TemaComponente.Danger}
             etiqueta="Cerrar sesión"
             onClick={logout}
      />
      {horas == 0 && minutos == 5 ?
        <Modal mostrar sinFondo
               contenido={<p className="text-center">Su sesión está apunto de caducar, ¿desea extender su sesión?</p>}
               cancelar
               botones={[
                 <Boton key={"boton-extender"}
                        variant={TemaComponente.PrimarioInverso}
                        etiqueta="Extender (+20 min)"
                        onClick={extiendeSesion}
                 />,
               ]}
        />
        : null}
    </Stack>
  );
}
