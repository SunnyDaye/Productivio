import {useState, useCallback} from "react";
import usePomodoro from "./usePomodoro.js";
import "./Pomodoro.css";
export default function Pomodoro() {
  const [sessionDuration, setSessionDuration] = useState(25);
  const [breakDuration, setBreakDurations] = useState(5);
  const [rerender,setRerender] = useState(false);
  const { isRunning, start, stop, pause, isPaused, seconds, isSession} =
    usePomodoro(sessionDuration, breakDuration);
    
  return (
    <section className="pomodoro-timer">
      <h1>Deep Work Timer</h1>
      <h2>{isSession ? "Work Session": "Break Time"}</h2>
      <div className="timer">
        <button type="button" onClick={()=> {setSessionDuration(sessionDuration-1); setRerender(true)}} className="btn btn-light">-</button>
        <span>{seconds}</span>
        <button type="button" onClick={()=> {setSessionDuration(sessionDuration+1); setRerender(true)}} className="btn btn-light">+</button>
      </div>

      <div className="controls">
        <button className="btn btn-light" onClick={start} disabled={isRunning && !isPaused}>
          Start
        </button>
        <button className="btn btn-light" onClick={pause} disabled={isPaused || !isRunning}>
          Pause
        </button>
        <button className="btn btn-light" onClick={stop} disabled={!isRunning}>
          Stop
        </button>
      </div>
    </section>
  );
}
