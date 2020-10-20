import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import "./PathFinding.css";
import Table from "./Table";
import dijkstra from "../../algorithms/pathFinding/dijkstra";
import bfs from "../../algorithms/pathFinding/bestfirstsearch";
import aStar from "../../algorithms/pathFinding/aStar";
import { deafultConfig, generateNodes } from "../gridFuncs";
import DropDown from "../DropDown";
import { max } from "mathjs";
// import {}

const algoOptions = [
  { label: "Dijkstra", value: "dijkstra" },
  { label: "A*", value: "a*" },
  { label: "BFS", value: "bfs" },
];
const defaultConfiguration = {
  SOLVERSPEED: 0.5,
};

const PathFinding = () => {
  const [algoSelected, setAlgoSelected] = useState(algoOptions[0]);
  const [nodes, setNodes] = useState([]);
  const [config, setConfig] = useState(deafultConfig);

  const resetGrid = () => {
    setConfig(deafultConfig);
    setNodes(generateNodes(deafultConfig));
  };
  const toggleWall = (node) => {
    editNode({ ...node, isWall: !node.isWall });
  };

  const test = () => {
    console.log("test button");
  };

  const editNode = (node) => {
    setNodes((prevNodes) =>
      prevNodes.map((currRow) => {
        return currRow.map((currNode) => {
          if (currNode.index === node.index) currNode = node;
          return currNode;
        });
      })
    );
  };

  ///componentDidMount
  useEffect(() => {
    setNodes(generateNodes(deafultConfig));
  }, []);

  const colorVisitedNodes = async (visitedNodesByOrder, prev, ms) => {
    for (let i = 0; i < visitedNodesByOrder.length; i++) {
      await new Promise((r) => setTimeout(r, ms));
      editNode({ ...visitedNodesByOrder[i], isVisited: true });
    }
    for (let i = 0; i < visitedNodesByOrder.length; i++) {
      await new Promise((r) => setTimeout(r, ms));
      let node = visitedNodesByOrder[i];
      if (prev.includes(node)) {
        editNode({ ...node, isSolution: true });
      }
    }
  };

  const getSolutionPath = (map, finishNode, height, width) => {
    let path = [];
    let prevNodeIndex = map[finishNode.index];
    while (prevNodeIndex !== undefined) {
      let x = prevNodeIndex % nodes[0].length;
      let y = Math.floor((prevNodeIndex / nodes[0].length) % nodes.length);
      let prevNode = nodes[y][x];
      path.push(prevNode);
      prevNodeIndex = map[prevNode.index];
    }
    return path;
  };

  const onSolveButtonClick = () => {
    var [dist, prev, visitedNodesByOrder] = [];
    switch (algoSelected.value) {
      case "dijkstra":
        /////TODO FIX what happens if someone changes the form without saving it?
        [dist, prev, visitedNodesByOrder] = dijkstra(
          nodes,
          nodes[config.startRow][config.startCol],
          nodes[config.finishRow][config.finishCol]
        ); //time
        break;
      case "bfs":
        alert("not yet shlomi");
        break;
      case "a*":
        [prev, visitedNodesByOrder] = aStar(
          nodes,
          nodes[config.startRow][config.startCol],
          nodes[config.finishRow][config.finishCol]
        );
        break;
      default:
        alert("select something");
    }
    let path = getSolutionPath(prev, nodes[config.finishRow][config.finishCol]);
    colorVisitedNodes(
      visitedNodesByOrder,
      path,
      defaultConfiguration.SOLVERSPEED
    ); //time
  };
  const submitForm = (e) => {
    e.preventDefault();
    setNodes(generateNodes(config));
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
            // setRandomWeights(true);
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
                  value={config.height}
                  min={max(
                    config.finishRow + 1,
                    config.startRow + 1
                  ).toString()}
                  onChange={(e) => {
                    setConfig({ ...config, height: parseInt(e.target.value) });
                  }}
                ></input>
              </div>
              <div className="field">
                <label>width</label>
                <input
                  type="number"
                  min={max(
                    config.finishCol + 1,
                    config.startCol + 1
                  ).toString()}
                  value={config.width}
                  onChange={(e) => {
                    setConfig({ ...config, width: parseInt(e.target.value) });
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
                  max={config.height - 1}
                  value={config.startRow}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      startRow: parseInt(e.target.value),
                    });
                  }}
                ></input>
              </div>
              <div className="field">
                <label>column</label>
                <input
                  type="number"
                  min="0"
                  max={config.width - 1}
                  value={config.startCol}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      startCol: parseInt(e.target.value),
                    });
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
                  max={config.height - 1}
                  value={config.finishRow}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      finishRow: parseInt(e.target.value),
                    });
                  }}
                ></input>
              </div>
              <div className="field">
                <label>column</label>
                <input
                  type="number"
                  min="0"
                  max={config.width - 1}
                  value={config.finishCol}
                  onChange={(e) => {
                    setConfig({
                      ...config,
                      finishCol: parseInt(e.target.value),
                    });
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

      <Table rows={nodes} onNodeClick={toggleWall}></Table>

      {/* <button onClick={test}> test button</button> */}
    </div>
  );
};
export default PathFinding;
