export enum FiltrosCategoriaEnum {
  AREA = "área",
  COMUNIDAD = "comunidad",
}

export type FiltrosCategoriaOptionsType = { value: FiltrosCategoriaEnum, label: FiltrosCategoriaEnum }

export const FiltrosCategoriaOptions: FiltrosCategoriaOptionsType[] = (Object.values(FiltrosCategoriaEnum) as Array<FiltrosCategoriaEnum>)
  .map((value) => ({
    value: value,
    label: value[0].toUpperCase() + value.substring(1)
  }))
