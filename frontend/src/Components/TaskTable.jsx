import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const TaskTable = (props) => {
  const [tasks, setTasks] = useState();
  const [shoudAtt, setShoudAtt] = useState();

  const atualiza = () => {
    setShoudAtt(props.atri);
  };

  const url = "http://127.0.0.1:3000/task/";
  useEffect(() => {
    async function getData() {
      await axios.get(url).then((response) => {
        setTasks(response.data);
      });
    }
    getData();
  }, [shoudAtt]);

  useEffect(() => {
    atualiza();
  });

  const deleteOne = async (e, meu) => {
    await axios
      .delete(`http://127.0.0.1:3000/task/${meu}`)
      .then(() => setShoudAtt(!shoudAtt));
  };

  const doneOne = async (e, meu) => {
    await axios
      .patch(`http://127.0.0.1:3000/task/${meu}`,{done:true})
      .then(() => setShoudAtt(!shoudAtt));
  };

  const updateOne = async (e, meu) => {
    await axios
      .put(`http://127.0.0.1:3000/task/${meu}`)
      .then(() => setShoudAtt(!shoudAtt));
  };

  return (
    <>

    <Table>
      <thead>
        <tr style={{backgroundColor:'#e5b179'}}>
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
            <tr key={cur.title} style = {cur.done ? {backgroundColor: '#a9ffd8'}:{}}>
              <td>{cur.title}</td>
              <td>{cur.description}</td>
              <td>{cur.duration}</td>
              <td>{(new Date(cur.date)).toLocaleString()}</td>
              <td>{" "}
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
                  onClick={() => console.log("ola")}
                >
                  Edit
                </Button>
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
