class Filtros {
    public id:number | null
    public descripcion:string
    public icono:string
    public tipo:string

    constructor() 
    constructor(
        id:number,
        descripcion:string,
        icono:string,
        tipo:string,
    )
    constructor(
        id?:number,
        descripcion?:string,
        icono?:string,
        tipo?:string,
    ){
        this.id = id ?? null
        this.descripcion = descripcion ?? ""
        this.icono = icono ?? ""
        this.tipo = tipo ?? ""
    }
}

export default Filtros