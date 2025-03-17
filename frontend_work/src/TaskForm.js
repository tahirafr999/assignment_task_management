import React, { useState } from "react";
import { createTask, updateTask } from "./api";

const TaskForm = ({ token, task, refreshTasks }) => {
    const [formData, setFormData] = useState(
        task || { title: "", description: "", due_date: "", priority: "Medium", status: "To Do" }
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task) {
            await updateTask(task.id, formData, token);
        } else {
            await createTask(formData, token);
        }
        refreshTasks();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task Title" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Task Description" />
            <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} required />
            <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button type="submit">{task ? "Update" : "Create"} Task</button>
        </form>
    );
};

export default TaskForm;