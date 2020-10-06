import React, { useCallback, useState } from "react";
import DropDown from "../DropDown";
import StickGraph from "./StickGraph";
import { swapElemsByIndex, timeOut } from "../util";
import "./StickGraph.css";
import { generateBars } from "../barGraphFuncs";
import { createIncrementalCompilerHost } from "typescript";
import { columnTransformDependencies } from "mathjs";
const sortAlgoOptions = [
  { label: "bubbleSort", value: "bubblesort" },
  { label: "Merge Sort", value: "mergesort" },
  { label: "BFS", value: "bfs" },
];

let staticBars = generateBars(50, 100);
staticBars.forEach((bar) => {
  bar.color = "#aaa";
});
const SortingVisualizer = () => {
  const [sortAlgo, setSortAlgo] = useState(sortAlgoOptions[0]);
  const [bars, setBars] = useState(staticBars);
  const animationSpeed = 0;

  const onSolveButtonClick = async () => {
    switch (sortAlgo.value) {
      case "bubblesort":
        const [sortedArr, solutionSteps] = bubbleSort(bars); ///all the swapping steps
        for (let obj of solutionSteps) {
          switch (obj.type) {
            case "paint":
              paintBars(obj.objects[0], obj.objects[1], "rgb(209, 170, 170)");
              await timeOut(animationSpeed);
              paintBars(obj.objects[0], obj.objects[1], "#aaa");
              break;
            case "swap":
              swapBars(obj.objects[0], obj.objects[1]);
              await timeOut(animationSpeed);
              break;
            default:
              break;
          }
        }
        break;
      case "mergesort":
        setBars(mergeSort(bars));
        break;
      default:
        console.log("select an algo");
    }
  };
  const testButton = () => {
    paintBars(0, 1);
  };

  const swapBars = (i, j) => {
    setBars((prevState) => {
      let newState = [...prevState];
      const temp = newState[i];
      newState[i] = newState[j];
      newState[j] = temp;
      return newState;
    });
  };
  const paintBars = (i, j, color) => {
    setBars((prevState) => {
      let newState = [...prevState];
      newState[i].color = color;
      newState[j].color = color;
      return newState;
    });
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

const bubbleSort = (defaultArr) => {
  const arr = [...defaultArr];
  const solution = [];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      solution.push({ type: "paint", objects: [j, j + 1] });
      if (arr[j].value > arr[j + 1].value) {
        //swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        //saving the step
        solution.push({ type: "swap", objects: [j, j + 1] });
      }
    }
  }
  return [arr, solution];
};
