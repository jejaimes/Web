import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import useForm from "./hooks";
import * as Joi from "joi";

const campos = [
  {
    "name": "Name",
    "type": "text",
    "placeholder": "Your name",
    "verify": {
      "required": true,
      "min": 3,
      "max": 30
    }
  },
  {
    "name": "Email",
    "type": "email",
    "placeholder": "email@example.com",
    "verify": {
      "required": true
    }
  },
  {
    "name": "Password",
    "type": "password",
    "placeholder": "",
    "verify": {
      "required": true,
      "min": 3,
      "max": 30
    }
  },
  {
    "name": "Telephone",
    "type": "tel",
    "placeholder": "+573333333333",
    "verify": {
      "required": true,
      "min": 3,
      "max": 30
    }
  },
  {
    "name": "Over 18",
    "type": "checkbox"
  },
  {
    "name": "Radio 1",
    "type": "radio"
  },{
    "name": "Radio 2",
    "type": "radio"
  },
  {
    "name": "OPciones",
    "type": "options",
    "options": [
      "option 1",
      "option 2",
      "option 3"
    ]
  }
]

const renderCampos = campos.map((campo) => {
  if (campo.type === 'checkbox' || campo.type === 'radio') {
    return (<Form.Group controlId={campo.name}>
              <Form.Check type={campo.type} label={campo.name} />
            </Form.Group>)
  } else if (campo.type === 'submit' || campo.type === 'reset' || campo.type === 'button') {
    return (<Button variant="primary" type={campo.type}>
              {campo.name}
            </Button>)
  } else if (campo.type === 'options') {
    const renderOpciones = campo.options.map((opcion) => <option key={opcion}>{opcion}</option>)
    return (<Form.Group controlId={campo.name}>
            <Form.Label>{campo.name}</Form.Label>
            <Form.Control as="select">
              {renderOpciones}
            </Form.Control>
          </Form.Group>)
  } else if (campo.type === 'file') {
    return (<Form.Group>
              <Form.File id={campo.name} label={campo.name} />
            </Form.Group>)
  } else if (campo.type === 'range') {
    return (<Form.Group controlId="formBasicRange">
              <Form.Label>{campo.name}</Form.Label>
              <Form.Control type={campo.type} />
            </Form.Group>)
  } else {
    return (<Form.Group controlId={campo.name}>
              <Form.Label>{campo.name}</Form.Label>
              <Form.Control type={campo.type} placeholder={campo.placeholder} />
            </Form.Group>)
  }
})

function Formulario () {
  return (
    <Form>
      {renderCampos}
    </Form>
  );
}

ReactDOM.render(<Formulario/>, document.getElementById('root'));