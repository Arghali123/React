import React, { useRef } from 'react'

function Excersise1() {
    const countRef=useRef(0);

    const increment=()=>
    {
        countRef.current++;
        console.log(countRef.current);
    }
  return (
    <div>
      <button
      onClick={increment}>Increment</button>
    </div>
  )
}

export default Excersise1
