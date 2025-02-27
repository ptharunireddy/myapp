import React, { useState, useEffect, useRef } from "react";

const TodoApp = () => {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const taskInputRef = useRef(null);

  // Load tasks from local storage when the app starts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    const taskText = taskInputRef.current.value.trim();
    if (taskText) {
      setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
      taskInputRef.current.value = "";
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on selection
  const filteredTasks = tasks.filter(task => {
    if (filter === "Completed") return task.completed;
    if (filter === "Pending") return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div>
        <input ref={taskInputRef} type="text" placeholder="Add a task..." />
        <button onClick={addTask}>Add</button>
      </div>

      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Completed")}>Completed</button>
        <button onClick={() => setFilter("Pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
