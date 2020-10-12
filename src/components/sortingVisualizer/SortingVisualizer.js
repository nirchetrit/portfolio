import React, { useEffect, useRef, useState, useReducer } from "react";
import DropDown from "../DropDown";
import StickGraph from "./StickGraph";
import { swapElemsByIndex, timeOut } from "../util";
import "./StickGraph.css";
import { generateBars } from "../barGraphFuncs";
import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
import { mergeSort } from "../../algorithms/sorting/mergeSort";
import { forEach, sort } from "mathjs";
import useInterval from "../useInterval";
import { onSolveButtonClick } from './sortingVisualizerHelpers'
const useForceRerender = () => useReducer((state) => !state, false)[1];
const getSwappedArrayElementsByIndices = (arr, index1, index2) => {
  let newState = [...arr];
  const temp = newState[index1];
  newState[index1] = newState[index2];
  newState[index2] = temp;
  return newState;
}

const useVisualBubbleSort = ({ arr, delay, onSwap, onPaint, onFinish }) => {
  const [index, setIndex] = useState(0)
  const [shouldRun, setShouldRun] = useState(false)
  const [shouldSolve, setShouldSolve] = useState(true)
  const [updatedSolutionSteps, setUpdatedSolutionSteps] = useState([])

  if (arr && arr.length && index === 0 && shouldSolve) {
    ///should run only when there is no solution for the new arr
    let [sortedArr, solutionSteps] = bubbleSort(arr)
    console.log('solved the algo - should appear once for every new unsorted arr');
    let temp = solutionSteps.reduce((acc, curr) => {
      if (curr.type === 'paint') {
        return acc.concat({ ...curr, color: 'rgb(209,170,170)' }).concat({ ...curr, color: '#aaa' })
      }
      else {
        return acc.concat(curr)
      }
    }, [])
    setUpdatedSolutionSteps(temp)
    setShouldSolve(false)//because already solved
    setShouldRun(true)///should visualize the solution..
  }
  useInterval(() => {
    if (index === updatedSolutionSteps.length) {/// - reach to end of array
      setIndex(0) /// need to initialize the index to 0 again
      onFinish()
      setShouldRun(false)///should stop visualizing
      setShouldSolve(true)///should be able to solve again
      return
    }
    let obj = updatedSolutionSteps[index]
    switch (obj.type) {
      case "paint":
        onPaint([obj.objects[0], obj.objects[1]], obj.color)
        break;
      case "swap":
        onSwap(obj.objects[0], obj.objects[1])
        break;
      default:
        break;
    }
    setIndex(prev => prev + 1)
  }, shouldRun ? delay : null)

}


let initialBarsAmount = 5;
const useGeneratedBars = (barsAmount) => {
  const [bars, setBars] = useState(generateBars(barsAmount, 100));
  useEffect(() => {
    setBars(generateBars(barsAmount, 100));
  }, [barsAmount])
  return [bars, setBars]
}

const sortAlgoOptions = [
  { label: "bubbleSort", value: "bubblesort" },
  { label: "Merge Sort", value: "mergesort" },
  { label: "BFS", value: "bfs" },
];
const animationSpeedOptions = [
  { label: "fast", value: 0.1 },
  { label: "normal", value: 500 },
  { label: "slow", value: 1000 },
  { label: 'skip anim', value: 0 }
];


const SortingVisualizer = () => {
  const forceRerender = useForceRerender();

  //------------------------------states---------------------------------------/////
  const [sortAlgo, setSortAlgo] = useState(sortAlgoOptions[0]);
  const [barsAmount, setBarsAmount] = useState(initialBarsAmount);
  const [bars, setBars] = useGeneratedBars(barsAmount);
  const [isSorting, setIsSorting] = useState(false);
  // const skipAnimation = useRef(false);
  // const animationSpeed = useRef(animationSpeedOptions[0]);
  const [skipAnimation, setSkipAnimation] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(animationSpeedOptions[0]);
  //------------------------------states---------------------------------------/////


  const testButton = () => {
    paintBars(0, 1);
  };
  const resetButton = () => {
    console.log("reset");
    paintBars([1, 2, 3], 'black')

    console.log(bars);
  };

  const swapBars = (i, j) => {
    setBars((prevState) => {
      return getSwappedArrayElementsByIndices(prevState, i, j)
    });
  };

  const paintBars = (indices, color) => {
    setBars((prevState) => {
      let newState = [...prevState];
      indices.forEach(index => {
        newState[index].color = color
      })
      return newState;
    });
  };
  const onBarsAmountChange = (amount) => {
    setBarsAmount(amount || initialBarsAmount)
  };

  let shouldBubblesortRun = isSorting && sortAlgo.value === 'bubblesort'

  useVisualBubbleSort({ arr: shouldBubblesortRun ? bars : null, delay: animationSpeed.value, onSwap: swapBars, onPaint: paintBars, onFinish: () => { setIsSorting(false) } })

  const onSolve = () => {
    setIsSorting(true)
  }

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
        selected={animationSpeed}
        onSelectedChange={setAnimationSpeed}
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
      <button onClick={onSolve}>solve</button>
      {isSorting ? (
        <button onClick={() => (setSkipAnimation(skipAnimation))}>
          skipAnimation
        </button>
      ) : (
          <button onClick={resetButton}>reset</button>
        )}
      <button onClick={resetButton}>testbutton</button>
    </div>
  );
};
export default SortingVisualizer;
