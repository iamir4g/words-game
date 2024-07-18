import React, { useState, useEffect } from "react";

import "./index.css";

type Truthy = "True" | "False" | "Not Check";
interface word {
  title: string;
  check: Truthy;
}

function App() {
  const [textInput, setTextInput] = useState<string>("");
  const [words, setWords] = useState<word[]>([
    { title: "bank", check: "Not Check" },
    { title: "quest", check: "Not Check" },
    { title: "interactive", check: "Not Check" },
    { title: "cap", check: "Not Check" },
    { title: "provincial", check: "Not Check" },
    { title: "snake", check: "Not Check" },
    { title: "coincide", check: "Not Check" },
    { title: "treasurer", check: "Not Check" },
    { title: "interface", check: "Not Check" },
    { title: "slip", check: "Not Check" },
  ]);
  const [answers, setAnswers] = useState<word[]>([]);

  const check = (value: string) => {
    setTextInput(value);
    if (value.includes(" ")) {
      let valueWithoutSpace = value.substring(0, value.length - 1);
      const checkWordIsOk = words[answers.length].title === valueWithoutSpace;

      setAnswers([
        ...answers,
        { title: valueWithoutSpace, check: checkWordIsOk ? "True" : "False" },
      ]);

      setTextInput("");
    }
  };
  useEffect(() => {}, [answers]);

  const checkWord = (index: number) => {
    if (answers[index]) {
      switch (answers[index].check) {
        case "False":
          return "text-red-500";
        case "True":
          return "text-green-500";
        case "Not Check":
          return "";

        default:
          return "";
      }
    }
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col">
        <div className="rounded-lg bg-neutral-100 w-full h-12 items-center flex flex-row overflow-hidden gap-2 px-4">
          {words.map((item, index) => {
            return (
              <p
                key={index}
                className={`${
                  answers.length === index ? "bg-gray-500 rounded-lg p-1" : ""
                } ${answers.length > 0 && checkWord(index)}`}
              >
                {item.title}
              </p>
            );
          })}
        </div>

        <input
          type="text"
          className="border rounded-md mt-4 h-9 px-2 w-1/2"
          placeholder="Start hear type words"
          onChange={(e) => check(e.target.value)}
          value={textInput}
        />
      </div>

      {/* <div className="flex flex-row gap-3">
        {answers.map((item, index) => (
          <p key={index}>
            {item.title} - {item.check}
          </p>
        ))}
      </div> */}
    </div>
  );
}

export default App;
