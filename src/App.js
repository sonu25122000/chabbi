import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [keyPressCount, setKeyPressCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timer, setTimer] = useState(300); // 300 seconds = 5 minutes
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [disabledChars, setDisabledChars] = useState(0);
  const givenString = "A quick brown fox jumps over the lazy dog";

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isTimerRunning, timer]);

  const handleInputChange = (event) => {
    const typedValue = event.target.value;
    setInputValue(typedValue);
    setKeyPressCount((prevCount) => prevCount + 1);
    calculateAccuracy(typedValue);

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    let index = 0;
    while (
      index < typedValue.length &&
      typedValue[index] === givenString[index]
    ) {
      index++;
    }
    setDisabledChars(index);
  };

  const getLastTypedCharacter = () => {
    if (inputValue.length > 0) {
      return inputValue[inputValue.length - 1].toUpperCase();
    }
    return "";
  };

  const isCharacterHighlighted = (character) => {
    return character.toUpperCase() === getLastTypedCharacter();
  };

  const calculateAccuracy = (typedValue) => {
    const maxLength = Math.max(typedValue.length, givenString.length);
    let matchedCount = 0;
    for (let i = 0; i < maxLength; i++) {
      if (typedValue[i] === givenString[i]) {
        matchedCount++;
      }
    }
    const newAccuracy = Math.floor((matchedCount / maxLength) * 100);
    setAccuracy(newAccuracy);
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  return (
    <div className="App">
      <h2 style={{ color: "black", marginTop: "2%" }}>
        Type this sentence : 
        {givenString.split("").map((character, index) => (
          <span
            key={index}
            style={{ color: index < disabledChars ? "gray" : "blue", }}
          >
         {character}
          </span>
        ))}
      </h2>
      <input
        type="text"
        style={{
          padding: "15px",
          width: "50%",
          marginTop: "2%",
          fontSize: "20px",
          zIndex: "2",
        }}
        placeholder="A quick brown fox jumps over the lazy dog"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="keyboard" style={{ marginTop: "4%" }}>
        {keyboardRows.map((row, rowIndex) => (
          <div  key={rowIndex}>
            {row.map((character, keyIndex) => (
              <button
                
                key={keyIndex}
                className={isCharacterHighlighted(character) ? "active" : "notActive"}
              >
                {character}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div>
        <p>
          Time remaining: {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
        <p>Key presses: {keyPressCount}</p>
        <p>Accuracy: {accuracy}%</p>
      </div>
    </div>
  );
};

export default App;
