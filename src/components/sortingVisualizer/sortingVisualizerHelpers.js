import { bubbleSort } from "../../algorithms/sorting/bubbleSort";

const onSolveButtonClick = (onStart,onEnd,algo,bars) => {
    let [sortedArr, solutionSteps] = [];
    // setIsSorting( true);
    onStart()
    // const [sortedArr, solutionSteps] = sort(bars) ///all the swapping steps
    switch (algo) {
      case "bubblesort":
        [sortedArr, solutionSteps] = bubbleSort(bars); ///all the swapping steps
        //  visualBubbleSort(solutionSteps, sortedArr);
        break;
    // //   case "mergesort":
    //     [sortedArr, solutionSteps] = mergeSort(bars);
    //     setBars(sortedArr);
    //     for (let obj of solutionSteps) {
    //       switch (obj.type) {
    //         case "compare":
    //           console.log("comapre");
    //           break;
    //         case "cutInHalf":
    //           let left = obj.objects[0];
    //           let right = obj.objects[1];
    //           console.log("left:", left, "right:", right);
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //     break;
      default:
        console.log("select an algo");
    }
    // onEnd()
    // setIsSorting(false);
    // setSkipAnimation(false)
  };

export{
    onSolveButtonClick
}