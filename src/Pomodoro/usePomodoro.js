import { useEffect, useState, useCallback } from "react";
import useTimer from "../Utils/useTimer.js";
const usePomodoro = (sessionDuration = 25, breakDuration = 5) => {
  const [isSession, setIsSession] = useState(true);
  const [isBreak,setIsBreak] = useState(false);
  const sessionTimer = useTimer(sessionDuration);
  const breakTimer = useTimer(breakDuration);
  

  const stop = useCallback(() => {
    isSession? sessionTimer.stop() : breakTimer.stop();
    setIsSession(true);
  }, [sessionTimer,breakTimer,isSession,setIsSession]);

  useEffect(() => {
    if (isSession && sessionTimer.seconds < 1) {
      setIsSession(false);
      setIsBreak(true);
    } else if (!isSession && breakTimer.seconds < 1) {
      setIsSession(true);
      setIsBreak(false);
    }
  },[setIsSession,sessionTimer.seconds, breakTimer.seconds]);

  
  return isSession ? {...sessionTimer,stop,isSession, isBreak}:{...breakTimer,stop,isSession, isBreak};
};
export default usePomodoro;
