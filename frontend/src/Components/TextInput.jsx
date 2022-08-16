import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {MdOutlineAddTask} from 'react-icons/md'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const TextInput = (props) => {
  const [show, setShow] = useState(false);
  const [verification,setVerification] = useState(false);

  //estados do formulario
  const [taskName,setTaskName] = useState('');
  const [taskDuration,setTaskDuration] = useState('');
  const [taskDescription,setTaskDescription] = useState('');
  const [taskDate,setTaskDate] = useState('');

  //constrole do modal de inserção
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //valida a criação e insere
  const valideCreate = async() => {
    if(!taskName)
    {
      setVerification(true);
      return;
    }
    let response = await axios.get(`http://127.0.0.1:3000/task/${taskName}`)
    .then((response)=>{
      setVerification(true)})
      .catch(()=>{
          if(taskDuration && taskName && taskDescription && taskDate)
          {
          setVerification(false);
          axios.post('http://127.0.0.1:3000/task',
          {title:taskName,
          duration:taskDuration,
          description:taskDescription,
          date:new Date(taskDate)})
          .then(()=>{
            setShow(false);
            setTaskName('');
            setTaskDuration('');
            setTaskDescription('');
            setTaskDate('');
            props.fnc();})
          }
          else
          {
            setVerification(true);
          }
        })
  }
  

  return (
    <>
      <Button style={{margin:"25px 0"}}variant="primary" onClick={handleShow}>
        Nova Tarefa
      </Button>

      <Modal show={show} onHide={handleClose}  backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Nova Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel onChange={(e) =>{setTaskName(e.target.value)}} controlId="floatingInput" label="Nome da tarefa"
        className="mb-3">
        <Form.Control type="text" placeholder="nome da tarefa" />
      </FloatingLabel>
      <FloatingLabel onChange={(e) => setTaskDescription(e.target.value)} controlId="floatingTextarea2" label="Descrição">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          className="mb-4 h-100"
        />
      </FloatingLabel>
      <input min="2022-08-15T00:00" max="2035-01-01T00:00" onChange={(e)=>{setTaskDate(e.target.value)}} type="datetime-local" />
      <span style={{marginLeft:'20px'}}>data e hora da tarefa.</span>
 

      <Form.Select onChange={(e) => setTaskDuration(e.target.value)} className='mt-4' aria-label="Floating label select example">
        <option defaultValue disabled>Duração</option>
        <option value="1-hr">1 hora</option>
        <option value="2-hr">2 horas</option>
        <option value="3-hr">3 horas</option>
        <option value="4-hr">4 horas+</option>
      </Form.Select>


        </Modal.Body>
        <Modal.Footer>
        {verification && <div>Campos em branco ou já existe uma task com esse nome.</div>}
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={valideCreate}>
            Criar Evento
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TextInput