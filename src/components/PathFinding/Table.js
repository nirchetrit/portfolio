import React from "react";
import TableRow from "./TableRow";
import "./Table.css";

const Table = ({ rows }) => {
  const renderedRows = rows.map((row) => {
    return <TableRow row={row} key={row.rowNum}></TableRow>;
  });
  return <div className="table">{renderedRows}</div>;
};
export default Table;
