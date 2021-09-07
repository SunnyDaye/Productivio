import { useEffect, useState, useCallback } from "react";
import useTimer from "../Utils/useTimer.js";
const usePomodoro = (sessionDuration = 25, breakDuration = 5) => {
  const [isSession, setIsSession] = useState(true);

  const sessionTimer = useTimer(sessionDuration);
  const breakTimer = useTimer(breakDuration);
  

  
  const stop = useCallback(() => {
      console.log("We are stopping");
    isSession? sessionTimer.stop() : breakTimer.stop();
    setIsSession(true);
  }, [sessionTimer,breakTimer,isSession,setIsSession]);

  useEffect(() => {
    if (isSession && sessionTimer.seconds < 1) {
      setIsSession(false);
    } else if (!isSession && breakTimer.seconds < 1) {
      setIsSession(true);
    }
  },[setIsSession,sessionTimer.seconds, breakTimer.seconds]);

  
  return isSession ? {...sessionTimer,stop,isSession}:{...breakTimer,stop,isSession};
};
export default usePomodoro;
