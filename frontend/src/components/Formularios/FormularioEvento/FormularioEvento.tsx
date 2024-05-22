// TODO: corregir que al escribir fechas manualmente no se asigna el tipo al valor de FORMAL
// TODO: al hacer menor fecha_fin con teclas ocurre error por el atributo min

import "./_formulario-evento.scss"
import Evento from "../../../models/Evento.ts"
import {Form} from "react-bootstrap";
import {useState} from "react";
import {useObtenCatEventos} from "../../../hooks/HookCatEvento.ts";
import {useObtenSimbolos} from "../../../hooks/HooksSimbolo.ts";
import {useObtenFiltros} from "../../../hooks/HooksFiltro.ts";
import Formal from "react-formal";
import {CampoTipoEvento} from "./CampoTipoEvento.tsx";
import {CampoNombreEvento} from "./CampoNombreEvento.tsx";
import {CampoSimbologia} from "./CampoSimbologia.tsx";
import {CampoImagen} from "./CampoImagen.tsx";
import {CampoFiltros} from "./CampoFiltros.tsx";
import {CampoFechas} from "./CampoFechas.tsx";
import {CampoHipervinculos} from "./CampoHipervinculos.tsx";
import {CampoDescripcion} from "./CampoDescripcion.tsx";

type FormularioNuevoEventoProps = {
  evento: Evento,
  setEvento: ((field: string, value: any) => void),
  errores: {}
}

function FormularioEvento(props: FormularioNuevoEventoProps) {
  const [errores, setErrores] = useState({})

  const {cat_eventos} = useObtenCatEventos()
  const {simbolos} = useObtenSimbolos()
  const {filtros} = useObtenFiltros()

  return (
    <Formal schema={Evento.schema}
            value={props.evento}
            errors={{...errores, ...props.errores}}
            onError={errors => setErrores(errors)}
            className="FormularioEvento">
      <span className="text-muted fst-italic">Campos requeridos *</span>
      <Form.Group>
        <CampoTipoEvento evento={props.evento} setEvento={props.setEvento}/>
        <CampoNombreEvento evento={props.evento} setEvento={props.setEvento} cat_eventos={cat_eventos}/>
        <CampoSimbologia evento={props.evento} setEvento={props.setEvento} simbolos={simbolos}/>
        <CampoImagen evento={props.evento} setEvento={props.setEvento}/>
        <CampoFiltros evento={props.evento} setEvento={props.setEvento} filtros={filtros!}/>
        <CampoFechas evento={props.evento} setEvento={props.setEvento}/>
        <CampoHipervinculos evento={props.evento} setEvento={props.setEvento} setErrores={setErrores}/>
        <CampoDescripcion evento={props.evento} setEvento={props.setEvento}/>
      </Form.Group>
    </Formal>
  );
}

export default FormularioEvento
