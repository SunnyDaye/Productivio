import { useState, useCallback, useEffect, useRef } from "react";
import usePomodoro from "./usePomodoro.js";
import "./Pomodoro.css";

export default function Pomodoro() {
  const [sessionDuration, setSessionDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  const {
    isRunning,
    start,
    stop,
    pause,
    isPaused,
    seconds,
    isSession,
    increment,
    decrement,
  } = usePomodoro(sessionDuration, breakDuration);

  
  const handleChange = (event) => {
    setSessionDuration(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isSession ? setSessionDuration(seconds):setBreakDuration(seconds);
  }




  return (
    <section className="pomodoro-timer">
      <h1>Deep Work Timer</h1>
      <h2>{isSession ? "Work Session" : "Break Time"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="timer">
          <button
            type="button"
            onClick={decrement}
            disabled={isRunning}
            className="btn btn-light"
          >
            -
          </button>
          <input type="number" name="time" value={seconds} onChange={handleChange}/>
          <button
            onClick={increment}
            disabled={isRunning}
            className="btn btn-light"
          >
            +
          </button>
        </div>

        <div className="controls">
          <button
            type="submit"
            className="btn btn-light"
            onClick={start}
            disabled={isRunning && !isPaused}
          >
            Start
          </button>
          <button
            className="btn btn-light"
            onClick={pause}
            disabled={isPaused || !isRunning}
          >
            Pause
          </button>
          <button
            className="btn btn-light"
            onClick={stop}
            disabled={!isRunning}
          >
            Stop
          </button>
        </div>
      </form>
    </section>
  );
}
