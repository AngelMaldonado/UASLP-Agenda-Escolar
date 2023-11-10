export type SimbologiaOption = {
  value: string,
  label: string
}

export const simbologias: SimbologiaOption[] = Array.from({length: 127}, (_, i) =>
  ({value: "/simbologia/" + (i + 1) + ".webp", label: "Simbología " + i})
)
