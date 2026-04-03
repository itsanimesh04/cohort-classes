import { useState, useCallback, memo } from "react";

const ChildComponent = memo(({ onButtonClick }) => {
  console.log("ChildComponent rendered!");
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}
    >
      <p>I am a Child Component. I only re-render if my props change.</p>
      <button onClick={onButtonClick}>Increment from Child</button>
    </div>
  );
});

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [setCount]); // Dependency array

  return (
    <div style={{ padding: "20px" }}>
      <h1>useCallback Hook</h1>
      <h3>Count: {count}</h3>

      <input
        type="text"
        value={text}
        placeholder="Type something to re-render Parent..."
        onChange={(e) => setText(e.target.value)}
      />
      <p>
        Typing in the box re-renders Parent, but NOT the Child (check console).
      </p>

      
      <ChildComponent onButtonClick={incrementCount} />
    </div>
  );
}

export default App;
