import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "./api";

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (token) {
            getTasks(token).then((res) => setTasks(res.data));
        }
    }, [token]);

    const handleDelete = async (taskId) => {
        await deleteTask(taskId, token);
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        {task.title} - {task.status}
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;