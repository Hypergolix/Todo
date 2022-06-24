import { AnyRecord } from 'dns';
import React, { useEffect, useState } from 'react';
import './App.css';
import AddButton from './Components/AddButton/AddButton';
import AddTodo from './Components/AddTodo/AddTodo';
import TodoLists from './Components/TodoLists/TodoLists';
import { TodoList } from './Components/TodoLists/TodoLists.types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import TodoListPage from './Components/TodoListPage/TodoListPage';

// Native?

export default function App() {
  const [addVisible, setAddVisible] = useState(false);
  // const [updateList, setUpdateList] = useState<TodoList[]>([]);
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://localhost:7297/api/TodoLists", { mode: 'cors' });
      const json = await response.json();
      setTodoLists(json);
    })();
  }, [addVisible]);
  // This ^ seems like a hack - may cause problems later 

  const deleteList = async (id: string) => {
    // console.log("Deleted!");
    //const response = 
    await fetch(`https://localhost:7297/api/TodoLists?id=${id}`, { method: 'DELETE', mode: 'cors' });
    //const json = await response.json();

    const newArray = todoLists.filter(x => x.guid !== id);
    setTodoLists(newArray);
  }

  const addList = async (title: string) => {
    // console.log("Add!");
    const data: TodoList = {
      title: title,
      todoItems: [],
      guid: ""
    }

    await fetch(`https://localhost:7297/api/TodoLists`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    //const json = await response.json();
    setTodoLists(prev => [...prev, data])
    setAddVisible(false);
  }

  const addClicked = (state: boolean) => {
    setAddVisible(state);
  }
  // BUG: can't delete the list that was last created

  return (
    <div className="App">
      <header className="App-header">
        <AddButton cb={addClicked} />
        <h1>User's Lists</h1>
      </header>
      <TodoLists
        lists={todoLists}
        deleteCb={deleteList} />
      {
        addVisible ?
          <AddTodo
            cb={addClicked}
            add={addList}
          /> : <></>
      }
    </div>
  );
}

{/* <Router>
  <Routes>
    <Route path="/List" element={<TodoListPage/>}/>
    <Route path="/" element={<App/>}/>
  </Routes>
</Router> */}

// export default App;
