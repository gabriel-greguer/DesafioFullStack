import { useState } from 'react'
import reactLogo from './assets/react.svg'
import style from './Styles/App.module.css'
import Table from './Components/Table'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={style.content} >
     <Table></Table>
    </div>
  )
}

export default App
