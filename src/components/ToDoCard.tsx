interface ToDoCardProps {
    id: number;
    task: string;
    completed: boolean;
    creationDate: string;
    dueDate: string;
}

function ToDoCard({id, task, completed, creationDate, dueDate}: ToDoCardProps): JSX.Element {
    return (
        <div className="to-do-card">
            <h1>{id}</h1>
            <h1>{task}</h1>
            {completed 
            ? <input type="checkbox" checked /> 
            : <input type="checkbox" />}
            <p>Created: {creationDate}</p>
            <p>Due: {dueDate}</p>
        </div>
    )
}

export default ToDoCard;