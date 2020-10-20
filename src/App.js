import React, { useState } from "react";
import TestPage from "./components/TestPage";
import Route from "./components/Route";
import Header from "./components/Header";
import PathFinding from "./components/PathFinding/PathFinding";
import SortingVisualizer from "./components/sortingVisualizer/SortingVisualizer";
import "./App.css";

export default () => {
  return (
    <div>
      <Header></Header>

      {/* TODO REACT ROUTER !! */}
      <div className="body">
        <Route path="/">
          <div className="ui container">
            <PathFinding></PathFinding>
          </div>
        </Route>
        {/* <Route path="/testpage">
          <div className="ui container">
            <TestPage></TestPage>
          </div>
        </Route> */}
        <Route path="/sortingvisualizer">
          <div className="ui container">
            <SortingVisualizer></SortingVisualizer>
          </div>
        </Route>
      </div>
    </div>
  );
};
