import React from 'react'
import Subtitle from './Subtitle'
import Title from './Title'
import TextInput from './TextInput'
import TaskTable from './TaskTable'
import style from '../Styles/Table.module.css'
import { useState } from 'react'


const Table = () => {

  const [taskAtt,setTaskAtt] = useState(false);
  const att = () => {
    setTaskAtt(!taskAtt)
    console.log(taskAtt)
  }
  return (
    <div className={style.tablet}>
        <Title></Title>
        <TextInput fnc={att}></TextInput>
        {/* <Subtitle></Subtitle> */}
        <TaskTable atri={taskAtt}></TaskTable>
    </div>
  )
}

export default Table