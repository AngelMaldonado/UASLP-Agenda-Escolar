import Filtro from "../../../models/Filtro.ts";
import Select, {components, MultiValueProps, OptionProps} from "react-select";
import {Configuraciones} from "../../../utils/Constantes.ts";
import {useContext} from "react";
import {FiltrosCategoriaEnum} from "../../../enums/FiltrosEnum.ts";
import {AgendaContext} from "../../../providers/AgendaProvider.tsx";

function Desplegables() {
  const {data, setData} = useContext(AgendaContext)
  const comunidades = data.filtros?.filter(f => f.categoria == FiltrosCategoriaEnum.COMUNIDAD)
  const areas = data.filtros?.filter(f => f.categoria == FiltrosCategoriaEnum.AREA)

  return (
    <div className="d-flex flex-column gap-2 flex-xl-row flex-grow-1">
      {desplegable(comunidades, "Comunidades", FiltrosCategoriaEnum.COMUNIDAD)}
      {desplegable(areas, "Áreas", FiltrosCategoriaEnum.AREA)}
    </div>
  )

  function desplegable(filtros: Filtro[] = [], placeholder: string, categoria: FiltrosCategoriaEnum) {
    const Option = (props: OptionProps<{ value: Filtro, label: string }>) => (
      <components.Option {...props} children={
        <div className={`d-flex align-items-center rounded ${props.isSelected ? "p-2 bg-primary text-light" : ""}`}>
          <p className="flex-fill m-0">{props.label}</p>
          <img width={25} height={25}
               src={Configuraciones.publicURL + props.data.value.icono}
               alt={"Simbología " + props.label}
          />
        </div>
      }/>
    )

    const MultiValue = ({...props}: MultiValueProps<{ value: Filtro, label: string }>) => {
      if (props.index > 0) return null
      const {length} = props.getValue()
      return (length > 0) ?
        <div>{`${props.selectProps.placeholder} (${length})`}</div>
        : <components.MultiValue {...props} children={props.children}/>
    }

    return (
      <Select className="form-control"
              classNamePrefix="select"
              unstyled
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              placeholder={placeholder}
              components={{Option, MultiValue}}
              noOptionsMessage={() => <>Sin opciones</>}
              options={filtros.map(f => ({value: f, label: f.nombre!}))}
              onChange={value => {
                const selecciones = value.map(v => (v.value as Filtro))
                setData(prevState => ({
                  ...prevState,
                  filtrosUsuario: prevState.filtrosUsuario?.filter(f =>
                    f.categoria !== categoria).concat(selecciones)
                }))
              }}
      />
    )
  }
}

export default Desplegables;
