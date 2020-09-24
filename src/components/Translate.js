import React, { useState } from "react";
import DropDown from "./DropDown";
import Convert from "./Convert";

const options = [
  {
    label: "hebrew",
    value: "he",
  },
  {
    label: "Afrikaans",
    value: "af",
  },
  {
    label: "Arabic",
    value: "ar",
  },
  {
    label: "Hindi",
    value: "hi",
  },
];
const Translate = () => {
  const [language, setLanguage] = useState(options[0]);
  const [text, setText] = useState("");
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter text</label>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <DropDown
        label="select a language"
        options={options}
        selected={language}
        onSelectedChange={setLanguage}
      ></DropDown>
      <hr></hr>
      <h3 className="ui header">output</h3>
      <Convert language={language} text={text}></Convert>
    </div>
  );
};
export default Translate;
