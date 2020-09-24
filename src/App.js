import React, { useState } from "react";
import Accordion from "./components/Accordion";
import Search from "./components/Search";
import DropDown from "./components/DropDown";
import Translate from "./components/Translate";
import Route from "./components/Route";
import Header from "./components/Header";
import PathFinding from "./components/PathFinding/PathFinding";
import "./App.css";
const colors = [
  {
    label: "The Color Red",
    value: "red",
  },
  {
    label: "The Color Green",
    value: "green",
  },
  {
    label: "A Shade of Blue",
    value: "blue",
  },
];

const items = [
  {
    title: "leran react",
    content: "thius is react",
  },
  {
    title: "Afrikaans",
    content: "af",
  },
  {
    title: "Arabic",
    content: "ar",
  },
  {
    title: "Hindi",
    content: "hi",
  },
];

export default () => {
  const [selected, setSelected] = useState(colors[0]);

  return (
    <div>
      <Header></Header>

      {/* TODO REACT ROUTER !! */}
      <div className="body">
        <Route path="/">
          <Accordion items={items}></Accordion>
        </Route>
        <Route path="/list">
          <Search></Search>
        </Route>
        <Route path="/dropdown">
          <DropDown
            label="select a color"
            options={colors}
            selected={selected}
            onSelectedChange={setSelected}
          ></DropDown>
        </Route>
        <Route path="/translate">
          <Translate></Translate>
        </Route>
        <Route path="/pathfinding">
          <PathFinding></PathFinding>
        </Route>
      </div>
    </div>
  );
};
