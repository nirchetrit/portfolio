import React from "react";

const Stick = ({ value }) => {
  console.log("redner:stick");
  return <div className="stick" style={{ height: value }}></div>;
};

const StickGraph = ({ sticks }) => {
  console.log("render:stickGraph");
  console.log(sticks);
  return sticks.map((stick) => {
    return <Stick key={stick.id} value={stick.value}></Stick>;
  });
};
export default StickGraph;
