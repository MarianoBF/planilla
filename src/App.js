import {Button, Form, Container, Header} from "semantic-ui-react";
import {useState, useEffect} from "react";
import axios from "axios";
import "./App.css";
import IframeGS from "./components/IframeGS";
import Sheet from "./components/Sheet";

function App() {
  const sampleValues = {
    nombre: "Juan",
    apellido: "Pérez",
    edad: Math.floor(Math.random() * 100),
    nacionalidad: "keniata",
  };

  const [renglon, setRenglon] = useState(sampleValues);

  const handleInput = e => {
    const {name, value} = e.target;
    setRenglon({...renglon, [name]: value});
  };

  const {REACT_APP_SHEET_API} = process.env;

  const submiteador = e => {
    console.log(e);
    const datos = {
      Nombre: renglon.nombre,
      Apellido: renglon.apellido,
      Edad: renglon.edad,
      Nacionalidad: renglon.nacionalidad,
    };
    axios
      .post(REACT_APP_SHEET_API, datos)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const [borrado, setBorrado] = useState();

  const handleBorrado = e => {
    setBorrado(e.target.value);
  };

  const borrar = e => {
    console.log(e);
    axios
      .delete(REACT_APP_SHEET_API + "/" + borrado)
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
    setBorrado("");
  };

  const [datosHoja, SetDatosHoja] = useState([])

  useEffect(()=>{
    fetch(REACT_APP_SHEET_API)
    .then(res=>res.json())
    // .then(res=>SetDatosHoja(res))

  },)

  return (
    <main>
      <Container className="contenedor">
        <Header as="h2">
          Completá la planilla para mandar los datos a Google Sheets
        </Header>
        <Form onSubmit={submiteador}>
          <Form.Field>
            <label>Nombre</label>
            <input
              placeholder="Juan"
              name="nombre"
              value={renglon.nombre}
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Apellido</label>
            <input
              placeholder="Perez"
              name="apellido"
              value={renglon.apellido}
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Edad</label>
            <input
              type="number"
              placeholder="60"
              name="edad"
              max="120"
              min="1"
              value={renglon.edad}
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Nacionalidad</label>
            <input
              placeholder="Argentina"
              name="nacionalidad"
              value={renglon.nacionalidad}
              onChange={handleInput}
            />
          </Form.Field>

          <Button color="blue" type="submit">
            Submit
          </Button>
        </Form>
      </Container>

      <Container className="contenedor">
        <Header as="h2">Borrar una fila</Header>
        <Form onSubmit={borrar}>
          <Form.Field>
            <label>Ingresa el número de la fila que querés borrar</label>
            <input
              placeholder="3"
              name="borrado"
              value={borrado}
              onChange={handleBorrado}
            />
          </Form.Field>
          <Button color="red" type="submit">
            Borrar
          </Button>
        </Form>
      </Container>

      <IframeGS />

      <Sheet datos={datosHoja}/>
    </main>
  );
}

export default App;
