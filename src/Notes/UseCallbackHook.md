# useCallback (Masterclass)

# First, Let's Understand the Real Problem

Suppose we have this code.

## Child.jsx

```jsx
import React from "react";

function Child({ onClick }) {
  console.log("Child Render");

  return (
    <div>
      <button onClick={onClick}>
        Child Button
      </button>
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
  console.log("Parent Render");

  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count {count}
      </button>

      <Child
        onClick={() => console.log("Hello")}
      />
    </>
  );
}
```

---

## Question

You already know:

Child is wrapped with

```jsx
React.memo()
```

So...

Will Child re-render?

Many beginners answer:

> ❌ No.

The correct answer is:

> ✅ YES!

Console:

```
Parent Render

Child Render
```

Click again

```
Parent Render

Child Render
```

Again

```
Parent Render

Child Render
```

Why??

---

# The Secret Is JavaScript

Look carefully.

```jsx
() => console.log("Hello")
```

Looks the same.

But JavaScript treats it differently.

Every render creates a **brand new function**.

Imagine this:

First render

```text
Function A
```

Second render

```text
Function B
```

Third render

```text
Function C
```

They have identical code...

But different memory locations.

---

# Real JavaScript Example

```javascript
const a = () => {};

const b = () => {};

console.log(a === b);
```

Output

```
false
```

Even though both are empty.

Different references.

---

Another example

```javascript
function hello() {}

function hello2() {}

console.log(hello === hello2);
```

Output

```
false
```

---

# Visual Representation

Every render

```
App()

↓

Creates

↓

NEW FUNCTION

↓

React.memo compares

↓

Old Function

New Function

↓

Different

↓

Child renders
```

---

# React.memo Checks References

Remember:

Primitive

```
10 === 10

true
```

Object

```
{} === {}

false
```

Array

```
[] === []

false
```

Function

```
() => {}

===

() => {}

false
```

This is why React.memo fails.

---

# Enter useCallback

`useCallback` tells React:

> "Keep using the same function reference until one of these dependencies changes."

Syntax

```jsx
const memoizedFunction = useCallback(() => {
  // code
}, [dependencies]);
```

---

# Complete Example

## App.jsx

```jsx
import { useState, useCallback } from "react";
import Child from "./Child";

export default function App() {
  console.log("Parent Render");

  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Hello");
  }, []);

  return (
    <>
      <button
        onClick={() => setCount(count + 1)}
      >
        Count {count}
      </button>

      <Child
        onClick={handleClick}
      />
    </>
  );
}
```

---

## Child.jsx

```jsx
import React from "react";

function Child({ onClick }) {
  console.log("Child Render");

  return (
    <button onClick={onClick}>
      Child Button
    </button>
  );
}

export default React.memo(Child);
```

---

## Console

First render

```
Parent Render

Child Render
```

Click counter

```
Parent Render
```

Notice

```
Child Render
```

is gone.

Why?

Because

```
handleClick
```

has the **same reference**.

---

# Internal Working

Without useCallback

```
Render 1

↓

Function A
```

Render 2

```
↓

Function B
```

Render 3

```
↓

Function C
```

React.memo sees

```
A !== B
```

Render Child.

---

With useCallback

```
Render 1

↓

Function A
```

Render 2

```
↓

Function A
```

Render 3

```
↓

Function A
```

React.memo sees

```
A === A
```

Skip Child.

---

# Dependencies Matter

Suppose

```jsx
const [count, setCount] = useState(0);

const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

Now

Every time

```
count
```

changes

React creates

```
NEW FUNCTION
```

because dependency changed.

This is correct.

---

# Common Mistake #1

Bad

```jsx
const handleClick = () => {
  console.log("Hello");
};
```

Every render

↓

New function.

---

Good

```jsx
const handleClick = useCallback(() => {
  console.log("Hello");
}, []);
```

---

# Common Mistake #2

Missing dependency

Bad

```jsx
const handleClick = useCallback(() => {
  console.log(count);
}, []);
```

Problem

The callback "remembers" the initial value of `count`.

If `count` changes, the callback still logs the old value because React never recreated it.

Correct

```jsx
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

---

# useCallback vs useMemo

Many people confuse them.

## useMemo

Caches

```
VALUE
```

Example

```jsx
const filteredProducts = useMemo(() => {
  return products.filter(product =>
    product.price > 100
  );
}, [products]);
```

---

## useCallback

Caches

```
FUNCTION
```

Example

```jsx
const deleteProduct = useCallback((id) => {
  console.log(id);
}, []);
```

---

# Side-by-Side

```jsx
const person = useMemo(() => {
  return {
    name: "John",
  };
}, []);
```

Returns

```
OBJECT
```

---

```jsx
const handleClick = useCallback(() => {
  console.log("Hi");
}, []);
```

Returns

```
FUNCTION
```

---

# When NOT to Use useCallback

Don't wrap every function.

Bad

```jsx
const add = useCallback(() => {
  return 5 + 5;
}, []);
```

If you're not passing it to a memoized child or using it as a dependency elsewhere, it often adds unnecessary complexity.

---

# Real Project Example

Imagine

```
Dashboard

↓

ProductList

↓

ProductCard
```

Every ProductCard receives

```jsx
onDelete
```

Without useCallback

```
Dashboard renders

↓

New onDelete

↓

Every ProductCard renders
```

With useCallback

```
Dashboard renders

↓

Same onDelete

↓

ProductCard skipped
```

Huge performance improvement.

---

# React.memo + useMemo + useCallback

This is the trio you'll use frequently.

```jsx
const filteredProducts = useMemo(() => {
  return products.filter(...);
}, [products, search]);
```

↓

```jsx
const handleDelete = useCallback((id) => {
  ...
}, []);
```

↓

```jsx
export default React.memo(ProductCard);
```

Each one solves a different problem:

* `useMemo` → avoids recalculating expensive values.
* `useCallback` → avoids recreating function references.
* `React.memo` → avoids re-rendering components when props haven't changed.

---

# Interview Questions

### 1. What is useCallback?

A hook that memoizes a function and returns the same function reference until its dependencies change.

---

### 2. Why do we use useCallback?

To prevent unnecessary function recreation, especially when passing callbacks to memoized child components or when a stable function reference is required.

---

### 3. Difference between useMemo and useCallback?

| useMemo                 | useCallback        |
| ----------------------- | ------------------ |
| Caches a computed value | Caches a function  |
| Returns a value         | Returns a function |

---

### 4. Does useCallback improve performance?

Not automatically.

It helps only when a stable function reference matters (such as with `React.memo` or dependency arrays). Overusing it can make code harder to read without providing benefits.

---

### 5. Why does React.memo fail with inline functions?

Because a new function object is created on every render, so the prop reference changes.

---

