import React, { useState, useEffect } from "react";
import "./PathFinding.css";
import Table from "./Table";
import dijkstra from "../../algorithms/dijkstra";
import bfs from "../../algorithms/bestfirstsearch";

import DropDown from "../DropDown";

const algoOptions = [
  { label: "Dijkstra", value: "dijkstra" },
  { label: "A*", value: "a*" },
  { label: "BFS", value: "bfs" },
];

const PathFinding = () => {
  const [algoSelected, setAlgoSelected] = useState(algoOptions[0]);
  const [height, setHeight] = useState(20);
  const [width, setWidth] = useState(20);
  const [nodes, setNodes] = useState([]);
  const [startRow, setStartRow] = useState(1);
  const [startCol, setStartCol] = useState(1);
  const [finishRow, setFinishRow] = useState(5);
  const [finishCol, setFinishCol] = useState(19);
  const [randomWeights, setRandomWeights] = useState(false);
  const drawDeafultGrid = () => {
    const nodes = [];
    for (let row = 0; row < height; row++) {
      let currentRow = [];
      for (let col = 0; col < width; col++) {
        const currentNode = {
          index: `${row},${col}`,
          row,
          col,
          isStart: row === startRow && col === startCol,
          isFinish: row === finishRow && col === finishCol,
          isVisited: false,
          isWall: false,
          isSolution: false,
          weight: randomWeights ? Math.floor(Math.random() * 10) : 1,
        };
        currentRow.push(currentNode);
      }
      nodes.push({ rowNum: row, nodes: currentRow });
    }
    setNodes(nodes);
  };

  useEffect(drawDeafultGrid, [
    height,
    width,
    startRow,
    startCol,
    randomWeights,
    finishRow,
    finishCol,
  ]);

  const getThePrevPath = (node, grid) => {
    if (!node.prev) {
      return grid;
    }
    node.isSolution = true;
    return getThePrevPath(node.prev, grid);
  };

  const onSolveButtonClick = () => {
    var solution;
    switch (algoSelected.value) {
      case "dijkstra":
        solution = dijkstra(
          nodes,
          nodes[startRow].nodes[startCol],
          nodes[finishRow].nodes[finishCol]
        );
        getThePrevPath(solution[finishRow].nodes[finishCol], solution);
        break;
      case "bfs":
        solution = bfs(
          nodes,
          nodes[startRow].nodes[startCol],
          nodes[finishRow].nodes[finishCol]
        );
        getThePrevPath(solution[finishRow].nodes[finishCol], solution);
        break;
      default:
        solution = nodes;
        alert("yet to be supported");
    }
    setNodes(solution);
  };

  return (
    <div className="pathfinding">
      <div className="top-bar">
        <DropDown
          label={"select algo"}
          options={algoOptions}
          selected={algoSelected}
          onSelectedChange={setAlgoSelected}
        ></DropDown>

        <button className="ui primary button" onClick={onSolveButtonClick}>
          Solve
        </button>
        <button className="ui button" onClick={drawDeafultGrid}>
          Reset
        </button>
        <button
          className="ui button"
          onClick={() => {
            console.log("asd");
            setRandomWeights(!randomWeights);
          }}
        >
          Random Weights
        </button>
      </div>
      <div className="fullWidth">
        <div className="grid-options">
          <div>
            <label>Grid options</label>
            <div className="ui form ">
              <div className="fields">
                <div className=" field two wide">
                  <label>height</label>
                  <input
                    value={height}
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="field two wide">
                  <label>width</label>
                  <input
                    value={width}
                    onChange={(e) => {
                      setWidth(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Starting node</label>
            <div className="ui form">
              <div className="fields">
                <div className="field two wide">
                  <label>row</label>
                  <input
                    value={startRow}
                    onChange={(e) => {
                      setStartRow(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="field two wide">
                  <label>column</label>
                  <input
                    value={startCol}
                    onChange={(e) => {
                      setStartCol(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Starting node</label>
            <div className="ui form">
              <div className="fields">
                <div className="field two wide">
                  <label>row</label>
                  <input
                    value={finishRow}
                    onChange={(e) => {
                      setFinishRow(e.target.value);
                    }}
                  ></input>
                </div>
                <div className="field two wide">
                  <label>column</label>
                  <input
                    value={finishCol}
                    onChange={(e) => {
                      setFinishCol(e.target.value);
                    }}
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table">
        <Table rows={nodes}></Table>
      </div>
    </div>
  );
};
export default PathFinding;
