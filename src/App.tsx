import React, { useEffect, useRef, useState } from "react";

import "./index.css";

interface inputWords {
  id: number;
  word: string;
  status: "True" | "False" | "Notcheck";
  isTypingTrue: boolean;
}

function App() {
  const [words, setWords] = useState<inputWords[]>([
    { id: 0, word: "bank", status: "Notcheck", isTypingTrue: true },
    { id: 1, word: "quest", status: "Notcheck", isTypingTrue: true },
    { id: 2, word: "interactive", status: "Notcheck", isTypingTrue: true },
    { id: 3, word: "cap", status: "Notcheck", isTypingTrue: true },
    { id: 4, word: "provincial", status: "Notcheck", isTypingTrue: true },
    { id: 5, word: "snake", status: "Notcheck", isTypingTrue: true },
    { id: 6, word: "coincide", status: "Notcheck", isTypingTrue: true },
    { id: 7, word: "treasurer", status: "Notcheck", isTypingTrue: true },
    { id: 8, word: "interface", status: "Notcheck", isTypingTrue: true },
    { id: 9, word: "slip", status: "Notcheck", isTypingTrue: true },
  ]);

  const [inputValue, setInputValue] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [timer, setTimer] = useState<number>(10);
  const [disableInput, setDisableInput] = useState<boolean>(false);
  const flipInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkword = (value: string) => {
    if (flipInterval.current === null) {
      startTimer();
    }
    setInputValue(value);
    if (value.includes(" ")) {
      const wordIsOk = words[counter].word === value.trimEnd();

      const updatedWords = [...words];

      updatedWords[counter] = {
        ...updatedWords[counter],
        status: wordIsOk ? "True" : "False",
      };
      setWords(updatedWords);
      setCounter(counter + 1);
      setInputValue("");
    } else {
      const updatedWords = [...words];
      updatedWords[counter] = {
        ...updatedWords[counter],
        isTypingTrue:
          words[counter].word.slice(0, value.trim().length) === value.trim(),
      };
      setWords(updatedWords);
    }
  };

  useEffect(() => {
    if (timer <= 0) {
      if (flipInterval.current) {
        clearInterval(flipInterval.current);
        flipInterval.current = null;
        setDisableInput(true);
      }
    }
  }, [counter, disableInput, timer]);

  const handleReset = () => {
    setInputValue("");
    const updatedWords: inputWords[] = words.map((item) => {
      return { ...item, status: "Notcheck", isTypingTrue: true };
    });
    setWords(updatedWords);
    setCounter(0);
    if (flipInterval.current) {
      clearInterval(flipInterval.current);
      flipInterval.current = null;
    }
    setTimer(10);
    setDisableInput(false);
  };

  const startTimer = () => {
    flipInterval.current = setInterval(() => {
      setTimer((old) => old - 1);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center mt-6 h-screen ">
      <div className="flex flex-row gap-x-3 w-1/2 justify-center border-2 p-2">
        {words.map((item, index) => {
          return (
            <p
              className={`${item.id === counter ? "bg-gray-400 p-2" : ""} ${
                item.status === "True"
                  ? "text-green-600"
                  : item.status === "False"
                  ? "text-red-600"
                  : ""
              } ${item.isTypingTrue ? "" : "text-red-600"}
                `}
              key={index}
              id={`${index}`}
            >
              {item.word}{" "}
            </p>
          );
        })}
      </div>
      <div className="flex flex-row gap-x-3 mt-4 w-full items-center justify-center">
        <input
          type="text"
          className="border rounded-md w-1/3 h-9 px-2 "
          placeholder="Start hear type words"
          onChange={(e) => {
            checkword(e.target.value);
          }}
          disabled={disableInput}
          value={inputValue}
        />
        <p className="bg-">{disableInput ? "time is over" : timer}</p>
        <button className="bg-red-500" onClick={() => handleReset()}>
          reset
        </button>{" "}
      </div>
    </div>
  );
}

export default App;
