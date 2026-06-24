import React, { useReducer, useState } from "react";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "EDIT_TODO":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );

    case "TOGGLE_COMPLETE":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
}
function TodoApp() {
  const [text, setText] = useState("");
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (text.trim() === "") return;

    if (editId) {
      dispatch({
        type: "EDIT_TODO",
        payload: {
          id: editId,
          text,
        },
      });
      setEditId(null);
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: text,
      });
    }

    setText("");
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setText(todo.text);
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />

      <button onClick={handleSubmit}>{editId ? "Save todo" : "Add todo"}</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() =>
                dispatch({
                  type: "TOGGLE_COMPLETE",
                  payload: todo.id,
                })
              }
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>

            <button
              onClick={() =>
                dispatch({
                  type: "DELETE_TODO",
                  payload: todo.id,
                })
              }
            >
              Delete
            </button>

            <button onClick={() => startEdit(todo)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
