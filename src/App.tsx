import { useEffect, useState } from "react";
import CreateToDo from "./components/CreateToDo";
import ToDoCard from "./components/ToDoCard";
import { FullToDoItem } from "./components/types";

function App(): JSX.Element {
  const [todos, setTodos] = useState<FullToDoItem[]>([]);
  const [showOverdue, setShowOverdue] = useState<boolean>(true);

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "rosemelissa-todo.herokuapp.com"
      : "localhost:4000";

  useEffect(() => {
    fetch(`http://${baseUrl}/items/`)
      .then((response) => response.json())
      .then((jsonBody: FullToDoItem[]) => setTodos(jsonBody));
  }, [baseUrl]);

  function filterTodoList(method: string) {
    let sortedTodoList: FullToDoItem[] = [...todos];
    if (method === "default") {
      sortedTodoList = todos.sort(function (a, b) {
        const keyA = a.id;
        const keyB = b.id;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    } else if (method === "alphabetically") {
      sortedTodoList = todos.sort(function (a, b) {
        const keyA = a.task.toLowerCase();
        const keyB = b.task.toLowerCase();
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    } else if (method === "dueDate") {
      sortedTodoList = todos.sort(function (a, b) {
        const keyA = new Date(a.dueDate);

        const keyB = new Date(b.dueDate);
        console.log(keyB);
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    }
    setTodos([...sortedTodoList]);
  }

  function handleShowOverdue() {
    fetch(`http://${baseUrl}/items/`)
      .then((response) => response.json())
      .then((jsonBody: FullToDoItem[]) => setTodos(jsonBody));
    setShowOverdue(true);
  }

  function handleHideOverdue() {
    const dateToday: string = new Date().toISOString().slice(0, 10);
    setTodos(
      todos.filter((todo) => todo.dueDate >= dateToday || todo.dueDate === "")
    );
    setShowOverdue(false);
  }

  if (todos.length > 0) {
    return (
      <>
        <CreateToDo />

        <label htmlFor="filter-method">Filter by:</label>
        <select
          id="filter-method"
          name="filter-method"
          onChange={(e) => filterTodoList(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="alphabetically">Alphabetically</option>
          <option value="dueDate">Due date</option>
        </select>
        <label>
          Show overdue todos?
          {showOverdue ? (
            <input type="checkbox" checked onClick={handleHideOverdue} />
          ) : (
            <input type="checkbox" onClick={handleShowOverdue} />
          )}
        </label>
        <div className="todo-list">
          {todos.map((todo) => (
            <ToDoCard
              key={todo.id}
              todos={todos}
              setTodos={setTodos}
              id={todo.id}
              task={todo.task}
              completed={todo.completed}
              creationDate={todo.creationDate}
              dueDate={todo.dueDate}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default App;
