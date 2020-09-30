import React, { useState, useEffect } from "react";
import "./PathFinding.css";
import Table from "./Table";
import dijkstra from "../../algorithms/dijkstra";
import bfs from "../../algorithms/bestfirstsearch";
import aStar from "../../algorithms/aStar";

import DropDown from "../DropDown";
import { max, min } from "mathjs";

const algoOptions = [
  { label: "Dijkstra", value: "dijkstra" },
  { label: "A*", value: "a*" },
  { label: "BFS", value: "bfs" },
];
const defaultConfiguration = {
  WIDTH: 3,
  HEIGHT: 3,
  WEIGHTS: 0,
};

const PathFinding = () => {
  const [algoSelected, setAlgoSelected] = useState(algoOptions[0]);
  const [nodes, setNodes] = useState([]);
  //form states

  const [height, setHeight] = useState(defaultConfiguration.HEIGHT);
  const [width, setWidth] = useState(defaultConfiguration.WIDTH);
  const [startRow, setStartRow] = useState(0);
  const [startCol, setStartCol] = useState(0);
  const [finishRow, setFinishRow] = useState(height - 1);
  const [finishCol, setFinishCol] = useState(width - 1);
  // const [defaultVals, setDefaultVals] = useState(false);
  //TODO FIX - SHOULD BE REF?
  const [randomWeights, setRandomWeights] = useState(false);

  ////FIX

  ///It's rerendering for every single line ??
  const resetGrid = () => {
    setHeight(defaultConfiguration.HEIGHT);
    setWidth(defaultConfiguration.WIDTH);
    setStartRow(0);
    setStartCol(0);
    setFinishRow(height - 1);
    setFinishCol(width - 1);
    setRandomWeights(false);
    drawGrid();
  };

  const test = () => {
    console.log("test button");
  };

  const editNode = (node, attrs) => {
    setNodes((prevNodes) =>
      prevNodes.map((currCol) => {
        return currCol.map((currNode) => {
          if (currNode.col === node.col && currNode.row === node.row) {
            for (let attr in attrs) {
              let value = attrs[attr];
              currNode[attr] = value;
            }
          }
          return currNode;
        });
      })
    );
  };

  const drawGrid = () => {
    var nodes = [];
    for (let row = 0; row < height; row++) {
      var currentRow = [];
      for (let col = 0; col < width; col++) {
        ///read on clousre
        const currentNode = {
          index: row * width + col,
          row,
          col,
          isStart: row === startRow && col === startCol,
          isFinish: row === finishRow && col === finishCol,
          isVisited: false,
          isWall: false,
          isSolution: false,
          weight: randomWeights
            ? Math.floor(Math.random() * 10)
            : defaultConfiguration.WEIGHTS,
          onClick: () => editNode(currentNode, { isWall: true }),
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }
    setNodes(nodes);
  };

  useEffect(drawGrid, []);

  const colorVisitedNodes = async (visitedNodesByOrder, path, ms) => {
    for (let i = 0; i < visitedNodesByOrder.length; i++) {
      await new Promise((r) => setTimeout(r, ms));
      let node = visitedNodesByOrder[i];
      editNode(node, { isVisited: true });
    }
    for (let i = 0; i < visitedNodesByOrder.length; i++) {
      await new Promise((r) => setTimeout(r, ms));
      let node = visitedNodesByOrder[i];
      if (path.includes(node)) {
        editNode(node, { isSolution: true });
      }
    }
  };
  const getSolutionPath = (map, finishNode) => {
    let path = [];
    let prevNodeIndex = map[finishNode.index];
    while (prevNodeIndex !== undefined) {
      let x = prevNodeIndex % width;
      let y = Math.floor((prevNodeIndex / width) % height);
      const prevNode = nodes[y][x];
      path.push(prevNode);
      prevNodeIndex = map[prevNode.index];
    }
    return path;
  };

  const onSolveButtonClick = () => {
    var [dist, prev, visitedNodesByOrder] = [];
    switch (algoSelected.value) {
      case "dijkstra":
        [dist, prev, visitedNodesByOrder] = dijkstra(
          nodes,
          nodes[startRow][startCol],
          nodes[finishRow][finishCol]
        );
        let path = getSolutionPath(prev, nodes[finishRow][finishCol]);
        colorVisitedNodes(visitedNodesByOrder, path, 10); //time
        break;
      case "bfs":
        alert("not yet shlomi");
        break;
      default:
        [dist, prev, visitedNodesByOrder] = aStar(
          nodes,
          nodes[startRow][startCol],
          nodes[finishRow][finishCol]
        );
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    drawGrid();
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
        <button className="ui button" onClick={resetGrid}>
          Reset
        </button>
        <button
          className="ui button"
          onClick={() => {
            setRandomWeights(true);
          }}
        >
          Random Weights
        </button>
      </div>
      <div className="grid-options">
        <form onSubmit={submitForm}>
          <div className="ui form">
            <div className="two fields">
              <div className="field">
                <label>height</label>
                <input
                  type="number"
                  value={height}
                  min={max(finishRow + 1, startRow + 1).toString()}
                  onChange={(e) => {
                    setHeight(parseInt(e.target.value));
                  }}
                ></input>
              </div>
              <div className="field">
                <label>width</label>
                <input
                  type="number"
                  min={max(finishCol + 1, startCol + 1).toString()}
                  value={width}
                  onChange={(e) => {
                    setWidth(parseInt(e.target.value));
                  }}
                ></input>
              </div>
            </div>
            <label>Starting Node</label>
            <div className="two fields">
              <div className="field">
                <label>row</label>
                <input
                  type="number"
                  min="0"
                  max={height - 1}
                  value={startRow}
                  onChange={(e) => {
                    setStartRow(parseInt(e.target.value));
                  }}
                ></input>
              </div>
              <div className="field">
                <label>column</label>
                <input
                  type="number"
                  min="0"
                  max={width - 1}
                  value={startCol}
                  onChange={(e) => {
                    setStartCol(parseInt(e.target.value));
                  }}
                ></input>
              </div>
            </div>
            <label>Finishing Node</label>
            <div className="two fields">
              <div className="field">
                <label>row</label>
                <input
                  type="number"
                  min="0"
                  max={height - 1}
                  value={finishRow}
                  onChange={(e) => {
                    setFinishRow(parseInt(e.target.value));
                  }}
                ></input>
              </div>
              <div className="field">
                <label>column</label>
                <input
                  type="number"
                  min="0"
                  max={width - 1}
                  value={finishCol}
                  onChange={(e) => {
                    setFinishCol(parseInt(e.target.value));
                  }}
                ></input>
              </div>
            </div>
            <input
              className="fluid ui button"
              type="submit"
              value="draw the grid"
            />
          </div>
        </form>
      </div>
      <div className="table">
        <Table rows={nodes}></Table>
      </div>
      <button onClick={test}> test button</button>
    </div>
  );
};
export default PathFinding;
