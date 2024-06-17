export class Configuraciones {
  static readonly publicURL = "http://localhost:8000/"
  static readonly apiURL = "http://localhost:8000/api/"
  static readonly sanctumURL = "http://localhost:8000/sanctum/"

  // rutas para despliegue:
  /*
  static readonly publicURL = "https://servicios.ing.uaslp.mx/agenda-escolar/backend/public/"
  static readonly apiURL = Configuraciones.publicURL + "api/"
  static readonly sanctumURL = Configuraciones.publicURL + "sanctum/"
   */
}

export const meses: Map<string, number> = new Map([
  ['enero', 0],
  ['febrero', 1],
  ['marzo', 2],
  ['abril', 3],
  ['mayo', 4],
  ['junio', 5],
  ['julio', 6],
  ['agosto', 7],
  ['septiembre', 8],
  ['octubre', 9],
  ['noviembre', 10],
  ['diciembre', 11],
])

export const modalTimeout = 2000
