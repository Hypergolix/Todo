import React from 'react'
import './AddButton.scss'
import AddIcon from '@mui/icons-material/Add';
import { TodoList } from '../TodoLists/TodoLists.types';
//import { TodoItem } from '../TodoItem/TodoItem.types';


function AddButton(props:any) {
  return (
    // <div className='Add-button' onClick={() => addList("")}>
    <div className='Add-Button' onClick={() => props.cb(true)}>
      <AddIcon/>
    </div>
  )
}

export default AddButton