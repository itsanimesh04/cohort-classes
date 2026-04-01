import axios from "axios";
import { useEffect, useState } from "react";

function TodoId() {
  return (
    <div>
      <SingleTodo id={3} />
    </div>
  );
}

function SingleTodo({ id }) {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios.get(`https://dummyjson.com/todos/${id}`).then((res) => {
      setTodo(res.data);
    });
  }, [id]);

  return (
    <div>
      <h1>{todo.todo}</h1>
      <h4>Completed: {todo.completed ? "Yes" : "No"}</h4>
    </div>
  );
}

export default TodoId;
