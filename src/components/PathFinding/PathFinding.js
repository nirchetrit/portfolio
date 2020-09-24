import React, { useState, useEffect } from "react";
import Table from "./Table";
import dijkstra from "../../algorithms/dijkstra";

const startRow = 10;
const startCol = 3;
const finishRow = 18;
const finishCol = 42;
const PathFinding = () => {
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    let tempNodes = [];
    for (let row = 0; row < 20; row++) {
      let currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          index: `${row},${col}`,
          row,
          col,
          isStart: row === startRow && col === startCol,
          isFinish: row === finishRow && col === finishCol,
          isVisited: false,
          isWall: false,
        };
        currentRow.push(currentNode);
      }
      tempNodes.push({ rowNum: row, nodes: currentRow });
    }
    setNodes(tempNodes);
  }, []);

  if (nodes[0]) {
    console.log(
      dijkstra(
        nodes,
        nodes[startRow].nodes[startCol],
        nodes[finishRow].nodes[finishCol]
      )
    );
  }

  return <Table rows={nodes}></Table>;
};
export default PathFinding;
