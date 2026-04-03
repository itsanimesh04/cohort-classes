import { useState } from "react";
import {CountContext} from "./CountContext"
import { useContext } from "react";
function App() {
  const [count, setCount] = useState(0);
  
  // wrap anyone taht wants to use the teleported value inside a provider
  return (
    <>
      <CountContext.Provider value={count}>
        <Count count={count} setCount={setCount} />
      </CountContext.Provider>
    </>
  );
}

function Count({ count, setCount }) {
  return (
    <div>
      <CountRender />
      <Buttons count={count} setCount={setCount} />
    </div>
  );
}

function CountRender() {
  const count = useContext(CountContext) ;
  return <div>{count}</div>;
}

function Buttons({ count, setCount }) {
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increse
      </button>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrese
      </button>
    </div>
  );
}

export default App;
