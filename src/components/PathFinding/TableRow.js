import React from "react";
import "./TableRow.css";
import Node from "./Node";

const TableRow = ({ row }) => {
  const renderedRows = row.nodes.map((node) => {
    return <Node className="node" node={node} key={node.index}></Node>;
  });
  return <div className="table-row">{renderedRows}</div>;
};
export default TableRow;
