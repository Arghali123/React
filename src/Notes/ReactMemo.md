# First, What Problem Does React.memo Solve?

Remember from Part 1:

```
Parent Render
      ↓
Child Render
```

Even if the child doesn't use any state or props.

Example:

```
App
│
├── Navbar
├── Sidebar
├── Products
├── Footer
```

If only the counter changes...

```
App Render

↓

Navbar Render

↓

Sidebar Render

↓

Products Render

↓

Footer Render
```

Imagine `Products` contains **5000 product cards**.

React is doing unnecessary work.

That's exactly why `React.memo` exists.

---

# What is React.memo?

> **React.memo is a Higher-Order Component (HOC) that memoizes a component.**

It tells React:

> "If my props haven't changed, don't render me again."

Syntax:

```jsx
const MemoizedComponent = React.memo(Component);
```

or

```jsx
export default React.memo(Component);
```

---

# Visual Representation

Without React.memo

```
Parent Render
      │
      ▼
Child Render
```

With React.memo

```
Parent Render
      │
      ▼
Compare Props
      │
 ┌────┴─────┐
 │          │
Same      Different
 │          │
Skip      Render
```

---

# Complete Example 1

## Child.jsx

```jsx
import React from "react";

function Child() {
  console.log("Child Rendered");

  return (
    <div
      style={{
        border: "2px solid blue",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      <h2>Child Component</h2>
    </div>
  );
}

export default React.memo(Child);
```

---

## App.jsx

```jsx
import { useState } from "react";
import Child from "./Child";

export default function App() {
  console.log("Parent Rendered");

  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Count : {count}</h1>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <Child />
    </div>
  );
}
```

---

## Console

First render

```
Parent Rendered

Child Rendered
```

Click button

```
Parent Rendered
```

Notice:

```
Child Rendered
```

is gone!

Why?

Because Child received **no props**.

React compares

Old Props

```
{}
```

New Props

```
{}
```

Same.

So React skips Child.

---

# Example 2 (Passing Props)

## Child.jsx

```jsx
import React from "react";

function Child({ name }) {
  console.log("Child Render");

  return <h2>{name}</h2>;
}

export default React.memo(Child);
```

---

## App.jsx

```jsx
import { useState } from "react";
import Child from "./Child";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        onClick={() => setCount(count + 1)}
      >
        Count {count}
      </button>

      <Child name="John" />
    </>
  );
}
```

---

Click button.

Console

```
Parent Render
```

No Child render.

Why?

Previous

```
name = "John"
```

Current

```
name = "John"
```

No change.

---

# Example 3 (Props Change)

```jsx
import { useState } from "react";
import Child from "./Child";

export default function App() {
  const [name, setName] = useState("John");

  return (
    <>
      <button
        onClick={() => setName("David")}
      >
        Change Name
      </button>

      <Child name={name} />
    </>
  );
}
```

Console

```
Parent Render

Child Render
```

Why?

Old

```
John
```

New

```
David
```

Props changed.

---

# How Does React Compare Props?

React.memo performs a **shallow comparison**.

What does that mean?

Primitive values:

```
5 === 5

true
```

```
"John" === "John"

true
```

```
true === true

true
```

Objects:

```
{} === {}

false
```

Arrays:

```
[] === []

false
```

Functions:

```
() => {}

===

() => {}

false
```

This is the most common source of confusion.

---

# Example 4 (React.memo Doesn't Work)

```jsx
<Child
    person={{ name: "John" }}
/>
```

Looks identical every render.

But React sees:

Render 1

```
{
   name:"John"
}
```

Render 2

```
{
   name:"John"
}
```

Same content...

Different object reference.

So

```
Old !== New
```

Child renders again.

---

# Complete Example

```jsx
import { useState } from "react";
import Child from "./Child";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button
        onClick={() => setCount(count + 1)}
      >
        {count}
      </button>

      <Child
        person={{ name: "John" }}
      />
    </>
  );
}
```

Child.jsx

```jsx
import React from "react";

function Child({ person }) {
  console.log("Child Render");

  return <h2>{person.name}</h2>;
}

export default React.memo(Child);
```

Click button.

```
Parent Render

Child Render
```

Again

```
Parent Render

Child Render
```

React.memo failed!

---

# Why?

Every render creates

```
NEW OBJECT
```

Like this

```
Render 1

Object A
```

```
Render 2

Object B
```

Different memory addresses.

---

# Fix Using useMemo

```jsx
const person = useMemo(() => {
    return {
        name: "John"
    };
}, []);
```

Now

```
Same object
```

React.memo works.

This is one reason `useMemo` and `React.memo` are often used together.

---

# Example 5 (Arrays)

Bad

```jsx
<Child
    list={[1,2,3]}
/>
```

Every render

```
New Array
```

Child renders.

---

Good

```jsx
const list = useMemo(() => {
    return [1,2,3];
}, []);
```

Now

```
Same Array Reference
```

---


# React.memo vs useMemo

| React.memo                      | useMemo                             |
| ------------------------------- | ----------------------------------- |
| Memoizes a **component**        | Memoizes a **value**                |
| Prevents unnecessary re-renders | Prevents unnecessary recalculations |
| Works on component props        | Works on expensive computations     |

Example:

```jsx
const filteredProducts = useMemo(() => {
    return products.filter(...);
}, [products]);
```

vs

```jsx
export default React.memo(ProductCard);
```

---

# Common Mistakes

### Mistake 1

```jsx
<Child
    user={{name:"John"}}
/>
```

New object every render.

---

### Mistake 2

```jsx
<Child
    numbers={[1,2,3]}
/>
```

New array every render.

---

### Mistake 3

Passing inline functions (we'll solve this with `useCallback`):

```jsx
<Child
    onClick={() => console.log("Hi")}
/>
```

Every render creates a new function.

So `React.memo` can't skip rendering.

This is exactly why `useCallback` exists.

---

# Interview Questions

### 1. What is React.memo?

A higher-order component that memoizes a functional component and skips re-rendering when its props haven't changed.

---

### 2. How does React.memo compare props?

Using a shallow comparison (`Object.is`-based comparison for each prop).

---

### 3. Does React.memo prevent all re-renders?

No. It only skips re-rendering when the component's props are unchanged.

---

### 4. Why doesn't React.memo work with objects or arrays?

Because new object and array literals create new references on every render, even if their contents are identical.

---

### 5. When should you use React.memo?

For components that render often, are relatively expensive to render, and usually receive the same props between renders.

