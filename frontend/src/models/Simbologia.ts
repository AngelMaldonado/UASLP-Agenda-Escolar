class Simbologia {
  public id: number | null
  public simbolo: string | File

  constructor()
  constructor(
    id: number,
    simbolo: string,
  )
  constructor(
    id?: number,
    simbolo?: string,
  ) {
    this.id = id ?? null
    this.simbolo = simbolo ?? ""
  }
}

export default Simbologia
