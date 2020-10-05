import React, { useCallback, useState } from "react";
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
  const onSolveButtonClick = () => {
    bubbleSort(bars, swap);
  };

  const swap = (i, j) => {
    const swappedArr = [...bars];
    // const temp = swappedArr[i];
    // swappedArr[i] = swappedArr[j];
    // swappedArr[j] = temp;
    // setBars(swappedArr);
    const tempVal = swappedArr[i].value;
    swappedArr[i].value = bars[j].value;
    swappedArr[j].value = tempVal;
    setBars(swappedArr);
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

      <button onClick={onSolveButtonClick}>solve</button>
      <button
        onClick={() => {
          swap(10, 11);
        }}
      >
        swap 10 11
      </button>
      <button onClick={() => console.log(bars)}>print</button>
      <button onClick={() => setCount(count + 1)}>++</button>
    </div>
  );
};
export default SortingVisualizer;

const bubbleSort = async (arr, swap) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j].value > arr[j + 1].value) {
        await new Promise((r) => setTimeout(r, 0.001));
        swap(j, j + 1);
      }
    }
  }
  console.log(arr);
};
