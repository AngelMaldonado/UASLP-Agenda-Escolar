import './DropDown.css'

interface Datos {
  label: string,
  icon: React.ReactElement,
  // icon: string
}

interface data {
  placeholder: string,
  styleClass: string,
  data: Datos[]

}


const Dropdown = (props: data) => {

  return (

    <div className={`form-group ${props.styleClass}`}>
      <select
        className="dropdown-menu"
      >
        <option value="">{props.placeholder}</option>
        {props.data.map((item, key) => (
          <option className='dropdown-item'
                  key={key}
                  value={item.label}>
            {item.label}
            {item.icon}
          </option>

        ))}
      </select>
    </div>


  )

};


Dropdown.defaultProps = {
  value: '', styleClass: '', placeholder: ''
};

export default Dropdown;
