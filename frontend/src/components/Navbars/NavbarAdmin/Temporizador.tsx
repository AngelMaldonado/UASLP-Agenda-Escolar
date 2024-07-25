import {useExtiendeSesion, useObtenSesion} from "../../../hooks/HookSesion.ts";
import {TemaComponente} from "../../../utils/Tipos.ts";
import Boton from "../../Inputs/Boton";
import {Spinner, Stack} from "react-bootstrap";
import useTemporizador from "../../../hooks/HookTemporizador.ts";
import {useLogout} from "../../../hooks/HookAutenticacion.ts";
import Modal from "../../Modales/Modal";
import {Navigate} from "react-router-dom";
import {useState} from "react";

export function Temporizador() {
  const {sesion} = useObtenSesion()
  const {extiendeSesion, extendiendo, isError} = useExtiendeSesion()
  const {logout, saliendo} = useLogout()
  const [deshabilitado, setDeshabilitado] = useState<boolean>(false)
  const [horas, minutos, segundos] = useTemporizador(new Date(sesion?.expiracion!))

  if (isError)
    setDeshabilitado(false)

  if (horas < 0 || minutos < 0 || segundos < 0)
    return (<Navigate to='/login'/>)
  else
    return (
      <Stack gap={2} className="Temporizador align-items-center">
        <p className="m-0 mx-2">
          Tiempo
          restante: {horas >= 10 ? horas : `0${horas}`}:{minutos >= 10 ? minutos : `0${minutos}`}:{segundos >= 10 ? segundos : `0${segundos}`}
        </p>
        { horas >= 0 && minutos > 5 ?
          null :
          <Boton variant={TemaComponente.Secundario}
                 icono={extendiendo ?
                   <Spinner animation="border" role="status" size="sm">
                     <span className="visually-hidden">Loading...</span>
                   </Spinner>
                   : undefined
                 }
                 disabled={deshabilitado}
                 etiqueta={!extendiendo ? "Extender sesión" : "Extendiendo..."}
                 onClick={() => {
                   extiendeSesion()
                   setDeshabilitado(true)
                 }}
          />
        }
        <Boton variant={TemaComponente.Danger}
               icono={saliendo ?
                 <Spinner animation="border" role="status" size="sm">
                   <span className="visually-hidden">Loading...</span>
                 </Spinner>
                 : undefined
               }
               disabled={saliendo}
               etiqueta={!saliendo ? "Cerrar sesión" : "Saliendo..."}
               onClick={logout}
        />
        {horas == 0 && minutos == 5 ?
          <Modal mostrar sinFondo onShow={() => setDeshabilitado(false)}
                 contenido={<p className="text-center">Su sesión está apunto de caducar, ¿desea extender su
                   sesión?</p>}
                 cancelar={!deshabilitado}
                 botones={[
                   <Boton key={"boton-extender"}
                          variant={TemaComponente.PrimarioInverso}
                          icono={extendiendo ?
                            <Spinner animation="border" role="status" size="sm">
                              <span className="visually-hidden">Loading...</span>
                            </Spinner>
                            : undefined
                          }
                          disabled={deshabilitado}
                          etiqueta={!extendiendo ? "Extender (+20 min)" : "Extendiendo..."}
                          onClick={() => {
                            extiendeSesion()
                            setDeshabilitado(true)
                          }}
                   />,
                 ]}
          />
          : null}
      </Stack>
    );
}
