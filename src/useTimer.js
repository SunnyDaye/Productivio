import {useState} from 'react';

const useTimer = (totalDuraton) => {
    const [seconds, setSeconds] = useState(totalDuraton);
    const isRunning = false;
    const start = () => {
        /*
            Start timer
            decremenet seconds ever 1s
            update the isRunning !!! true 
         */
        setInterval(() =>{
            setSeconds(seconds-1); //Need to countdown to zero. This will cause a rerender so this will happen every second.
        }, 1000); //will be called after one sec
    };
    const stop = () => {};
    
    return {isRunning, start, stop, seconds};
}

export default useTimer;