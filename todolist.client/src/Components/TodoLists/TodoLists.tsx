import React, { useEffect, useState } from 'react'
import { TodoList } from './TodoLists.types';
import './TodoLists.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";

export default function TodoLists(props:any) {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    setTodoLists(props.lists);
  }, [props.lists])
  
  
  // Error handle if BE unreachable
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://localhost:7297/api/TodoLists", { mode: 'cors' });
  //     const json = await response.json();
  //     setTodoLists(json);
  //   })();
  // }, []);

  return (
      <ul className='TodoLists'>
        {todoLists.length !== 0 ? 
          <>
            {todoLists?.map((x, k) =>
              <li key={k}>
                <Link to={`/TodoListPage?id=${x.guid}`}>
                  {x.title}
                </Link>
                <div className="IconBox" onClick={() => props.deleteCb(x.guid)}>
                  <DeleteIcon/>
                </div>
              </li>
            )}
          </>
          : 
          <>
            <h1>Couldn't find lists</h1>
          </>
        }
      </ul>
  )
}

// export default TodoLists