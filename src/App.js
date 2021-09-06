import useTimer from './useTimer.js';

function App() {
  const TOTAL_DURATION = 5;
  const {isRunning, start, stop, pause, isPaused, seconds} = useTimer(TOTAL_DURATION);
  return (
  <div className="App">
    <h1>useTimer Custom Hook</h1>
    <h2>{isRunning ? seconds : seconds}</h2>
    <button onClick={start} disabled={isRunning}>Start</button>
    <button onClick={pause} disabled={(!isRunning && isPaused)||!isRunning}>Pause</button>
    <button onClick={stop} disabled={!isRunning}>Stop</button>
  </div>
  );
}

export default App;
