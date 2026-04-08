import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { countAtom } from "./store/atoms/count";

function App() {
  return <Count />;
}

function Count() {
  console.log("Count reRendered");

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
  const setCount = useSetAtom(countAtom);
  console.log("Button reRender");

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

export default App;
