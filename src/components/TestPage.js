import React, { useRef, useState,useEffect } from "react";
import useInterval from './useInterval'


const TestPage=()=>{
  const [counter,setCounter] = useState(0)
  const [pause,setPause] = useState(false)

  useInterval(()=>{
    console.log(counter);
  },pause?null:1000)
  
  const onClick=()=>{
    setCounter(counter+1)
  }
  
  return(
  <div>
    <h1>counter:{counter}</h1>
    <button onClick={onClick}>inc</button>
    <button onClick={()=>{setPause(true)}}>noDelay</button>

  </div>
  )
}

export default TestPage;
