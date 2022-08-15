import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const TaskTable = () => {
    const [tasks,setTasks] = useState();

    const url = "http://127.0.0.1:3000/task/"
    useEffect(()=>{
    async function getData(){
        await axios.get(url).then((response)=>{setTasks(response.data);console.log(tasks)})
    }
    getData();
    },[])

  return (
<Table striped>
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Descrição</th>
          <th>Duração</th>
          <th>Data</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tasks && tasks.map((cur)=><tr key={cur.title}>
          <td>{cur.title}</td>
          <td>{cur.description}</td>
          <td>{cur.duration}</td>
          <td>{cur.date}</td>
          <td>  <Button variant="success" style={{["margin-left"]:'10px'}} onClick={()=>console.log('ola')}>Done</Button> 
                <Button variant="info" style={{["margin-left"]:'10px'}} onClick={()=>console.log('ola')}>Edit</Button>
                <Button variant="danger" style={{["margin-left"]:'10px'}} onClick={()=>console.log('ola')}>Delete</Button>
          </td>

        </tr>)}
        
        
        
      </tbody>
    </Table>
  )
}

export default TaskTable