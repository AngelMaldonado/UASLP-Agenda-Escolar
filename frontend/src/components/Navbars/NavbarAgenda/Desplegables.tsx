import Filtro from "../../../models/Filtro.ts";
import Select, {components, MultiValueProps, OptionProps} from "react-select";
import {Configuraciones, meses} from "../../../utils/Constantes.ts";
import {useContext} from "react";
import {FiltrosCategoriaEnum} from "../../../enums/FiltrosEnum.ts";
import {AgendaContext, AgendaContextDataEnum} from "../../../providers/AgendaProvider.tsx";
import {useCambiaContexto} from "../../../hooks/HookObjectChange.ts";

function Desplegables(props: { agenda: boolean }) {
  const {data} = useContext(AgendaContext)
  const {cambiaContexto} = useCambiaContexto()
  const comunidades = data.filtros?.filter(f => f.categoria == FiltrosCategoriaEnum.COMUNIDAD)
  const areas = data.filtros?.filter(f => f.categoria == FiltrosCategoriaEnum.AREA)
  const años = Array.from(new Set(data.eventos?.flatMap(e => [
    e.fecha_inicio!.getFullYear(),
    e.fecha_fin!.getFullYear()
  ])))

  return (
    <div className="d-flex flex-column gap-2 flex-xl-row flex-grow-1">
      {desplegableFiltro(comunidades, "Comunidades", FiltrosCategoriaEnum.COMUNIDAD)}
      {desplegableFiltro(areas, "Áreas", FiltrosCategoriaEnum.AREA)}
      {!props.agenda ? null :
        <>
          {desplegableAgenda(
            AgendaContextDataEnum.AñosBusqueda,
            "Años",
            años.map(v => ({value: v, label: v.toString()}))
          )}
          {desplegableAgenda(
            AgendaContextDataEnum.MesesBusqueda,
            "Meses",
            [...meses.keys()].map((v) =>
              ({value: meses.get(v)!, label: v[0].toUpperCase() + v.substring(1)})
            ))}
        </>
      }
    </div>
  )

  function desplegableFiltro(filtros: Filtro[] = [], placeholder: string, categoria: FiltrosCategoriaEnum) {
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
      <Select className="form-control desplegable-filtro"
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
                cambiaContexto(
                  AgendaContextDataEnum.FiltrosUsuario,
                  data.filtrosUsuario?.filter(f => f.categoria !== categoria).concat(selecciones)
                )
              }}
      />
    )
  }

  function desplegableAgenda(filtros: AgendaContextDataEnum, placeholder: string, opciones: {
    value: number,
    label: string
  }[]) {
    const MultiValue = ({...props}: MultiValueProps<{ value: number, label: string }>) => {
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
              components={{MultiValue}}
              noOptionsMessage={() => <>Sin opciones</>}
              options={opciones}
              onChange={value =>
                cambiaContexto(filtros, value.map(v => v.value))
              }
      />
    )
  }
}

export default Desplegables;
