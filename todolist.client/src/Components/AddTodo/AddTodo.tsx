import React, { useState } from 'react'
import './AddTodo.scss'
import ExitIcon from '@mui/icons-material/Close';

// Make prop type with callback fn as property
function AddTodo(props:any) {
  const [title, setTitle] = useState("");

  return (
    <div className='Add-Container'>
      <p>Enter a name:</p>
      <input type='text' value={title} onChange={(event) => {setTitle(event.target.value)}}/>
      <button onClick={() => props.add(title)}>ADD</button>
      <div className='Exit-Button' onClick={() => props.cb(false)}>
        <ExitIcon/>
      </div>
    </div>
  )
}

export default AddTodo