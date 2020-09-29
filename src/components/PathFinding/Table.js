import React from "react";
import Node from "./Node";
import "./Table.css";
import "./TableRow.css";

const TableRow = ({ row }) => {
  const renderedRows = row.map((node) => {
    return <Node className="node" node={node} key={node.index}></Node>;
  });
  return <div className="table-row">{renderedRows}</div>;
};

const Table = ({ rows }) => {
  const renderedRows = rows.map((row) => {
    return <TableRow row={row} key={row[0].row}></TableRow>;
  });
  return <div className="table">{renderedRows}</div>;
};
export default Table;
