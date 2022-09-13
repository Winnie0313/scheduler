import React, { useState } from "react";

export default function useVisualMode(initial) {
  console.log("initial is: ", initial);
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    // setMode(newMode);
    const newHistory = [...history]
    if (replace) {
      // const newHistory = history.slice(0, -1);
      newHistory.pop();

      // setHistory([...newHistory, newMode]);
    } 
      // const newHistory = [...history];
    newHistory.push(newMode);
    setHistory(newHistory);

  };

  // back to the previous mode
  function back() {
    if (history.length === 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    // setMode(prev => newHistory[newHistory.length - 1]);
    setHistory(newHistory);
  };
  const mode = history[history.length - 1];
  console.log("returning mode is: ", mode)
  return { mode, transition, back };
};

