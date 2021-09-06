import { useState } from "react";

const useTimer = (totalDuraton) => {
  const [seconds, setSeconds] = useState(totalDuraton);
  const [isRunning, setIsRunning] = useState(false);
  let timer; //stop needs access to the set interval in start
  const start = () => {
    /*
            Start timer
            decremenet seconds ever 1s
            update the isRunning !!! true 
         */

    timer = setInterval(() => {
      //setState is async. Send in callback for immediate update
      setSeconds((seconds) => seconds - 1);
    }, 1000); //will be called after one sec
    setIsRunning(true);
  };
  const stop = () => {
    console.log("Timer is", timer);
    clearInterval(timer);
  };

  return { isRunning, start, stop, seconds };
};

export default useTimer;
