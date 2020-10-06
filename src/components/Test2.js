import React, { useState } from "react";
import "./test.css";
import { generateBars } from "./barGraphFuncs";
import { render } from "@testing-library/react";

const Bar = ({ bar, onRemove }) => {
  console.log(`Render: Bar`);
  return (
    <div className="Bar" onClick={() => onRemove(bar)}>
      {bar.value}
    </div>
  );
};

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [
        { id: 1, value: 3 },
        { id: 2, value: 40 },
        { id: 3, value: 30 },
      ],
    };
  }
  removeBar = (bar) => {
    const bars = this.state.bars.filter((b) => b !== bar);
    this.setState({ bars });
  };
  render() {
    const { bars } = this.state;
    console.log(`Render: TestPage`);
    return (
      <div className="Test">
        {bars.map((bar) => {
          return <Bar key={bar.id} bar={bar} onRemove={this.removeBar} />;
        })}
      </div>
    );
  }
}

export default TestPage;
