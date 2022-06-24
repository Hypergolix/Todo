import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TodoList } from '../TodoLists/TodoLists.types'
import './TodoListPage.scss'
import UploadIcon from '@mui/icons-material/Upload'
import BackIcon from '@mui/icons-material/ArrowBack'
import SortIcon from '@mui/icons-material/Sort'
import { TodoItem } from '../TodoItem/TodoItem.types'
import TodoLists from '../TodoLists'

// Make prop interface 
export default function TodoListPage(props: any) {
  const [list, setList] = useState<TodoList>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState("");

  // ?
  searchParams.get("id");
  // Backup - to save on API calls
  // useEffect(() => {
  //   setList(props.list)
  // }, [props.list])

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://localhost:7297/api/TodoList/Complete?${searchParams}`, { mode: 'cors' });
      const json = await response.json();
      setList(json);
    })();
  }, [searchParams])

  const sortItems = () => {

    const updatedItemList = list!.todoItems;
    
    updatedItemList!.sort((x, y) => Number(y.isCompleted) - Number(x.isCompleted));

    const newObj: TodoList = {
      ...list,
      todoItems: updatedItemList,
      title: list!.title,
      guid: list!.guid
    }

    setList(newObj);
  }

  const itemDelete = async (itemId: number) => {
    await fetch(`https://localhost:7297/api/TodoList/Delete?listId=${list?.guid}&itemId=${itemId}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const index = list!.todoItems.indexOf(list!.todoItems!.find(x => x.id === itemId)!);

    const updatedItemList = list!.todoItems;
    
    updatedItemList!.splice(index, 1);
    
    const newObj: TodoList = {
      ...list,
      todoItems: updatedItemList,
      title: list!.title,
      guid: list!.guid
    }

    setList(newObj);
  }

  // toggle done?
  const itemDone = async (itemId: number) => {
    // api call set done, listGuid, item id 
    await fetch(`https://localhost:7297/api/TodoList/Update?listId=${list?.guid}&itemId=${itemId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const index = list!.todoItems.indexOf(list!.todoItems!.find(x => x.id === itemId)!);

    const updatedItem = list!.todoItems.find(x => x.id === itemId)!;
    updatedItem.isCompleted = true;
    
    const updatedArray:TodoItem[] = list!.todoItems;

    updatedArray[index] = updatedItem;

    const newObj: TodoList = {
      ...list,
      todoItems: list!.todoItems,
      title: list!.title,
      guid: list!.guid
    }

    setList(newObj);
  }

  // if itemDone ability to delete

  const addItem = async () => {
    const data: TodoItem = {
      id: 0,
      title: title,
      isCompleted: false
    }

    await fetch(`https://localhost:7297/api/TodoList?id=${list?.guid}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Functional programming :(
    // REMEMBER React ignores, doesn't re-render if object/data isn't entirely new 
    const theObject = list;
    let specificArrayInObject = theObject!.todoItems.slice();
    specificArrayInObject.push(data);
    const newObj = {
      ...theObject,
      todoItems: specificArrayInObject,
      title: list!.title,
      guid: list!.guid
    };

    setList(newObj);
  }

  return (
    <>
      <nav className=''>
        <Link to='/'>
          <div className="IconBox" >
            <BackIcon />
          </div>
        </Link>
        <div
          className="IconBox"
          onClick={() => { navigator.clipboard.writeText(list!.guid); alert("link copied to clipboard!") }}>
          <UploadIcon />
        </div>
        <div className="IconBox" onClick={sortItems}>
          <SortIcon />
        </div>
        <h1>{list?.title}</h1>
      </nav>
      <div className='Add-Container'>
        {/* <h1>{title}</h1> */}
        <input type='text' value={title} onChange={(event) => { setTitle(event.target.value) }} />
        <button onClick={addItem}>ADD</button>
      </div>
      <div>
        <ul>
          {
            list?.todoItems.map((x, k) => 
            <li key={k} style={ (x.isCompleted ? { "background-color": "#E9ECEF" } : {"background-color": "#84BC9C"}) as React.CSSProperties}>
              {
              x.isCompleted ? 
              <button onClick={() => itemDelete(x.id)}>Delete</button>
              :
              <button onClick={() => itemDone(x.id)}>Done</button>
              }
              <p>{x.title}</p>
            </li>)
          }
        </ul>
      </div>
    </>
  )
}
