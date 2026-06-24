import React, { useReducer } from 'react'

const initialState={
    name:"",
    age:""
}

function reducer(state,action)
{
    switch(action.type)
    {
        case "setName":
            return{
                ...state,
            name:action.payload
            };

        case "setAge":
            return{
                ...state,
                age:action.payload
            };
        
        case "reset":
            return initialState;
        
        default:
            return state;
    }
}

function UserForm() {
    const [state,dispatch]=useReducer(reducer,initialState);


  return (
    <div>
      <input
        placeholder="Name"
        value={state.name}
        onChange={(e)=>dispatch(
            {
                type:"setName",
                payload:e.target.value
            }
        )}
      />

      <input
        placeholder="Age"
        value={state.age}
        onChange={(e)=>dispatch(
            {
                type:"setAge",
                payload:e.target.value
            }
        )}
      />

      <button onClick={()=>dispatch({type:"reset"})}>
        Reset
      </button>

      <h1>Name: {state.name}</h1>
      <h1>Age: {state.age}</h1>
    </div>
  )
}

export default UserForm
