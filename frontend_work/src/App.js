import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTasks, FaChartPie, FaUsers, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { LineChart, Line, PieChart, Pie, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import "./Dashboard.css";

// Sample Data for Charts (Initially empty)
const initialTaskTrendData = [
  { day: "Mon", completed: 3 },
  { day: "Tue", completed: 7 },
  { day: "Wed", completed: 5 },
  { day: "Thu", completed: 10 },
  { day: "Fri", completed: 6 },
];

const initialTaskDistributionData = [
  { name: "Pending", value: 8 },
  { name: "Completed", value: 24 },
  { name: "In Progress", value: 5 },
];

const COLORS = ["#FFBB28", "#00C49F", "#FF4B2B"];

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // State for dynamic chart data
  const [taskTrendData, setTaskTrendData] = useState(initialTaskTrendData);
  const [taskDistributionData, setTaskDistributionData] = useState(initialTaskDistributionData);

  const toggleForm = () => setShowForm(!showForm);

  // Handle task form submission
  const handleAddTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: tasks.length + 1,
      name: taskName,
      description: taskDescription,
      status: "Pending",
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDescription("");
    setShowForm(false);

    // Update the dynamic task distribution
    updateTaskDistribution();
  };

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "tahirafridi999@gmail.com" && password === "tahir123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  // Toggle task status (completed or pending)
  const toggleTaskStatus = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" } : task
    );
    setTasks(updatedTasks);

    // Update the task trend and distribution dynamically
    updateTaskTrendData(updatedTasks);
    updateTaskDistribution(updatedTasks);
  };

  // Handle task delete
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);

    // Update the task trend and distribution after task deletion
    updateTaskTrendData(updatedTasks);
    updateTaskDistribution(updatedTasks);
  };

  // Handle task update
  const handleUpdateTask = (taskId) => {
    const updatedName = prompt("Enter new task name:");
    const updatedDescription = prompt("Enter new task description:");
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, name: updatedName, description: updatedDescription }
        : task
    );
    setTasks(updatedTasks);

    // Update task distribution dynamically
    updateTaskTrendData(updatedTasks);
    updateTaskDistribution(updatedTasks);
  };

  // Update task trend data (Line Chart)
  const updateTaskTrendData = (updatedTasks) => {
    const trendData = updatedTasks.reduce((acc, task) => {
      const day = new Date().toLocaleString("en-us", { weekday: "short" });
      const existingDayData = acc.find((data) => data.day === day);

      if (existingDayData) {
        existingDayData.completed++;
      } else {
        acc.push({ day, completed: 1 });
      }
      return acc;
    }, []);
    setTaskTrendData(trendData);
  };

  // Update task distribution data (Pie Chart)
  const updateTaskDistribution = (updatedTasks = tasks) => {
    const pendingCount = updatedTasks.filter((task) => task.status === "Pending").length;
    const completedCount = updatedTasks.filter((task) => task.status === "Completed").length;
    const inProgressCount = updatedTasks.filter((task) => task.status === "In Progress").length;

    setTaskDistributionData([
      { name: "Pending", value: pendingCount },
      { name: "Completed", value: completedCount },
      { name: "In Progress", value: inProgressCount },
    ]);
  };

  // Initialize dynamic data on component mount
  useEffect(() => {
    updateTaskTrendData(tasks);
    updateTaskDistribution();
  }, [tasks]);

  return (
    <div className="dashboard-container">
      {/* Login Section */}
      {!isLoggedIn ? (
        <div className="login-section flex justify-center items-center h-screen bg-gray-100">
          <div className="login-box p-8 bg-white rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg w-full hover:bg-indigo-600"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Dashboard Content (visible only after successful login)
        <div className="dashboard-content">
          <div className="dashboard-main">
            {/* Header */}
            <header>
              <h1>Welcome Back</h1>
              <motion.button className="add-task-btn" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleForm}>
                <FaPlus /> Add Task
              </motion.button>
            </header>

            {/* Add Task Form */}
            {showForm && (
              <div className="add-task-form bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-10">
                <h2 className="text-2xl font-semibold mb-4 text-center">Add a New Task</h2>
                <form onSubmit={handleAddTask}>
                  <div className="mb-4">
                    <label htmlFor="taskName" className="block text-gray-700 text-sm font-medium mb-2">Task Name</label>
                    <input
                      type="text"
                      id="taskName"
                      name="taskName"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="taskDescription" className="block text-gray-700 text-sm font-medium mb-2">Description</label>
                    <textarea
                      id="taskDescription"
                      name="taskDescription"
                      value={taskDescription}
                      onChange={(e) => setTaskDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={toggleForm}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Task List */}
            <section className="task-list">
              <h2>Today's Tasks</h2>
              <ul>
                {tasks.map((task) => (
                  <motion.li key={task.id} whileHover={{ scale: 1.02 }}>
                    <div className="task-item">
                      <input
                        type="checkbox"
                        checked={task.status === "Completed"}
                        onChange={() => toggleTaskStatus(task.id)}
                      />
                      <strong>{task.name}</strong>
                      <p>{task.description}</p>
                      <div className="task-actions">
                        <button onClick={() => handleUpdateTask(task.id)}><FaEdit /></button>
                        <button onClick={() => handleDeleteTask(task.id)}><FaTrashAlt /></button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </section>

            {/* Task Distribution Pie Chart */}
            <section className="charts-section">
              <div className="chart-container">
                <h2>Task Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskDistributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {taskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
