import React, { useCallback, useState } from "react";
import DropDown from "../DropDown";
import StickGraph from "./StickGraph";
import { swapElemsByIndex, timeOut } from "../util";
import "./StickGraph.css";
import { generateBars } from "../barGraphFuncs";
const sortAlgoOptions = [
  { label: "bubbleSort", value: "bubblesort" },
  { label: "Merge Sort", value: "mergesort" },
  { label: "BFS", value: "bfs" },
];

let staticBars = generateBars(110, 200);
const SortingVisualizer = () => {
  const [sortAlgo, setSortAlgo] = useState(sortAlgoOptions[0]);
  const [bars, setBars] = useState(staticBars);

  ////performance - doubleEdit?([bar1,bar2,bar...])
  const editBar = (bar) => {
    const updatedBars = bars.map((currBar) => {
      if (currBar.id === bar.id) {
        currBar = bar;
      }
      return currBar;
    });
    setBars(updatedBars);
  };

  const onSolveButtonClick = async () => {
    switch (sortAlgo.value) {
      case "bubblesort":
        const solution = bubbleSort(bars); ///all the swapping steps
        let test = [...bars];
        for (let x in solution) {
          await timeOut(1);
          swapElemsByIndex(test, solution[x][0], solution[x][1]);
          swapBars(solution[x][0], solution[x][1]);
        }
        break;
      case "mergesort":
        setBars(mergeSort(bars));
        break;
      default:
        console.log("select an algo");
    }
  };
  const testButton = async () => {
    swapBars(0, 1);
    await timeOut(1);
    swapBars(1, 2);
    await timeOut(1);
    swapBars(2, 3);
    await timeOut(1);
    swapBars(3, 4);
    await timeOut(1);
    swapBars(4, 5);

    // const tempVal = bars[0].value;
    // editBar({ ...bars[0], value: bars[1].value });
    // editBar({ ...bars[1], value: tempVal });
  };

  const swapBars = (i, j) => {
    // const updatedArr = [...bars];
    // const tempJ = updatedArr[j];
    // updatedArr[j] = updatedArr[i];
    // updatedArr[i] = tempJ;
    // setBars(updatedArr);

    const swappedArr = [...bars];
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

      <button onClick={testButton}>testbutton</button>
    </div>
  );
};
export default SortingVisualizer;

const bubbleSort = (arr) => {
  const solution = [];
  const sortedArr = [...arr];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (sortedArr[j].value > sortedArr[j + 1].value) {
        swapElemsByIndex(sortedArr, j, j + 1);
        solution.push([j, j + 1]);
      }
    }
  }
  return solution;
};
const mergeSort = (unsortedArr) => {
  const arr = [...unsortedArr];
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2),
    left = mergeSort(arr.slice(0, mid)),
    right = mergeSort(arr.slice(mid));
  return merge(left, right);
};

const merge = (arr1, arr2) => {
  let sorted = [];
  while (arr1.length && arr2.length) {
    if (arr1[0].value < arr2[0].value) sorted.push(arr1.shift());
    else sorted.push(arr2.shift());
  }
  return sorted.concat(arr1.slice().concat(arr2.slice()));
};
