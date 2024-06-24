import "./_formulario-filtro.scss"
import Filtro from "../../../models/Filtro.ts";
import {Form, Image} from "react-bootstrap";
import {Configuraciones} from "../../../utils/Constantes.ts";
import {useState} from "react";
import Formal from "react-formal";
import Select from "react-select";
import {FiltrosCategoriaOptions, FiltrosCategoriaOptionsType} from "../../../enums/FiltrosEnum.ts";
import img_placeholder from "../../../assets/img_placeholder.svg"

type FormularioFiltroProps = {
  filtro: Filtro,
  setFiltro: ((field: string, value: any) => void),
  errores: {},
}

function FormularioFiltro(props: FormularioFiltroProps) {
  const [errores, setErrores] = useState({})

  return (
    <Formal schema={Filtro.schema}
            defaultValue={props.filtro}
            errors={{...errores, ...props.errores}}
            onError={errors => setErrores(errors)}>
      <span className="text-muted fst-italic">Campos requeridos *</span>
      <Form.Group>
        <Form.Label htmlFor="nombre">Nombre*</Form.Label>
        <Formal.Field name="nombre"
                      className="form-control"
                      placeholder="Nombre del filtro"
                      onChange={e => props.setFiltro("nombre", e.target.value)}
        />
        <Formal.Message for="nombre" className="d-flex text-danger"/>
        <Form.Label htmlFor="categoria">Categoría*</Form.Label>
        <Formal.Field name="categoria"
                      as={Select}
                      className="form-control"
                      classNamePrefix="select"
                      unstyled
                      placeholder="Elija la categoría del filtro"
                      options={FiltrosCategoriaOptions}
                      mapFromValue={{"categoria": option => (option as FiltrosCategoriaOptionsType).value}}
                      mapToValue={props.filtro.categoria ?
                        v =>
                          FiltrosCategoriaOptions.find(o => o.value === v.categoria)
                        : undefined
                      }
                      onChange={(o: FiltrosCategoriaOptionsType) => props.setFiltro("categoria", o.value)}
        />
        <Formal.Message for="categoria" className="d-flex text-danger"/>
        <Form.Label htmlFor="icono">Ícono*</Form.Label>
        <div className="d-flex gap-2 w-100">
          <label className="form-control d-flex justify-content-between" style={{maxWidth: '90%'}}>
            <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {props.filtro.icono && props.filtro.icono instanceof File ?
                props.filtro.icono.name : "Ícono en formato .svg"
              }
            </span>
            <Formal.Field name="icono"
                          type="file"
                          accept=".svg"
                          className="visually-hidden d-block"
                          onChange={e => props.setFiltro("icono", e.target.files[0])}
            />
          </label>
          <span>{icono()}</span>
        </div>
        <Formal.Message for="icono" className="d-flex text-danger"/>
      </Form.Group>
    </Formal>
  );

  function icono() {
    let url = ""
    if (props.filtro.icono instanceof File)
      url = URL.createObjectURL(props.filtro.icono)
    else if (props.filtro.icono && typeof props.filtro.icono == "string")
      url = Configuraciones.publicURL + props.filtro.icono
    else
      url = img_placeholder

    return <Image thumbnail width={40} src={url}/>
  }
}

export default FormularioFiltro
