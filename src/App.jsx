import { useState } from 'react';
import './App.css'; // Import our beautiful styles!

function App() {
  // 1. Create a state variable to hold our tasks
  const [tasks, setTasks] = useState([]);
  
  // 2. Create a state variable for what the user types in the input box
  const [inputValue, setInputValue] = useState('');

  // 3. Function to add a new task
  const addTask = (e) => {
    e.preventDefault(); // Stop the page from refreshing
    if (inputValue.trim() === '') return; // Don't add empty tasks
    
    // Create a new task object
    const newTask = {
      id: Date.now(), // Generate a unique ID based on the current time
      text: inputValue, // The text the user typed
    };
    
    // Update the list of tasks: 
    // ...tasks means "keep all the old tasks", and we add newTask at the end
    setTasks([...tasks, newTask]);
    
    // Clear the input box so it's empty for the next task
    setInputValue(''); 
  };

  // 4. Function to delete a task
  const deleteTask = (idToRemove) => {
    // Filter keeps every task EXCEPT the one where the ID matches
    setTasks(tasks.filter(task => task.id !== idToRemove));
  };

  return (
    <div className="todo-app">
      <h2 className="title">My To-Do List</h2>
      
      {/* Input Form */}
      <form onSubmit={addTask} className="input-container">
        <input 
          className="todo-input"
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What needs to be done?"
        />
        <button type="submit" className="btn-add">Add</button>
      </form>

      {/* List of Tasks */}
      <ul className="todo-list">
        {/* .map() loops over our array of tasks and creates an HTML list item (<li>) for each one */}
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <span>{task.text}</span>
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      
      {/* If we have 0 tasks, display this friendly message! */}
      {tasks.length === 0 && (
        <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '1rem' }}>
          All caught up! Add a task above.
        </p>
      )}
    </div>
  );
}

export default App;