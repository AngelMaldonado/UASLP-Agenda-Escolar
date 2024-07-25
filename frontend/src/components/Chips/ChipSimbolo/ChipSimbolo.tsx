import "./_chip-simbolo.scss"
import {Configuraciones} from "../../../utils/Constantes.ts";

type ChipSimboloProps = {
  simbolo: string,
  fecha_inicio: Date,
  fecha_fin: Date
}

export default function ChipSimbolo(props: ChipSimboloProps) {
  const {simbolo, fecha_inicio, fecha_fin} = props

  return (
    <div className="ChipSimbolo circle rounded-circle text-black-50 position-relative text-uppercase text-center"
         style={{backgroundImage: `url(${Configuraciones.publicURL + simbolo})`}}>
      <div className="Filter position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-10"></div>
      {obtenRango()}
    </div>
  );

  function obtenRango() {
    if (fecha_inicio.getMonth() == fecha_fin.getMonth())
    {
      if (fecha_inicio.getDate() == fecha_fin.getDate())
        return <span>{fecha_inicio.getDate()}</span>
      else return <span>{fecha_inicio.getDate()} - {fecha_fin.getDate()}</span>
    }
    else {
      const formatter = Intl.DateTimeFormat("es-MX", {month: "short"})
      return (
        <>
          {`${formatter.format(fecha_inicio)}`}<br/>
          <span>{fecha_inicio.getDate()} - {fecha_fin.getDate()}</span>
          {`${formatter.format(fecha_fin)}`}<br/>
        </>
      )
    }
  }
}
