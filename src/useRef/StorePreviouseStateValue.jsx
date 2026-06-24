import React, { useEffect, useRef, useState } from 'react'

function StorePreviouseStateValue() {
    const [count,setCount]=useState(0);
    const prevCount=useRef(0);

    useEffect(()=>
    {
        prevCount.current=count;

    },[count]);
  return (
    <div>
      <h2>Current: {count}</h2>
      <h2>Previous: {prevCount.current}</h2>
      <button onClick={()=>setCount(count+1)}>
        Increament
      </button>
    </div>
  )
}

export default StorePreviouseStateValue
