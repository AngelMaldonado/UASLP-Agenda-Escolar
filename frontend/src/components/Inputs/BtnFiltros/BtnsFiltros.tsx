import {GrFormSearch} from 'react-icons/gr';
import Desplegables from '../../Navbars/NavbarAgenda/Desplegables.tsx';
import {BsBook} from 'react-icons/bs';

interface Datos {
  label: string;
  // icon: string;
  icon: React.ReactElement;

}

interface Data {
  placeholder: string;
  styleClass: string;
  data: Datos[];
}

interface DropdownProps {
  data: Data;
}

const MyDropdown = (props: DropdownProps) => {
  return (
    <Desplegables
      placeholder={props.data.placeholder}
      styleClass={props.data.styleClass}
      data={props.data.data}
    />
  );
};

const myData: Data = {
  placeholder: 'Estudiantes',
  styleClass: 'with: 26px',
  data: [
    {label: 'Aspirantes', icon: <></>},
    {label: 'Estudiantes', icon: <BsBook/>},
    {label: 'Académicos', icon: <></>},
    {label: 'Administrativos', icon: <></>},
    {label: 'Egresados', icon: <></>},
  ],
};

const myData2: Data = {
  placeholder: 'CICOMP',
  styleClass: '',
  data: [
    {label: 'Ciencias de la computacion', icon: <></>},
    {label: 'Agroindustrial', icon: <BsBook/>},
    {label: 'Ciencias de la Tierra', icon: <></>},
    {label: 'Formación Humanística', icon: <></>},
    {label: 'Civil', icon: <></>},
    {label: 'Mecánica Eléctrica', icon: <></>},
    {label: 'Metalurgia y Materiales', icon: <></>},
    {label: 'Investigación y Posgrado', icon: <></>},
    {label: 'Centro de capacitación', icon: <></>},

  ],
};

function BotonesFiltro() {
  return (
    <div className=" d-flex justify-content-between p-5">
      <MyDropdown data={myData}/>;
      <div className="container">
        <form className="search d-flex">
          <input name='search' id='search' className="solo black-text" type="search" placeholder="Buscar evento"
                 aria-label="Search"/>
          <button name='btnSearch' id='btnSearch' className="bnticon d-flex aling-item-p" type="submit">
            <GrFormSearch style={{fill: 'red'}} className='sbtn'/>
          </button>
        </form>
      </div>

      <MyDropdown data={myData2}/>;
    </div>
  );
}

export default BotonesFiltro;
