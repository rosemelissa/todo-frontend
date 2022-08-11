import axios from 'axios';
import { FullToDoItem } from './types';

interface ToDoCardProps {
    todos: FullToDoItem[];
    setTodos: React.Dispatch<React.SetStateAction<FullToDoItem[]>>;
    id: number;
    task: string;
    completed: boolean;
    creationDate: string;
    dueDate: string;
}

function ToDoCard({todos, setTodos, id, task, completed, creationDate, dueDate}: ToDoCardProps): JSX.Element {
    
    const handleDelete = () => {
        axios.delete(`http://localhost:4000/items/${id}`);
        setTodos(todos.filter((todo) => (todo.id !== id)))
    }

    const handleMakeIncomplete = () => {
        axios.patch(`http://localhost:4000/items/${id}`, {completed: false});
        setTodos(todos.map(todo => changeCurrentTodoCompletion(todo)));
    }

    const handleMakeComplete = () => {
        axios.patch(`http://localhost:4000/items/${id}`, {completed: true});
        setTodos(todos.map(todo => changeCurrentTodoCompletion(todo)));
    }

    const changeCurrentTodoCompletion = (todo: FullToDoItem) => {
        if (todo.id === id) {
            return {
                "id": todo.id, 
                "task": todo.task,
                "completed": !(todo.completed),
                "creationDate": todo.creationDate,
                "dueDate": todo.dueDate
            }
        } else {
            return todo;
        }
    }

    return (
        <div className="to-do-card">
            <h1>{id}</h1>
            <h1>{task}</h1>
            {completed 
            ? <input type="checkbox" checked onClick={handleMakeIncomplete}/> 
            : <input type="checkbox" onClick={handleMakeComplete}/>}
            <button type="button" onClick={handleDelete}>Delete</button>
            <p>Created: {creationDate}</p>
            <p>Due: {dueDate}</p>
        </div>
    )
}

export default ToDoCard;