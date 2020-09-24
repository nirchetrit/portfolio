import React from "react";
import "./Node.css";
const Node = ({ node }) => {
  //   console.log("asdokj", node);
  const isStart = node.isStart ? "start" : "";
  const isFinish = node.isFinish ? "finish" : "";
  const className = `node ${isStart} ${isFinish}`;
  return <div className={className}></div>;
};
export default Node;
