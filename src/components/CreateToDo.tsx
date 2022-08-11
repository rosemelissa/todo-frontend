import axios from 'axios';
import { useState } from 'react';

interface ToDoInputs {
    task: string;
    dueDate: string;
}

function CreateToDo(): JSX.Element {
    const [newTodo, setNewTodo] = useState<ToDoInputs>({task: '', dueDate: new Date().toISOString().slice(0, 10)});
    
    const handleSubmit = () => {
        axios.post("http://localhost:4000/items", newTodo);
    }

    return(
    
    <form onSubmit={handleSubmit}>
        <label>
            Task:
            <input type="text" value={newTodo.task} onChange={(e) => setNewTodo({task: e.target.value, dueDate: newTodo.dueDate})}/>
        </label>
        <label htmlFor="due-date">Due date:</label>
            <input type="date" id="due-date" name="due-date"
                value={newTodo.dueDate}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setNewTodo({task: newTodo.task, dueDate: e.target.value})}/>
        {/* <label>
            Due date:
            <input type="text" value={newTodo.dueDate} onChange={(e) => setNewTodo({task: newTodo.task, dueDate: e.target.value})}/>
        </label> */}
        <input type="submit" value="Submit"/>
    </form>
    )
}

export default CreateToDo;