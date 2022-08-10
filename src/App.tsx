import { useEffect, useState } from "react";
import ToDoCard from "./components/ToDoCard";

interface ToDoItem {
    id: number;
    task: string;
    completed: boolean;
    creationDate: string;
    dueDate: string;
}

function App(): JSX.Element {
  const [todos, setTodos] = useState<ToDoItem[]>([])

  useEffect(() => {
    fetch("https://rosemelissa-todo.herokuapp.com/items")
    .then((response) => response.json())
    .then((jsonBody: ToDoItem[]) => setTodos(jsonBody))
  }, [])
  
  if (todos.length > 0) {
    return (
      <div className="todo-list">
        {todos.map(todo => <ToDoCard key={todo.id} id={todo.id} task={todo.task} completed={todo.completed} creationDate={todo.creationDate} dueDate={todo.dueDate} />)}
      </div>
    )} else {
      return (
        <h1>Loading</h1>
      )
    }
}

export default App;
