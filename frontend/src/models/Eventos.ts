import Evento from "./Evento.ts";
import CatEvento from "./CatEvento.ts";

const eventos: Evento[] = [
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Inscripción y pago de programas de posgrado',
    new Date('2023-08-19'),
    new Date('2023-08-25'),
    [],
    './public/imagenes/imagen1.webp',
    'Período de inscripción y pago de colegiatura de los programas de posgrado',
    './public/simbologia/1.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Período vacacional de la UASLP',
    new Date('2023-09-01'),
    new Date('2023-09-15'),
    [],
    './public/imagenes/imagen2.webp',
    'Período vacacional de la UASLP',
    './public/simbologia/2.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Reunión de inicio de semestre con Profesores de la facultad',
    new Date('2023-09-05'),
    new Date('2023-09-05'),
    [],
    './public/imagenes/imagen3.webp',
    'Reunión de inicio del semestre con Profesores de la Facultad.',
    './public/simbologia/3.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Aplicación del examen general de conocimientos como opción de titulación',
    new Date('2023-09-10'),
    new Date('2023-09-10'),
    [],
    './public/imagenes/imagen4.webp',
    'Aplicación del examen general de conocimientos como opción de titulación',
    './public/simbologia/4.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    '1er reunión de información alumnos de nuevo ingreso',
    new Date('2023-09-15'),
    new Date('2023-09-15'),
    [],
    './public/imagenes/imagen5.webp',
    '1er reunión de información: Autoridades de la Facultad de Ingeniería con Padres de familia y Alumnos de primer ingreso.',
    './public/simbologia/5.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Inicio de clases del semestre',
    new Date('2023-09-19'),
    new Date('2023-09-19'),
    [],
    './public/imagenes/imagen6.webp',
    'Inicio de clases del semestre',
    './public/simbologia/6.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Periodo de bajas de materias del Departamento Físico Matemáticas',
    new Date('2023-09-25'),
    new Date('2023-09-30'),
    [],
    './public/imagenes/imagen7.webp',
    'Período de bajas de materias del Departamento Fisico Matematico',
    './public/simbologia/7.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Reunión del Consejo de Posgrado de la Facultad de Ingeniería',
    new Date('2023-10-01'),
    new Date('2023-10-01'),
    [],
    './public/imagenes/imagen8.webp',
    'Reunión del Consejo de Posgrado de la Facultad de Ingeniería',
    './public/simbologia/8.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Período de altas y bajas de materias del DUI',
    new Date('2023-10-05'),
    new Date('2023-10-10'),
    [],
    './public/imagenes/imagen9.webp',
    'Período de altas y bajas de materias del Departamento Universitario de Inglés',
    './public/simbologia/9.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Sesión ordinaria del H. Consejo Técnico Consultivo.',
    new Date('2023-10-15'),
    new Date('2023-10-15'),
    [],
    './public/imagenes/imagen10.webp',
    'Sesión ordinaria del H. Consejo Técnico Consultivo.',
    './public/simbologia/10.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Inicio de cursos del DUI',
    new Date('2023-10-20'),
    new Date('2023-10-20'),
    [],
    './public/imagenes/imagen11.webp',
    'Inicio de cursos del Departamento Universitario de Inglés',
    './public/simbologia/11.webp',
  ),
  new Evento(
    new CatEvento(),
    [],
    [],
    1,
    'Día inhábil',
    new Date('2023-11-01'),
    new Date('2023-11-01'),
    [],
    './public/imagenes/imagen12.webp',
    'Día inhábil',
    './public/simbologia/12.webp',
  ),
]

export default eventos
