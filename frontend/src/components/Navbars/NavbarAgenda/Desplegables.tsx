import Filtro from "../../../models/Filtro.ts";
import Select, {components, MultiValueProps, OptionProps} from "react-select";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {useContext} from "react";
import {FiltrosCategoriaEnum} from "../../../enums/FiltroCategoriaEnum.ts";
import {PublicContext} from "../../../providers/AgendaProvider.tsx";

function Desplegables() {
  const {data, setData} = useContext(PublicContext)

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
      <div className="option-label">{`${props.selectProps.placeholder} (${length})`}</div>
      : <components.MultiValue {...props} children={props.children}/>
  }

  return (
    <div className="d-flex flex-grow-1 gap-2 align-items-lg-center">
      <Select className="form-control"
              classNamePrefix="select"
              unstyled
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              placeholder="Comunidades"
              components={{Option, MultiValue}}
              noOptionsMessage={() => <>Sin opciones</>}
              options={data.filtros?.filter(f => f.categoria == FiltrosCategoriaEnum.COMUNIDAD)
                .map(f => ({value: f, label: f.nombre!}))
              }
              onChange={value => {
                const comunidades = value.map(v => (v.value as Filtro))
                setData(prevState => ({
                  ...prevState,
                  filtrosUsuario: prevState.filtrosUsuario?.filter(f =>
                    f.categoria === FiltrosCategoriaEnum.AREA).concat(comunidades)
                }))
              }}
      />
      <Select className="form-control"
              classNamePrefix="select"
              unstyled
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              placeholder="Áreas"
              components={{Option, MultiValue}}
              noOptionsMessage={() => <>Sin opciones</>}
              options={data.filtros?.filter(f => f.categoria === "área")
                .map(f => ({value: f, label: f.nombre!}))
              }
              onChange={value => {
                const areas = value.map(v => (v.value as Filtro))
                setData(prevState => ({
                  ...prevState,
                  filtrosUsuario: prevState.filtrosUsuario?.filter(f =>
                    f.categoria === FiltrosCategoriaEnum.COMUNIDAD).concat(areas)
                }))
              }}
      />
    </div>
  )
}

export default Desplegables;
