import axios from 'axios';
import {useState} from 'react';
import {ToDoItem} from './types'

interface ToDoInputs {
    task: string;
    dueDate: string;
}

function CreateToDo(): JSX.Element {
    const [newTodo, setNewTodo] = useState<ToDoInputs>({task: '', dueDate: ''});
    
    const handleSubmit = () => {
        axios.post("http://localhost:4000/items", newTodo);
    }

    return(
    
    <form onSubmit={handleSubmit}>
        <label>
            Task:
            <input type="text" value={newTodo.task} onChange={(e) => setNewTodo({task: e.target.value, dueDate: newTodo.dueDate})}/>
        </label>
        <label>
            Due date:
            <input type="text" value={newTodo.dueDate} onChange={(e) => setNewTodo({task: newTodo.task, dueDate: e.target.value})}/>
        </label>
        <input type="submit" value="Submit"/>
    </form>
    )
}

export default CreateToDo;