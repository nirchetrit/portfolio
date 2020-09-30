import React, { useState } from "react";
import useInput from "../hooks/useInput";

const TestPage = () => {
  const {
    value: firstName,
    bind: bindFirstName,
    reset: resetFirstName,
  } = useInput("");
  const { value: lastName, bind: bindLast, reset: resetLast } = useInput(
    "last Name"
  );
  const submit = (e) => {
    e.preventDefault();
    console.log(firstName);

    console.log(lastName);
    resetFirstName();
    resetLast();
    draw();
  };
  const draw = () => {
    console.log("render");
  };

  // console.log("render");
  return (
    <form onSubmit={submit}>
      <div className="ui form">
        <div className="fields">
          <div className="field">
            <label>first name</label>
            <input {...bindFirstName}></input>
          </div>
          <div className="field">
            <label>last name</label>
            <input {...bindLast}></input>
          </div>
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  );
};
export default TestPage;
