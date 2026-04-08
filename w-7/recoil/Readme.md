# Recoil + React 19 — Problem & Fix

## Problem

Recoil `0.7.7` does not support React 19. Meta has officially abandoned Recoil and its last release only targets React 18. As a result, nothing renders and no error is shown in the UI.

**Broken setup:**

```json
"dependencies": {
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "recoil": "^0.7.7"
}
```

Additional issue: wrapping `<RecoilRoot>` inside React `<StrictMode>` also causes Recoil to break even on React 18.

---

## Solution

### Approach 1 — Downgrade React to 18 (keep Recoil)

**Step 1:** Install React 18

```bash
npm install react@18 react-dom@18
```

**Step 2:** Remove `<StrictMode>` from `main.jsx`

```jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
```

That's it — your existing Recoil code works as-is.

---

### Approach 2 — Replace Recoil with Jotai (keep React 19)

Jotai is the modern alternative to Recoil with the same atomic state model, actively maintained, and fully compatible with React 19.

**Step 1:** Swap packages

```bash
npm remove recoil
npm install jotai
```

**Step 2:** Update atom file

```js
// store/atoms/count.js
import { atom } from "jotai";
export const countAtom = atom(0);
```

**Step 3:** Update App.jsx

```jsx
import { useAtom, useAtomValue } from "jotai";
import { countAtom } from "./store/atoms/count";

function App() {
  return <Count />; // No Provider needed
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
```

`main.jsx` stays unchanged — `<StrictMode>` works fine with Jotai.

---

## Which to choose?

|               | Approach 1         | Approach 2     |
| ------------- | ------------------ | -------------- |
| React version | 18                 | 19             |
| Library       | Recoil (abandoned) | Jotai (active) |
| StrictMode    | ❌ Remove it       | ✅ Works       |
| Best for      | Learning Recoil    | Real projects  |
