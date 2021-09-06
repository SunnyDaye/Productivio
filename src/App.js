import useTimer from './useTimer.js';

function App() {
  const {isRunning, start, stop, seconds} = useTimer(5);
  return (
  <div className="App">
    <h1>useTimer Custom Hook</h1>
    <h2>{isRunning ? seconds : 'Break!'}</h2>
    <button onClick={start}>Start</button>
    <button onClick={stop}>Stop</button>
  </div>
  );
}

export default App;
