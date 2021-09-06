import { useState, useRef } from "react";

const useTimer = (totalDuration) => {
  const [seconds, setSeconds] = useState(totalDuration);
  const [isRunning, setIsRunning] = useState(false);
  let timer = useRef(null); //stop needs access to the set interval in start
  const start = () => {
    /*
            Start timer
            decremenet seconds ever 1s
            update the isRunning !!! true 
         */

    timer.current = setInterval(() => {
      //setState is async. Send in callback for immediate update
      setSeconds((seconds) => seconds - 1);
    }, 1000); //will be called after one sec
    setIsRunning(true);
  };

  const stop = () => {
    console.log("Timer is", timer);
    clearInterval(timer.current);
    setIsRunning(false);
    setSeconds(totalDuration); //Reset timer to original value
  };

  return { isRunning, start, stop, seconds };
};

export default useTimer;
