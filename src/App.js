import useTimer from './useTimer.js';

function App() {
  const {isRunning, start, stop, seconds} = useTimer(5);
  return <h1>Hello World!</h1>;
}

export default App;
