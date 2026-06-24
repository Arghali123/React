import React, { useMemo, useState } from 'react'

function ExpensiveCalculation() {
    const [number,setNumber]=useState(1);
    const [dark,setDark]=useState(false);

    const slowSquare=(num)=>
    {
        console.log("running expensive calculation")
        for(let i=0;i<1000000;i++)
        {}
        return num * num;
    }

    const squaredNumber=useMemo(()=>
    {
        return slowSquare(number);
    },[number]);

    const themeStyle={
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
    padding: "20px"
    }
  return (
    <div style={themeStyle}>
      <input
        type='number'
        value={number}
        onChange={(e)=>setNumber(Number(e.target.value))}
      />
      <h2>Square: {squaredNumber}</h2>
      <button onClick={()=>setDark(!dark)}>
        Toggle Theme
      </button>
    </div>
  )
}

export default ExpensiveCalculation
