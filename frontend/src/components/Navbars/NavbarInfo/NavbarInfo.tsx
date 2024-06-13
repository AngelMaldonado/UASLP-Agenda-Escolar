import Navbar from "react-bootstrap/esm/Navbar";
import Container from "react-bootstrap/Container";
import Modal from "../../Modales/Modal";
import Boton from "../../Inputs/Boton";
import {FaInfo, FaLaravel, FaReact} from "react-icons/fa";
import {Badge} from "react-bootstrap";
import {DiMysql} from "react-icons/di";
import {TemaComponente} from "../../../utils/Tipos.ts";

export default function NavbarInfo() {
  return (
    <Navbar className="NavbarInfo text-white">
      <Container className='flex-column text-center flex-lg-row fw-bolder'>
        Agenda y Calendario de Actividades
        <Modal
          titulo={<div><FaInfo/> <h6>Acerca de este sitio</h6></div>}
          trigger={
            <Boton etiqueta='Acerca de este sitio'
                   icono={<FaInfo/>}
                   variant={TemaComponente.SecundarioInverso}
            />
          }
          contenido={
            <Container className='AcercaDe text-center'>
              <h6>Cliente:</h6>
              <ul>
                <li>Dr. José Ignacio Núñez Varela</li>
              </ul>
              <h6>Desarrolladores:</h6>
              <ul>
                <li>Erika Guadalupe Granados Grifaldo</li>
                <li>Angel de Jesús Maldonado Juárez</li>
                <li>José Alfredo González Cruz</li>
                <li>Oscar Yasael Varela Palomo</li>
                <li>Francisco Javier Piña Silva</li>
              </ul>
              <h6>Colaboradores y mentores:</h6>
              <ul>
                <li>M.I. Alberto Ramos Blanco</li>
                <li>Dra. Sandra Edith Nava Muñoz</li>
                <li>Dr. Francisco Edgar Castillo Barrera</li>
                <li>Dr. Francisco Eduardo Martínez Pérez</li>
                <li>M.C. Genoveva Viridiana Silva Rodríguez</li>
              </ul>
              <h6>Tecnologías:</h6>
              <div className='d-flex gap-2 justify-content-center'>
                <Badge bg='dark' className='text-info'><FaReact/> React</Badge>
                <Badge bg='danger' className='text-white'><FaLaravel/> Laravel</Badge>
                <Badge bg='info' className='text-white'><DiMysql/> MySQL</Badge>
              </div>
            </Container>
          }
        />
      </Container>
    </Navbar>
  );
}
