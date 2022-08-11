import axios from 'axios';
import { FullToDoItem } from './types';
import {useEffect, useState} from 'react';

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
    const [mode, setMode] = useState<'view' | 'edit'>('view')
    const [currentTodo, setCurrentTodo] = useState<FullToDoItem>({
        "id": id,
        "task": task,
        "completed": completed,
        "creationDate": creationDate,
        "dueDate": dueDate})

    // useEffect(() => {

    // }, [currentTodo])

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

    function handleUpdate() {
        axios.patch(`http://localhost:4000/items/${id}`, {task: currentTodo.task, dueDate: currentTodo.dueDate});
        setTodos(todos.map(todo => changeCurrentTodo(todo)))
    }

    function changeCurrentTodo(todo: FullToDoItem) {
        if (todo.id === id) {
            return {
                "id": todo.id, 
                "task": currentTodo.task,
                "completed": !(todo.completed),
                "creationDate": todo.creationDate,
                "dueDate": currentTodo.dueDate
            }
        } else {
            return todo;
        }
    }

    if (mode === 'view') {
        return (
            <div className="view-to-do-card">
                <h1>{id}</h1>
                <h1>{task}</h1>
                {completed 
                ? <input type="checkbox" checked onClick={handleMakeIncomplete}/> 
                : <input type="checkbox" onClick={handleMakeComplete}/>}
                <button type="button" onClick={handleDelete}>Delete</button>
                <button type="button" onClick={() => setMode('edit')}>Edit</button>
                <p>Created: {creationDate}</p>
                <p>Due: {dueDate}</p>
            </div>
        )
    } else if (mode === 'edit') {
        return (
            <div className='edit-to-do-card'>
                <h1>{id}</h1>
                <form onSubmit={handleUpdate}>
                    <input type="text" value={currentTodo.task} onChange={(e) => setCurrentTodo(prevState => ({...prevState, task: e.target.value}))}/>
                    <input type='submit' value='Update'/>
                </form>
                
            </div>
        )
    } else {
        return (
            <h1>Empty</h1>
        )
    }
    
}

export default ToDoCard;