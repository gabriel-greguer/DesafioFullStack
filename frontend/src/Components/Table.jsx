import React from 'react'
import Title from './Title'
import TextInput from './TextInput'
import TaskTable from './TaskTable'
import style from '../Styles/Table.module.css'
import { useState } from 'react'


const Table = () => {
  //estado derivado. Poderia ser usado redux mas como é um unico caso optei por mandar
  //o estado por params
  const [taskAtt,setTaskAtt] = useState(false);
  const att = () => {
    setTaskAtt(!taskAtt)
  }
  return (
    <div className={style.tablet}>
        <Title></Title>
        <TextInput fnc={att}></TextInput>
        <TaskTable atri={taskAtt}></TaskTable>
    </div>
  )
}

export default Table