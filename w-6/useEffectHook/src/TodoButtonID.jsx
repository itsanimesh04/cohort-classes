import axios from "axios";
import { useEffect, useState } from "react";

function TodoButtonId() {
  const [id, setId] = useState(1);

  return (
    <div>
      <button onClick={() => setId(1)}>1</button>
      <button onClick={() => setId(2)}>2</button>
      <button onClick={() => setId(3)}>3</button>
      <button onClick={() => setId(4)}>4</button>

      <TodoDetails id={id} />
    </div>
  );
}

function TodoDetails({ id }) {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios.get(`https://dummyjson.com/todos/${id}`).then((res) => {
      // DummyJSON returns the object directly, not res.data.todo
      setTodo(res.data);
    });
  }, [id]); // CRITICAL: This ensures it re-renders when ID changes

  return (
    <div style={{ background: "#f0f0f0", padding: "10px", marginTop: "10px" }}>
      {todo.todo ? (
        <>
          <h4>ID: {todo.id}</h4>
          <h1>{todo.todo}</h1>
          <h4>Status: {todo.completed ? "Completed" : "Not Completed"}</h4>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default TodoButtonId;
