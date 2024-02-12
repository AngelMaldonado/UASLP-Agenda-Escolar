// TODO: corregir que al escribir fechas manualmente no se asigna el tipo al valor de FORMAL
// TODO: al hacer menor fecha_fin con teclas ocurre error por el atributo min

import "./_formulario-evento.scss"
import Evento from "../../../models/Evento.ts"
import {Form} from "react-bootstrap";
import {useState} from "react";
import {useObtenCatEventos} from "../../../hooks/HookCatEvento.ts";
import {useObtenSimbolos} from "../../../hooks/HooksSimbolo.ts";
import {useObtenFiltros} from "../../../hooks/HooksFiltro.ts";
import {ErrorsObject} from "../../../utils/Utils.ts";
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
  setEvento: ((field: string, value: string | Date | number | string[] | number[]) => void),
  errores: ErrorsObject
}

function FormularioEvento(props: FormularioNuevoEventoProps) {
  const [errores, setErrores] = useState({})

  const {cat_eventos} = useObtenCatEventos()
  const {simbolos} = useObtenSimbolos()
  const {filtros} = useObtenFiltros()


  return (
    <Formal schema={Evento.schema}
            defaultValue={props.evento}
            errors={{...errores, ...props.errores}}
            onError={errors => setErrores(errors)}>
      <span className="text-muted fst-italic">Campos requeridos *</span>
      <Form.Group>
        <CampoTipoEvento evento={props.evento} setEvento={props.setEvento}/>
        <CampoNombreEvento evento={props.evento} setEvento={props.setEvento} cat_eventos={cat_eventos}/>
        <CampoSimbologia evento={props.evento} setEvento={props.setEvento} simbolos={simbolos}/>
        <CampoImagen evento={props.evento} setEvento={props.setEvento}/>
        <CampoFiltros evento={props.evento} setEvento={props.setEvento} filtros={filtros}/>
        <CampoFechas evento={props.evento} setEvento={props.setEvento}/>
        <CampoHipervinculos evento={props.evento} setEvento={props.setEvento}/>
        <CampoDescripcion evento={props.evento} setEvento={props.setEvento}/>
      </Form.Group>
    </Formal>
  );

  function obtenSimbolo() {
    if (props.evento.tipo == 'catalogo') {
      // Busca el evento del catálogo
      const cat_evento = cat_eventos?.find(c => c.id === props.evento.cat_evento_id)
      // Busca el símbolo correspondiente al catálogo
      const simbolo = simbolos?.find(s => s.id === cat_evento?.simbolo_id)
      if (simbolo)
        return {value: simbolo.id, label: simbolo.simbolo as string}
    } else if (props.evento.tipo == 'facultad') {
      // Busca el símbolo
      const simbolo = props.evento.simbolo_id ?
        simbolos?.find(s => s.id === (props.evento.simbolo_id as number)) : undefined
      if (simbolo)
        return {value: simbolo.id, label: simbolo.simbolo as string}
    }
    return null
  }

  function obtenFiltros() {
    let filtrosOpciones: { value: number, label: string }[] = []
    if (props.evento.filtros && filtros) {
      props.evento.filtros.forEach(filtro => {
        filtros.find(f => {
          if (f.id == filtro)
            filtrosOpciones.push({value: filtro, label: f.nombre})
        })
      })
    }
    return filtrosOpciones
  }
}

export default FormularioEvento
