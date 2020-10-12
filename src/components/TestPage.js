import React, { useRef, useState,useEffect } from "react";
import useInterval from './useInterval'
import { timeOut } from "./util";


const TestPage=({counter,onNext,pause})=>{
  // const [counter,setCounter] = useState(0)

  // useInterval(()=>{    
  //   onNext(counter)
  // },pause?null:1000) 
  


  return(
  <div>
    <h1>counter:{counter}</h1>
  </div>
  )
}

export default TestPage;
