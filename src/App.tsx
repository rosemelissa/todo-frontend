import { useEffect, useState } from "react";
import CreateToDo from "./components/CreateToDo";
import ToDoCard from "./components/ToDoCard";
import { FullToDoItem } from './components/types';

function App(): JSX.Element {
  const [todos, setTodos] = useState<FullToDoItem[]>([])

  useEffect(() => {
    fetch(`http://localhost:4000/items/`)
    .then((response) => response.json())
    .then((jsonBody: FullToDoItem[]) => setTodos(jsonBody))
  }, [])
  
  if (todos.length > 0) {
    return (
      <>
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
