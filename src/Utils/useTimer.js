import { useState, useRef, useEffect, useCallback } from "react";

const useTimer = (totalDuration) => {
  const [seconds, setSeconds] = useState(totalDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  let timer = useRef(null); //stop needs access to the set interval in start
  const start = useCallback(() => {
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
    setIsPaused(false);
  }, [setIsRunning, setSeconds]);

  const stop = useCallback(() => {
    clearInterval(timer.current);
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(totalDuration); //Reset timer to original value
  }, [setIsRunning, setSeconds, totalDuration]);

  const pause = useCallback(() => {
    //same logic as stop but no seconds update
    clearInterval(timer.current);
    setIsPaused(true);
  }, [setIsPaused]);

  useEffect(() => {
    if (seconds < 1) stop();
  }, [seconds, stop]);

  useEffect(() => {
    //clean up timer if parent unmounts
    return () => timer && clearInterval(timer.current);
  }, []);

  return { isRunning, start, stop, pause, isPaused, seconds };
};

export default useTimer;
