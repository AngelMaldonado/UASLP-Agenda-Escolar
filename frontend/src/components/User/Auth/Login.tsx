import React, {useState} from "react";

import NavbarUASLP from "../../Navbars/NavbarUASLP";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import Formal from "react-formal";

const Register = () => {
  const [body, setBody] = useState({email: "tets.com", password: ""});

  const inputChange = ({target}) => {
    const {name, value} = target;
    setBody({
      ...body,
      [name]: value,
    });
  };

  const onSubmit = () => {
    console.log(form);
    fetch("http://localhost:1337/api/usuarios")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          const users = data.data;
          const usuarios = users.find((user) => {
            if (user.attributes.email === form.identifier) {
              return true;
            }
          });
          console.log(usuarios);
          window.location.replace("/administracion");
        } else {
          alert("Credenciales incorrectas...");
        }
      });
  };
  // const [userList, setUserList] = useState([])
  // const getUsers = async () => {
  //     const { data } = await axios.get('http://localhost:4000/api/usuarios')
  //     setUserList(data)
  // }

  // useEffect(getUsers, [])

  return (
    <Container fluid className="p-0 vh-100">
      <NavbarUASLP/>
      <Container className="mt-5">
        <Card className="FormularioLogin border">
          <Card.Header as="h6" className="text-center text-white py-3">
            Administración Agenda
          </Card.Header>
          <Card.Body>
            <Formal>
              <Form.Group>
                <Form.Label>Correo electronico*</Form.Label>
                <Formal.Field
                  name="identifier"
                  type="email"
                  className="form-control mb-3"
                  placeholder="Ingresa un correo valido"
                  value={form.identifier}
                  onChange={inputChange}
                />
                <Formal.Message for="email" className="d-flex text-danger"/>

                <Form.Label>Contraseña*</Form.Label>
                <Formal.Field
                  name="password"
                  type="password"
                  className="form-control mb-3"
                  placeholder="Ingresa tu contraseña"
                  value={form.password}
                  onChange={inputChange}
                />
                <Formal.Message for="password" className="d-flex text-danger"/>

                <button className="btn btn-primary" onClick={onSubmit}>
                  Guardar
                </button>
              </Form.Group>
            </Formal>
            {/* <FormularioLogin usuario={usuario} setUsuario={onUsuarioChange} errores={errores}/> */}
          </Card.Body>
          <Card.Footer className="d-flex gap-2 py-3">
            {/* <Boton key={"iniciar-sesion"}
                        variant={TemaComponente.PrimarioInverso}
                        etiqueta="Iniciar Sesión"
                        onClick={iniciaSesion}
                /> */}
          </Card.Footer>
        </Card>
      </Container>
    </Container>
  );
};

export default Register;
