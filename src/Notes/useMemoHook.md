
# What is useMemo?

`useMemo` is a React Hook that **memorizes (caches) a calculated value** so React doesn't recalculate it on every render.

### Syntax

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

---

# Why Do We Need useMemo?

Normally, whenever a component re-renders:

```jsx
function App() {
  const [count, setCount] = useState(0);

  const result = heavyCalculation();

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <h1>{result}</h1>
    </>
  );
}
```

Every click causes:

1. Component re-renders
2. `heavyCalculation()` runs again
3. Even if calculation data didn't change

This can slow down the application.

---

# Real-Life Analogy

Imagine:

```text
Math Teacher:
Calculate 999999 × 999999
```

You calculate once and write it in a notebook.

Next day teacher asks again:

Without memoization:

* Recalculate from scratch

With memoization:

* Open notebook and reuse answer

`useMemo` is React's notebook.

---

# Example 1: Basic useMemo

Without useMemo:

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  function square(num) {
    console.log("Calculating...");
    return num * num;
  }

  const result = square(5);

  return (
    <>
      <h2>Result: {result}</h2>

      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </>
  );
}

export default App;
```

### Output

Every button click:

```text
Calculating...
```

Even though 5 never changes.

---

# Same Example With useMemo

```jsx
import { useState, useMemo } from "react";

function App() {
  const [count, setCount] = useState(0);

  const result = useMemo(() => {
    console.log("Calculating...");
    return 5 * 5;
  }, []);

  return (
    <>
      <h2>Result: {result}</h2>

      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </>
  );
}

export default App;
```

### Output

First render:

```text
Calculating...
```

After clicking:

```text
(no calculation)
```

React uses cached value.

---

# Understanding Dependencies

```jsx
const result = useMemo(() => {
  return number * number;
}, [number]);
```

When `number` changes:

```text
Recalculate
```

When other states change:

```text
Use cached value
```

---


# When NOT to Use useMemo

Bad:

```jsx
const fullName = useMemo(() => {
  return firstName + lastName;
}, [firstName, lastName]);
```

Why?

```text
String concatenation is cheap.
```

No performance benefit.

---

# Good Use Cases

✅ Large array filtering

```jsx
users.filter(...)
```

✅ Sorting

```jsx
products.sort(...)
```

✅ Complex calculations

```jsx
Statistics
Reports
Graphs
Analytics
```

✅ Expensive computations

```jsx
Thousands of records
```

---

# Common Mistake #1

Wrong:

```jsx
const value = useMemo(() => {
  calculateSomething();
}, []);
```

No return statement.

Correct:

```jsx
const value = useMemo(() => {
  return calculateSomething();
}, []);
```

---

# Common Mistake #2

Wrong Dependency

```jsx
const result = useMemo(() => {
  return number * multiplier;
}, [number]);
```

Missing:

```jsx
multiplier
```

Correct:

```jsx
}, [number, multiplier]);
```

---

# Difference Between useMemo and useCallback

| useMemo                | useCallback                             |
| ---------------------- | --------------------------------------- |
| Caches VALUE           | Caches FUNCTION                         |
| Returns result         | Returns function                        |
| Expensive calculations | Prevent unnecessary function recreation |

Example:

```jsx
const total = useMemo(() => {
  return price * quantity;
}, [price, quantity]);
```

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

# Interview Questions

### 1. What is useMemo?

A hook that memoizes a computed value and recomputes it only when dependencies change.

---

### 2. Why use useMemo?

To avoid expensive calculations on every render.

---

### 3. Does useMemo prevent re-renders?

No.

It only prevents recalculation of values.

---

### 4. Difference between useMemo and useCallback?

`useMemo` → caches value

`useCallback` → caches function

---

### 5. Can we use useMemo everywhere?

No.

Use it only when calculations are expensive.

---


