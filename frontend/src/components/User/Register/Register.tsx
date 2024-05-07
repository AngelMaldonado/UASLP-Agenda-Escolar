import React, {useState} from "react";
import "./_register.scss";
import NavbarUASLP from "../../Navbars/NavbarUASLP";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import {Form} from "react-bootstrap";
import Formal from "react-formal";

const submit = () => {
  console.log("registrando...");
};
const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    confirm_password: "",
  });

  const inputChange = ({target}) => {
    const {name, value} = target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = () => {
    setForm({...form, role: "Becario"});
    fetch("http://localhost:1337/api/usuarios", {
      method: "POST",
      body: JSON.stringify({data: form}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.id) {
          console.log(data.data);
          //Redirigir
          console.log("Usuario registrado");
          window.location.replace("/entrar");
        } else {
          alert("No se pudo registrar, intente de nuevo...");
        }
      });
  };

  return (
    <Container fluid className="p-0 vh-100">
      <NavbarUASLP/>
      <Container className="mt-5">
        <Card className="FormularioLogin border">
          <Card.Header as="h6" className="text-center text-white py-3">
            Administración Agenda | Calendario
          </Card.Header>
          <Card.Body>
            <Formal>
              <Form.Group>
                <Form.Label>Nombre*</Form.Label>
                <Formal.Field
                  name="username"
                  value={form.username}
                  onChange={inputChange}
                  className="form-control mb-3"
                  placeholder="Ingresa tu nombre completo"
                />
                <Formal.Message for="username" className="d-flex text-danger"/>

                <Form.Label>Correo electronico*</Form.Label>
                <Formal.Field
                  name="email"
                  type="email"
                  className="form-control mb-3"
                  placeholder="Ingresa un correo valido"
                  value={form.email}
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

                <Form.Label>Repite Contraseña*</Form.Label>
                <Formal.Field
                  name="confirm_password"
                  type="password"
                  className="form-control mb-3"
                  placeholder="Repite tu contraseña"
                  value={form.confirm_password}
                  onChange={inputChange}
                />
                <Formal.Message
                  for="confirm_password"
                  className="d-flex text-danger"
                />
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
