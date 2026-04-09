// App.jsx
import {
  RecoilRoot,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";

function App() {
  return (
    <RecoilRoot>
      <Count />
    </RecoilRoot>
  );
}

function Count() {
  return (
    <div>
      <CountRender />
      <Buttons />
      <EvenRender />
    </div>
  );
}

function CountRender() {
  const count = useRecoilValue(countAtom);
  return <div>{count}</div>;
}

function Buttons() {
  const setCount = useSetRecoilState(countAtom);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increase</button>
      <button onClick={() => setCount((c) => c - 1)}>Decrease</button>
    </div>
  );
}

function EvenRender() {
  const isEven = useRecoilValue(evenSelector);

  return <div>{isEven ? "it is even" : null}</div>;
}

export default App;
