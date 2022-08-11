import { useEffect, useState } from "react";
import ToDoCard from "./components/ToDoCard";
import CreateToDo from "./components/CreateToDo"
import axios from "axios";
import {FullToDoItem} from './components/types'

function App(): JSX.Element {
  const [todos, setTodos] = useState<FullToDoItem[]>([])

  useEffect(() => {
    fetch(`http://localhost:4000/items/`)
    .then((response) => response.json())
    .then((jsonBody: FullToDoItem[]) => setTodos(jsonBody))
  }, [])

  const handleDeleteThree = () => {
    axios.delete(`http://localhost:4000/items/3`);
    setTodos(todos.filter((todo) => todo.id !== 3));
  }
  
  if (todos.length > 0) {
    return (
      <>
        <button type="button" onClick={handleDeleteThree}>Delete item 3</button>
        <CreateToDo />
        <div className="todo-list">
          {todos.map(todo => <ToDoCard key={todo.id} todos={todos} setTodos={setTodos} id={todo.id} task={todo.task} completed={todo.completed} creationDate={todo.creationDate} dueDate={todo.dueDate} />)}
        </div>
      </>
    )} else {
      return (
        <h1>Loading</h1>
      )
    }
}

export default App;
