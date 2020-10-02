import React, { useState } from "react";
import DropDown from "../DropDown";
import StickGraph from "./StickGraph";
import "./StickGraph.css";
import { generateBars } from "../barGraphFuncs";
const sortAlgoOptions = [
  { label: "bubbleSort", value: "bubblesort" },
  { label: "A*", value: "a*" },
  { label: "BFS", value: "bfs" },
];

let staticBars = generateBars(110, 200);
const SortingVisualizer = () => {
  const [sortAlgo, setSortAlgo] = useState(sortAlgoOptions[0]);
  const [bars, setBars] = useState(staticBars);
  const [count, setCount] = useState(0);
  const swapBars = (i, j) => {
    let swappedArr = bars.slice();
    let temp = swappedArr[i];
    swappedArr[i] = swappedArr[j];
    swappedArr[j] = temp;
    setBars(swappedArr);
    console.log("swapped", i, j);
  };

  const bubbleSort = async (arr, swap) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].value > arr[j + 1].value) {
          await new Promise((r) => setTimeout(r, 100));
          swap(j, j + 1);
        }
      }
    }
  };
  return (
    <div>
      <DropDown
        label={"select algo"}
        options={sortAlgoOptions}
        selected={sortAlgo}
        onSelectedChange={setSortAlgo}
      ></DropDown>
      <div className="bar-graph">
        <StickGraph sticks={bars}></StickGraph>
      </div>
      <h1>{count}</h1>
      <button onClick={() => bubbleSort(bars, swapBars)}></button>
    </div>
  );
};
export default SortingVisualizer;
