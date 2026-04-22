# Recoil Async Data Queries

## Overview

Recoil supports **async selectors** — selectors whose `get` function returns a Promise. This lets you fetch remote data and treat it as regular Recoil state, with React Suspense handling the loading state automatically.

---

## Core Concepts

### `atom` with a `selector` default

Instead of hardcoding a default value, an atom can use a selector as its default. The selector runs once on first access, fetches data asynchronously, and seeds the atom.

```js
import { atom, selector } from "recoil";

export const notifications = atom({
  key: "networkAtom",
  default: selector({
    key: "networkAtomSelector",
    get: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      return response.json();
    },
  }),
});
```

- The atom's **key** must be globally unique.
- The selector's **key** must also be globally unique (even from the atom's key).
- Once the atom is written to (e.g., via `useSetRecoilState`), it holds that value and no longer re-runs the selector.

---

### Derived state with `selector`

Selectors can read atoms and compute derived values synchronously or asynchronously.

```js
export const totalNotificationSelector = selector({
  key: "totalNotificationSelector",
  get: ({ get }) => {
    const allNotifications = get(notifications);
    return (
      allNotifications.network +
      allNotifications.jobs +
      allNotifications.notifications +
      allNotifications.messaging
    );
  },
});
```

- `get(atom)` subscribes the selector to that atom — it re-runs whenever the atom changes.
- If the upstream atom is async, this selector **automatically waits** for it to resolve.

---

## Usage in Components

Wrap async selectors in `<Suspense>` to handle the loading state:

```jsx
import { useRecoilValue } from "recoil";
import { Suspense } from "react";
import { totalNotificationSelector } from "./store";

function NotificationBadge() {
  const total = useRecoilValue(totalNotificationSelector);
  return <span>{total}</span>;
}

export default function App() {
  return (
    <Suspense fallback={<span>Loading...</span>}>
      <NotificationBadge />
    </Suspense>
  );
}
```

---

## Data Flow

```
fetch() (async)
     │
     ▼
networkAtomSelector   ← runs once, seeds the atom
     │
     ▼
notifications (atom)  ← holds fetched data; writable
     │
     ▼
totalNotificationSelector ← derives computed value
     │
     ▼
Component via useRecoilValue()
```

---

## Key Rules

| Rule                                     | Why                                                          |
| ---------------------------------------- | ------------------------------------------------------------ |
| All `key` values must be globally unique | Recoil uses keys to identify nodes in its graph              |
| Async selectors need `<Suspense>`        | React doesn't render until the Promise resolves              |
| Don't fetch inside components            | Keeps side effects out of render; selector caches the result |
| Atom default selector runs only once     | Writing to the atom breaks the selector link                 |

---

## Error Handling

Wrap with an error boundary to catch rejected Promises:

```jsx
import { ErrorBoundary } from "react-error-boundary";

<ErrorBoundary fallback={<p>Failed to load.</p>}>
  <Suspense fallback={<p>Loading...</p>}>
    <NotificationBadge />
  </Suspense>
</ErrorBoundary>;
```

---

## When to Use Async Selectors vs `useEffect`

|                              | Async Selector | `useEffect` |
| ---------------------------- | -------------- | ----------- |
| Cached automatically         | ✅             | ❌          |
| Shared across components     | ✅             | ❌          |
| Composable / derivable       | ✅             | ❌          |
| Fine-grained loading control | ❌             | ✅          |
| Works without Recoil         | ❌             | ✅          |

Prefer async selectors when the data is **global, shared, or derived**. Use `useEffect` for local, component-specific fetching.
