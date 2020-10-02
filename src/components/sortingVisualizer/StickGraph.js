import React from "react";

const Stick = ({ value }) => {
  return <div className="stick" style={{ height: value }}></div>;
};

const StickGraph = ({ sticks }) => {
  return sticks.map((stick) => {
    return <Stick key={stick.id} value={stick.value}></Stick>;
  });
};
export default StickGraph;
