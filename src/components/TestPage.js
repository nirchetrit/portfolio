import React, { useState } from "react";

const DATA = [
  { id: 1, value: 3 },
  { id: 2, value: 10 },
  { id: 3, value: 1 },
  { id: 4, value: 8 },
];

const Item = React.memo(({ item, onRemove }) => {
  console.log("Render:Item");
  return (
    <div className="item" onClick={() => onRemove(item)}>
      {item.value}
    </div>
  );
});

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: DATA, counter: 0 };
  }
  addItem = (newItem) => {
    this.setState((prevState) => ({ data: [...prevState.data, newItem] }));
  };
  removeItem = (item) => {
    const data = this.state.data.filter((d) => d !== item);
    this.setState({ data });
  };
  addCounter = () => {
    this.setState((prevState) => ({ counter: prevState.counter + 1 }));
  };
  render() {
    const { data, counter } = this.state;
    console.log("Render: Test");
    return (
      <div className="Test">
        {data.map((item) => {
          return <Item key={item.id} item={item} onRemove={this.removeItem} />;
        })}
        <button
          onClick={() =>
            this.addItem({
              id: Math.floor(Math.random() * 5000),
              value: Math.floor(Math.random() * 5000),
            })
          }
        >
          addItem
        </button>
        <button onClick={this.addCounter} style={{ display: "block" }}>
          {counter}
        </button>
      </div>
    );
  }
}

export default TestPage;
