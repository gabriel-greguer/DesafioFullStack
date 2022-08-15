import React from 'react'
import Subtitle from './Subtitle'
import Title from './Title'
import TextInput from './TextInput'
import TaskTable from './TaskTable'
import style from '../Styles/Table.module.css'


const Table = () => {
  return (
    <div className={style.tablet}>
        <Title></Title>

        <TextInput></TextInput>
        <Subtitle></Subtitle>
        <TaskTable></TaskTable>
    </div>
  )
}

export default Table