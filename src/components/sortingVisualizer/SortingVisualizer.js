import React, { useEffect, useRef, useState, useReducer } from "react";
import DropDown from "../DropDown";
import StickGraph from "./StickGraph";
import { swapElemsByIndex, timeOut } from "../util";
import "./StickGraph.css";
import { generateBars } from "../barGraphFuncs";
import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
import { mergeSort } from "../../algorithms/sorting/mergeSort";
const useForceRerender = () => useReducer((state) => !state, false)[1];

const sortAlgoOptions = [
  { label: "bubbleSort", value: "bubblesort" },
  { label: "Merge Sort", value: "mergesort" },
  { label: "BFS", value: "bfs" },
];
const animationSpeedOptions = [
  { label: "fast", value: 0 },
  { label: "normal", value: 0.5 },
  { label: "slow", value: 1 },
];
let staticBarsAmount = 30;
let staticBars = generateBars(staticBarsAmount, 100);

const SortingVisualizer = () => {
  const forceRerender = useForceRerender();

  //------------------------------states---------------------------------------/////
  const [sortAlgo, setSortAlgo] = useState(sortAlgoOptions[0]);
  const [bars, setBars] = useState(staticBars);
  const [barsAmount, setBarsAmount] = useState(staticBarsAmount);
  // const [animationSpeed, setAnimationSpeed] = useState(
  //   animationSpeedOptions[0]
  // );
  const animationSpeed = useRef(animationSpeedOptions[0]);
  const [isSorting, setIsSorting] = useState(false);
  const skipAnimation = useRef(false);

  //------------------------------states---------------------------------------/////
  useEffect(() => {
    setBars(generateBars(barsAmount, 100));
  }, [barsAmount]);

  const visualBubbleSort = async (solutionSteps, sortedArr) => {
    for (let obj of solutionSteps) {
      if (skipAnimation.current) {
        setBars(sortedArr);
        break;
      } else {
        console.log("animation Speed", animationSpeed.current);
        switch (obj.type) {
          case "paint":
            paintBars(obj.objects[0], obj.objects[1], "rgb(209, 170, 170)");
            await timeOut(animationSpeed.current.value);
            paintBars(obj.objects[0], obj.objects[1], "#aaa");
            break;
          case "swap":
            swapBars(obj.objects[0], obj.objects[1]);
            await timeOut(animationSpeed.current.value);
            break;
          default:
            break;
        }
      }
    }
  };

  const onSolveButtonClick = async () => {
    let [sortedArr, solutionSteps] = [];
    setIsSorting((prev) => true);
    switch (sortAlgo.value) {
      case "bubblesort":
        [sortedArr, solutionSteps] = bubbleSort(bars); ///all the swapping steps
        await visualBubbleSort(solutionSteps, sortedArr);
        break;
      case "mergesort":
        [sortedArr, solutionSteps] = mergeSort(bars);
        setBars(sortedArr);
        for (let obj of solutionSteps) {
          switch (obj.type) {
            case "compare":
              console.log("comapre");
              break;
            case "cutInHalf":
              let left = obj.objects[0];
              let right = obj.objects[1];
              console.log("left:", left, "right:", right);
              break;
            default:
              break;
          }
        }
        break;
      default:
        console.log("select an algo");
    }
    setIsSorting(false);
    skipAnimation.current = false;
  };
  const testButton = () => {
    paintBars(0, 1);
  };
  const resetButton = () => {};

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
  const onBarsAmountChange = (e) => {
    if (e) {
      setBarsAmount(e);
    } else {
      setBarsAmount(staticBarsAmount);
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
      <DropDown
        label={"select animation speed"}
        options={animationSpeedOptions}
        selected={animationSpeed.current}
        onSelectedChange={(v) => {
          animationSpeed.current = v;
          console.log("onSelectedChange", animationSpeed.current);
          forceRerender();
        }}
      ></DropDown>
      <div>
        <label>How Many bars to draw ?</label>
        <input
          value={barsAmount}
          type="number"
          min={1}
          onChange={(e) => onBarsAmountChange(parseInt(e.target.value))}
        ></input>
      </div>
      <div className="bar-graph">
        <StickGraph sticks={bars}></StickGraph>
      </div>
      <button onClick={onSolveButtonClick}>solve</button>
      {isSorting ? (
        <button onClick={() => (skipAnimation.current = true)}>
          skipAnimation
        </button>
      ) : (
        <button onClick={resetButton}>reset</button>
      )}
      <button onClick={testButton}>testbutton</button>
    </div>
  );
};
export default SortingVisualizer;
