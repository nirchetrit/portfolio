import React, { useState } from "react";

const TestPage = () => {
  let x = {
    0: "test",
    1: {
      0: "0",
      1: "1",
    },
  };
  const [nodes, setNodes] = useState(x);
  //   setNodes(x);
  let b = "test";
  const testFunc = () => {
    setNodes({
      1: {
        0: "10",
        1: "11",
      },
    });
  };
  return (
    <div>
      <h1>test page</h1>
    </div>
  );
};
export default TestPage;
