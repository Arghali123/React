import React, { useReducer } from 'react'

function reducer(state,action)
{
        switch(action.type) {
        case "increment":
            return state + action.payload;

        case "decrement":
            return state - action.payload;

        case "reset":
            return 0;

        default:
            return state;
    }
}
function Counter() {
    const [count,dispatch]=useReducer(reducer,0);


  return (
    <div>
      <h1>{count}</h1>

      <button onClick={()=>dispatch({type:"increment"})}>
        Increment
      </button>

      <button onClick={()=>dispatch({
        type:"increment",
        payload:5
        })}>
        +5 Increment
      </button>

      <button onClick={()=>dispatch({
        type:"decrement",
        payload:3
        })}>
        -3 Decrement
      </button>
    </div>
  )
}

export default Counter
