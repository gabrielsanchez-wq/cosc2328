// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Gabriel Enrique Sanchez Zambrana

function TaskCard(props) {
    return (
        <div className = "task-card">
            <p>Task Name: {props.task.name}</p>
            <p className={"badge"+props.task.priority.toLowerCase()}>Badge: {props.task.priority}</p>
            <button type="button" onClick={() => props.onDelete(props.task.id)}>X</button>
        </div>
    );
}

function TaskList(props) {
    if (props.tasks.length === 0) {
        return (
            <p>There are no tasks.</p>
        );
    } else {
        return (
            <div className="taskList">
                <header>Task Count: `${tasks.length} task${tasks.length === 1 ? '' : 's'}`</header>
                {props.tasks.map(function (task, id) {
                    return (
                    <TaskCard 
                    key = {id}
                    task = {task}
                    onDelete = {props.onDelete}/>
                    );
                })}
            </div>
        );
    }
}

const App = () => {
    [tasks, setTasks] = React.useState([]);
    [taskName, setTaskName] = React.useState('');
    [priority, setPriority] = React.useState('Medium');
    [error, setError] = React.useState('');

    function addTask() {
        if (taskName.trim()==false) {
            setError('Task name cannot be empty.')
            return
        } else {
            setTasks([...tasks, { id: Date.now(), name: taskName.trim(), priority }]);
            //<TaskList tasks = {[...tasks, { id: Date.now(), name: taskName.trim(), priority }]}/>
            setError('');
            setTaskName('');
            setPriority('Medium');
        }
    }

    function deleteTask(id) {
        setTasks(tasks.filter(t => t.id !== id));
    }

    function clearAll() {
        setTasks([])
    }

    return (
        <div>
            <form action="https://httpbin.org/post" method="post">
                <fieldset>
                    <legend>This is the form</legend>
                    <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    {<button type="button" onClick={addTask}>Add a task here</button>}
                    {error && <p className="error-message">{error}</p>}
                    {(tasks.length > 0) && <button onClick={clearAll}>Clear All</button>}
                    <TaskList tasks={tasks} onDelete={deleteTask} />
                </fieldset>
            </form>
        </div>
    );
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);