import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    const newHistory = [...history]
    if (replace) { // if replace is true, remove the most recent mode in history array. Used in DELETING and DELETE_ERROR mode: when close error page, should double back to form mode 
      newHistory.pop();

    } 
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

    setHistory(newHistory);
  };
  const mode = history[history.length - 1];
  return { mode, transition, back };
};

