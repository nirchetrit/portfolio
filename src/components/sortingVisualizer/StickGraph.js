import React from "react";

const Stick = ({ stick }) => {
  return (
    <div
      className="stick"
      style={{ height: `${stick.value}%`, background: `${stick.color}` }}
    ></div>
  );
};

const StickGraph = ({ sticks }) => {
  return sticks.map((stick) => {
    return <Stick key={stick.id} stick={stick}></Stick>;
  });
};
export default StickGraph;
