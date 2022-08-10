import {useState} from 'react';
import {ToDoItem} from './types'

function CreateToDo(): JSX.Element {
    const [newTodo, setNewTodo] = useState<ToDoItem>({task: '', completed: false, creationDate: '', dueDate: ''});
    
    const handleSubmit = () => {
        fetch("https://rosemelissa-todo.herokuapp.com/items", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo)
        });
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