import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const TaskTable = (props) => {

  //estado que contem as tasks atuais
  const [tasks, setTasks] = useState();
  //estado que ativa o hook de atualizar as tasks 
  const [shoudAtt, setShoudAtt] = useState();

  // estado para barra de pesquisa
  const [search, setSearch] = useState(); 

  //estado derivado para o nome da task que sera atualizada
  const [currUpdate, setCurrUpdate] = useState();

  //manipulação do modal de update
  const [smShow, setSmShow] = useState(false);
  const [description, setDescription] = useState("");

  //função para atualizar as tasks
  const atualiza = () => {
    setShoudAtt(props.atri);
  };

  //effect que atualiza a pagina quando o estado shoudAtt é alterado
  useEffect(() => {
    async function getData() {
      await axios.get('http://127.0.0.1:3000/task/').then((response) => {
        setTasks(response.data);
      });
    }
    getData();
  }, [shoudAtt]);

  //effect usado para pesquisa de barra
  useEffect(() => {
    async function getData() {
      await axios
        .post(`http://127.0.0.1:3000/task/like/`, { title: search })
        .then((response) => {
          setTasks(response.data);
        });
    }
    getData();
  }, [search]);

  //efect que auxilia na atualização quando uma nova tarefa é criada
  useEffect(() => {
    atualiza();
  });

  //função de deletar com botão de task
  const deleteOne = async (e, meu) => {
    await axios
      .delete(`http://127.0.0.1:3000/task/${meu}`)
      .then(() => setShoudAtt(!shoudAtt));
  };

  //troca o estado da task no bd para done
  const doneOne = async (e, meu) => {
    await axios
      .patch(`http://127.0.0.1:3000/task/${meu}`, { done: true })
      .then(() => setShoudAtt(!shoudAtt));
  };

  //da update na descrição da task
  const updateOne = async (e, meu) => {
    setCurrUpdate(meu);
    setSmShow(true);
  };

  //envia requisição de update
  const buttonUp = async (e, title) => {
    if (description !== "") {
      await axios
        .patch(`http://127.0.0.1:3000/task/${currUpdate}`, {
          description: description,
        })
        .then(() => setShoudAtt(!shoudAtt));
    }
    setSmShow(false);
  };

  return (
    <>
      <Form.Label htmlFor="search"></Form.Label>
      <Form.Control
        className="mb-4"
        placeholder="Procurar Tarefa"
        type="text"
        id="search"
        aria-describedby="searchbox"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Table>
        <thead>
          <tr style={{ backgroundColor: "#e5b179" }}>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Duração</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((cur) => (
              <tr
                key={cur.title}
                style={cur.done ? { backgroundColor: "#a9ffd8" } : {}}
              >
                <td>{cur.title}</td>
                <td>{cur.description}</td>
                <td>{cur.duration}</td>
                <td>{new Date(cur.date).toLocaleString()}</td>
                <td>
                  {" "}
                  <Button
                    variant="success"
                    style={{ ["marginLeft"]: "10px" }}
                    onClick={(e) => doneOne(e, cur.title)}
                  >
                    Done
                  </Button>
                  <Button
                    variant="info"
                    style={{ ["marginLeft"]: "10px" }}
                    onClick={(e) => updateOne(e, cur.title)}
                  >
                    Edit
                  </Button>
                  <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm">
                        Editar Descrição
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Label htmlFor="search"></Form.Label>
                      <Form.Control
                        className="mb-4"
                        placeholder="Nova Descrição"
                        type="text"
                        id="search"
                        aria-describedby="searchbox"
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={(e) => buttonUp(e, cur.title)}
                        variant="success"
                      >
                        Definir
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Button
                    variant="danger"
                    style={{ ["marginLeft"]: "10px" }}
                    onClick={(e) => deleteOne(e, cur.title)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default TaskTable;
