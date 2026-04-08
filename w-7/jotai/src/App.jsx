import { useAtom, useAtomValue } from "jotai";
import { countAtom } from "./store/atoms/count";

function App() {
  return (
    <div>
      <CountRender />
      <Buttons />
    </div>
  );
}

function CountRender() {
  const count = useAtomValue(countAtom);
  return <div>{count}</div>;
}

function Buttons() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default App;
