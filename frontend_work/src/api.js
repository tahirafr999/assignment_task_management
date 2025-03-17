import axios from "axios";

const API_URL = "https://redesigned-palm-tree-qxq545wx6wgf9r6q-8000.app.github.dev/api";

// Function to get tasks
export const getTasks = async (token) => {
    return axios.get(`${API_URL}/tasks/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Function to create a new task
export const createTask = async (taskData, token) => {
    return axios.post(`${API_URL}/tasks/`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Function to update an existing task
export const updateTask = async (taskId, taskData, token) => {
    return axios.put(`${API_URL}/tasks/${taskId}/`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Function to delete a task
export const deleteTask = async (taskId, token) => {
    return axios.delete(`${API_URL}/tasks/${taskId}/`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

// Function to handle user login (JWT Authentication)
export const loginUser = async (credentials) => {
    return axios.post(`${API_URL}/token/`, credentials);
};