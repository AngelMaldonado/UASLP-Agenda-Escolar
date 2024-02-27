import Filtro from "../../../models/Filtro.ts";
import Select, {components, OptionProps, ValueContainerProps} from "react-select";
import Configuraciones from "../../../utils/Configuraciones.ts";
import {Dispatch, SetStateAction} from "react";
import {FiltrosCategoriaEnum} from "../../../enums/FiltroCategoriaEnum.ts";

type DesplegablesProps = {
  filtros?: Filtro[],
  setFiltros: Dispatch<SetStateAction<Filtro[]>>,
}

function Desplegables(props: DesplegablesProps) {
  let filtros: Filtro[] = []

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

  const ValueContainer = ({children, ...props}: ValueContainerProps<{ value: Filtro, label: string }[]>) => {
    let length = props.getValue().length;
    return (
      <components.ValueContainer {...props}>
        {length > 0 ? `${props.selectProps.placeholder} (${length})` : children[0]}
        {children[1]!}
      </components.ValueContainer>
    );
  };

  return (
    <div className="d-flex flex-grow-1 gap-2 align-items-lg-center">
      <Select className="form-control"
              classNamePrefix="select"
              unstyled
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              placeholder="Comunidades"
              components={{Option, ValueContainer}}
              options={props.filtros?.filter(f => f.categoria === "comunidad")
                .map(f => ({value: f, label: f.nombre!}))
              }
              onChange={value => {
                const comunidades = value.map(v => (v.value as Filtro))
                props.setFiltros(prevState =>
                  prevState.filter(f => f.categoria === FiltrosCategoriaEnum.AREA).concat(comunidades)
                )
              }}
      />
      <Select className="form-control"
              classNamePrefix="select"
              unstyled
              isMulti
              isSearchable={false}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              placeholder="Áreas"
              components={{Option, ValueContainer}}
              options={props.filtros?.filter(f => f.categoria === "área")
                .map(f => ({value: f, label: f.nombre!}))
              }
              onChange={value => {
                const areas = value.map(v => (v.value as Filtro))
                props.setFiltros(prevState =>
                  prevState.filter(f => f.categoria === FiltrosCategoriaEnum.COMUNIDAD).concat(areas)
                )
              }}
      />
    </div>
  )
}

export default Desplegables;
