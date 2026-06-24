import React, { useEffect, useRef, useState } from 'react'

function Exercise3() {
    const [count,setCount]=useState(0);

    const renderCount=useRef(0);

    useEffect(()=>
    {
        renderCount.current++;
    },[]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <h2>Render: {renderCount.current}</h2>
      <button onClick={()=>setCount(count+1)}>
       Increment
      </button>
    </div>
  )
}

export default Exercise3
