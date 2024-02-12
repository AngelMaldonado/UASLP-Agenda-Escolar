export enum TipoEventoEnum {
  FACULTAD = "facultad",
  ALUMNADO = "alumnado",
  CATALOGO = "catalogo"
}

const TipoEventoOptionsLabels = [
  "Facultad (evento nuevo para toda la facultad)",
  "Alumnado (evento propuesto por alumnos)",
  "Catálogo (evento con simbología y descripción)"
]

export type TipoEventoOptionsType = { value: TipoEventoEnum, label: TipoEventoEnum }

export const TipoEventoOptions = (Object.values(TipoEventoEnum) as Array<TipoEventoEnum>)
  .map((value, index) =>
    ({value: value, label: TipoEventoOptionsLabels[index]}))
