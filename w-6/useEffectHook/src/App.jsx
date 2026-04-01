import { useEffect, useState } from "react";
import axios from "axios"; // Default import (no braces)
import TodoId from "./TodoId";
import TodoButtonId from "./TodoButtonID";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/todos").then(function (res) {
      setTodos(res.data.todos);
    });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Todos</h2>
      {todos.slice(0, 3).map((todo) => {
        // We must 'return' the JSX inside a map
        return (
          <Todo
            key={todo.id}
            title={todo.todo}
            description={todo.completed ? "Done" : "Pending"}
          />
        );
      })}

      <hr />
      <h2>Specific Todo (ID: 3)</h2>
      <TodoId />

      <hr />
      <h2>Interactive Todo Selector</h2>
      <TodoButtonId />
    </div>
  );
}

// Fixed: Destructured props { title, description }
function Todo({ title, description }) {
  return (
    <div style={{ border: "1px solid #ddd", margin: "5px", padding: "5px" }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default App;
