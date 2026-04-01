import { useMemo, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [inputVal, setInputVal] = useState(1);

  let inputSum = useMemo(() => {
    let inputSum = 0;
    for (let i = 1; i <= inputVal; i++) {
      inputSum = inputSum + i;
    }
    return inputSum ;
  }, [inputVal]);
  

  return (
    <>
      <input
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        placeholder={"sum from 1 to n"}
      ></input>
      <br />
      Sum from 1 to {inputVal} is {inputSum}
      <br />
      <button onClick={() => setCount((count) => count + 1)}>
        Count is {count}
      </button>
    </>
  );
}

export default App;
