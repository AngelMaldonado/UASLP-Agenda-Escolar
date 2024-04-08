import React, { useState } from "react";
import "./FormularioEventos.css";
import { Campo, TipoCampo } from "../Campo/Campo";

const EventForm = () => {
  const [evento, setEvento] = useState({
    nombre: "",
    simbologia: "",
    imagen: "",
    tipoEvento: "opcion1",
    comunidad: "aspirantes",
    area: "cienciasComputacion",
    fechaInicio: "",
    fechaFinal: "",
    hipervinculos: "",
    descripcion: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvento({ ...evento, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para enviar el formulario
    console.log("Formulario enviado:", evento);
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <header>
        Nuevo evento
        <button type="submit" className="cerrar">
          Cerrar
        </button>
      </header>

      <body>
        <div className="Campo">
          <label htmlFor="nombre">Nombre del Evento</label>
          <input
            type="text"
            id="nombre"
            style={{ margin: "5px", border: "1px solid black" }}
            name="nombre"
            value={evento.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className="Campo">
          <div className="campoParalelo">
            <label htmlFor="simbologia">Simbología</label>
            <select
              id="tipoEvento"
              name="tipoEvento"
              value={evento.tipoEvento}
              onChange={handleInputChange}
              style={{ margin: "10px", border: "1px solid black" }}
            >
              <option value="opcion1">Verde</option>
              <option value="opcion2">Zebra</option>
              <option value="opcion3">Rojo</option>
            </select>
          </div>
        </div>

        <div className="Campo">
          <div className="campoParalelo">
            <label htmlFor="imagen">Imagen</label>
            <input
              type="text"
              id="imagen"
              style={{ margin: "10px", border: "1px solid black" }}
              name="imagen"
              value={evento.imagen}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="Campo">
          <label htmlFor="tipoEvento">Tipo de Evento</label>
          <select
            id="tipoEvento"
            name="tipoEvento"
            value={evento.tipoEvento}
            onChange={handleInputChange}
            style={{ margin: "10px", border: "1px solid black" }}
          >
            <option value="opcion1">Opción 1</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
          </select>
        </div>

        <div className="Campo">
          <label htmlFor="comunidad">Comunidad</label>
          <select
            id="comunidad"
            style={{ margin: "10px", border: "1px solid black" }}
            name="comunidad"
            value={evento.comunidad}
            onChange={handleInputChange}
          >
            <option value="aspirantes">Aspirantes</option>
            <option value="estudiantes">Estudiantes</option>
            <option value="academicos">Académicos</option>
            <option value="administrativos">Administrativos</option>
            <option value="egresados">Egresados</option>
          </select>
        </div>

        <div className="Campo">
          <label htmlFor="area">Área</label>
          <select
            id="area"
            style={{ margin: "10px", border: "1px solid black" }}
            name="area"
            value={evento.area}
            onChange={handleInputChange}
          >
            <option value="cienciasComputacion">
              Ciencias de la Computación
            </option>
            <option value="agroindustrial">Agroindustrial</option>
            <option value="cienciasTierra">Ciencias de la Tierra</option>
            <option value="formacionHumanistica">Formación Humanística</option>
            <option value="civil">Civil</option>
            <option value="mecanicaElectrica">Mecánica Eléctrica</option>
            <option value="metalurgiaMateriales">
              Metalurgia y Materiales
            </option>
            <option value="investigacionPosgrado">
              Investigación y Posgrado
            </option>
            <option value="centroCapacitacion">Centro de Capacitación</option>
          </select>
        </div>

        <div className="campoParalelo">
          <label htmlFor="fechaInicio">Fecha de Inicio</label>
          <input
            type="date"
            id="fechaInicio"
            name="fechaInicio"
            value={evento.fechaInicio}
            onChange={handleInputChange}
            style={{ margin: "10px", border: "1px solid black" }}
          />
        </div>

        <div className="campoParalelo">
          <label htmlFor="fechaFinal">Fecha Final</label>
          <input
            type="date"
            style={{ margin: "10px", border: "1px solid black" }}
            id="fechaFinal"
            name="fechaFinal"
            value={evento.fechaFinal}
            onChange={handleInputChange}
          />
        </div>

        <div className="Campo">
          <label htmlFor="hipervinculos">Hipervínculos</label>
          <select
            id="hipervinculo"
            style={{ margin: "10px", border: "1px solid black" }}
            name="hipervinculo"
            value={evento.hipervinculos}
            onChange={handleInputChange}
          >
            <option value="hipervinculo1">hipervinculo 1</option>
            <option value="hipervinculo2">hipervinculo 2</option>
            <option value="hipervinculo3">hipervinculo 3</option>
            <option value="hipervinculo4">hipervinculo 4</option>
          </select>
        </div>

        <div className="Campo">
          <label htmlFor="descripcion">Descripcion</label>
          <input
            type="text"
            id="nombre"
            placeholder="Describe el evento"
            style={{ margin: "5px", border: "1px solid black" }}
            name="nombre"
            value={evento.nombre}
            onChange={handleInputChange}
          />
        </div>
      </body>

      <footer>
        <button
          type="button"
          className="cancelar"
          style={{ color: "red", marginRight: "20px" }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="crear"
          style={{ color: "greenyellow", marginLeft: "20px" }}
        >
          Crear
        </button>
      </footer>
    </form>
  );
};

export default EventForm;
