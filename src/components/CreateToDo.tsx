import axios from 'axios';
import {useState} from 'react';
import {ToDoItem} from './types'

function CreateToDo(): JSX.Element {
    const [newTodo, setNewTodo] = useState<ToDoItem>({task: '', completed: false, creationDate: '', dueDate: ''});
    
    const handleSubmit = () => {
        axios.post("http://localhost:4000/items", newTodo);
    }

    return(
    
    <form onSubmit={handleSubmit}>
        <label>
            Task:
            <input type="text" value={newTodo.task} onChange={(e) => setNewTodo({task: e.target.value, completed: newTodo.completed, creationDate: newTodo.creationDate, dueDate: newTodo.dueDate})}/>
        </label>
        <label>
            Due date:
            <input type="text" value={newTodo.dueDate} onChange={(e) => setNewTodo({task: newTodo.task, completed: newTodo.completed, creationDate: newTodo.creationDate, dueDate: e.target.value})}/>
        </label>
        <input type="submit" value="Submit"/>
    </form>
    )
}

export default CreateToDo;