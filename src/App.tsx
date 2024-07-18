import React, { useState, useEffect } from "react";

import "./index.css";

const words = [
  "bank",
  "quest",
  "interactive",
  "cap",
  "provincial",
  "snake",
  "coincide",
  "treasurer",
  "interface",
  "slip",
];
function App() {
  const [textInput, setTextInput] = useState<string>("");

  const [answers, setAnswers] = useState<string[]>([]);

  const check = (value: string) => {
    setTextInput(value);
    if (value.includes(" ")) {
      // console.log("first",value.substring(0, value.length - 1));
      setAnswers([...answers, value.substring(0, value.length - 1)]);
      setTextInput("");
    }
  };
  useEffect(() => {}, [answers]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col">
        <div className="rounded-lg bg-neutral-100 w-full h-12 items-center flex flex-row overflow-hidden gap-2 px-4">
          {words.map((item, index) => {
            return (
              <p key={index} className="">
                {item}
              </p>
            );
          })}
        </div>

        <input
          type="text"
          className="border rounded-md mt-4 h-9 px-2"
          placeholder="Start hear type words"
          onChange={(e) => check(e.target.value)}
          value={textInput}
        />
      </div>

      <div className="">
        {answers.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
