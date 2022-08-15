import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {MdOutlineAddTask} from 'react-icons/md'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const TextInput = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button style={{margin:"25px 0"}}variant="primary" onClick={handleShow}>
        Nova Tarefa
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="Nome da tarefa"
        className="mb-3">
        <Form.Control type="text" placeholder="nome da tarefa" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea2" label="Descrição">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          className="mb-4 h-100"
        />
      </FloatingLabel>
      <input type="datetime-local" />
 

      <Form.Select className='mt-4' aria-label="Floating label select example">
        <option disabled>Duração</option>
        <option value="1-hr">1 hora</option>
        <option value="2-hr">2 horas</option>
        <option value="3-hr">3 horas</option>
        <option value="4-hr">4 horas+</option>
      </Form.Select>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Criar Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TextInput