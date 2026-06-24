import React, { useRef } from 'react'

function StoreTimerId() {
    const timerRef=useRef();

    const start=()=>
    {
        timerRef.current=setInterval(() => {
            console.log("running");
        }, 1000);
    };

    const stop=()=>
    {
        clearInterval(timerRef.current);
    }
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

export default StoreTimerId
