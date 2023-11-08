import {LuPersonStanding} from 'react-icons/lu';

export type ComunidadesOption = {
  value: number,
  label: string,
  icon: React.ReactElement
}

const Comunidades: ComunidadesOption[] = [
  {value: 1, label: "Aspirantes", icon: LuPersonStanding},
  {value: 2, label: "Estudiantes", icon: LuPersonStanding},
  {value: 3, label: "Académicos", icon: LuPersonStanding},
  {value: 4, label: "Administrativos", icon: LuPersonStanding},
  {value: 5, label: "Egresados", icon: LuPersonStanding},
]

export default Comunidades
