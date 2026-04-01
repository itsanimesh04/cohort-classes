# React Re-rendering: 3 Approaches

A quick guide on controlling unnecessary re-renders in React using a simple `Header` + button example.

---

## The Problem

When a parent component re-renders, **all its children re-render too** — even if their props didn't change. This can cause unnecessary work in your app.

---

## Approach 1 — Do Nothing ❌

State lives in `App`. On every button click, `App` re-renders and **both** `Header` components re-render, even though the second one always receives the same prop.

```jsx
function App() {
  const [title, setTitle] = useState("my name is Ani");

  function changeTitle() {
    setTitle("my name is " + Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click to change the title</button>
      <Header title={title} />
      <Header title="my name is muskan" />  {/* re-renders unnecessarily */}
    </>
  );
}

function Header({ title }) {
  return <>{title}</>;
}
```

**What happens on click:**
```
App re-renders
  → Header 1 re-renders ✅ (props changed)
  → Header 2 re-renders ⚠️ (props didn't change — wasteful!)
```

---

## Approach 2 — State Colocation ✅ (Recommended)

Move the state **down** into a new `HeaderWithButton` component. Now `App` never re-renders on button click, so the second `Header` is never touched.

```jsx
function App() {
  return (
    <div>
      <HeaderWithButton />
      <Header title="my name is mj" />  {/* never re-renders */}
    </div>
  );
}

function HeaderWithButton() {
  const [title, setTitle] = useState("my name is Ani");

  function changeTitle() {
    setTitle("my name is " + Math.random());
  }

  return (
    <div>
      <button onClick={changeTitle}>Click to change the title</button>
      <Header title={title} />
    </div>
  );
}

function Header({ title }) {
  return <>{title}</>;
}
```

**What happens on click:**
```
HeaderWithButton re-renders
  → Header 1 re-renders ✅ (props changed)
App does NOT re-render
  → Header 2 skipped ⚡ (parent untouched)
```

---

## Approach 3 — React.memo ✅ (Fallback)

Keep state in `App` but wrap `Header` in `memo`. React will skip re-rendering it if props haven't changed.

```jsx
import { useState, memo } from "react";

function App() {
  const [title, setTitle] = useState("my name is Ani");

  function changeTitle() {
    setTitle("my name is " + Math.random());
  }

  return (
    <>
      <button onClick={changeTitle}>Click to change the title</button>
      <Header title={title} />
      <Header title="my name is muskan" />  {/* memo blocks re-render */}
    </>
  );
}

const Header = memo(function Header({ title }) {
  return <>{title}</>;
});
```

**What happens on click:**
```
App re-renders
  → Header 1 re-renders ✅ (props changed)
  → Header 2 skipped ⚡ (memo sees same props)
```

---

## Comparison

| | Approach 1 ❌ | Approach 2 ✅ | Approach 3 ✅ |
|---|---|---|---|
| State lives in | `App` | `HeaderWithButton` | `App` |
| Header 2 re-renders? | Yes (wasteful) | No | No |
| How it's prevented | — | State colocation | `React.memo` |
| Prop comparison overhead? | No | No | Yes (every render) |
| Breaks with object props? | — | No | Yes (new ref = re-render) |
| Boilerplate needed? | None | Medium | Low |

---

## Key Takeaways

- **Re-renders flow downward** — a parent re-rendering always triggers children to re-render.
- **Approach 2 (colocation) is the best default** — it's a structural fix, not a patch.
- **Approach 3 (memo) is a fallback** — use it when you can't move state down, but be aware it adds prop-comparison overhead and can silently break with object/array/function props.

> 💡 **Rule of thumb:** Keep state as close to where it's used as possible. Reach for `memo` only when colocation isn't an option.