import React, { useRef } from 'react'

function Excerise2() {
    const inputRef=useRef();

    const handleFocus=()=>
    {
        inputRef.current.focus();
    }
  return (
    <div>
      <input ref={inputRef}/>
      <button onClick={handleFocus}>
        Focus Input
      </button>
    </div>
  )
}

export default Excerise2
