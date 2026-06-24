
# 1. Why useReducer?

Normally we manage state using `useState`.

Example:

```jsx
const [count, setCount] = useState(0);
```

This works fine for simple state.

But when:

* State becomes complex
* Multiple state values are related
* Many state updates happen
* Logic becomes difficult to manage

`useReducer` becomes a better choice.

---

## Real-Life Analogy

Imagine an ATM machine.

User can:

* Deposit money
* Withdraw money
* Reset account

Instead of directly changing balance everywhere, all requests go through a central manager.

That manager is the **Reducer Function**.

---

# 2. Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

### Parameters

| Parameter    | Meaning                          |
| ------------ | -------------------------------- |
| reducer      | Function containing update logic |
| initialState | Initial value                    |
| state        | Current state                    |
| dispatch     | Sends actions                    |

---

# 3. Basic Flow

```text
User Clicks Button
       ↓
dispatch(action)
       ↓
Reducer Receives Action
       ↓
Updates State
       ↓
Component Re-renders
```

---



# 9. useState vs useReducer

| useState            | useReducer          |
| ------------------- | ------------------- |
| Simple state        | Complex state       |
| Easy to learn       | Slightly advanced   |
| Small components    | Large components    |
| Few updates         | Many updates        |
| Less code initially | Better organization |

---

# 10. useReducer + useContext

This is extremely important.

Most React applications combine:

```text
useReducer
+
useContext
=
Mini Redux
```

Architecture:

```text
Context
   ↓
Reducer
   ↓
Global State
   ↓
All Components
```

This is the next step after mastering useReducer.

---

# Interview Questions

### 1. What is useReducer?

A hook used for managing complex state logic in React.

---

### 2. When should you use useReducer instead of useState?

When state is complex and multiple state transitions are involved.

---

### 3. What does dispatch do?

Dispatch sends an action to the reducer.

```jsx
dispatch({
    type: "increment"
});
```

---

### 4. What is a reducer function?

A function that receives:

```jsx
(state, action)
```

and returns new state.

---

### 5. Why must reducers be pure functions?

Because they should:

* Not modify original state
* Not call APIs
* Not have side effects

They should only return new state.

---

### 6. Can useReducer replace Redux?

For small and medium applications:

✅ Yes

For very large applications:

Redux or other state management solutions may still be useful.

---

