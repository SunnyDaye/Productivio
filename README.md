# Welcome to {Productiv.io}

___
# 1.0 Table of Contents
[1.1 Overview](#11-Overview) \
[1.2 How to Use](#12-How-to-Use) \
[1.3 License](#13-License) \
[2.0 Notes](#20-Notes) 
___
# 1.1 Overview



Productiv.io is both a pomodoro timer and todo app. Productiv.io uses postgres, express, react, and node. 
___
# 1.2 How to Use



1. Fork repo
2. Clone repo to local machine
3. Change to the directory of the project
4. Run ```npm install``` to install dependencies
5. Run ```npm start``` to run project locally
6.  Feel free to use this project and make edits. Enjoy!
___
# 1.3 License



MIT License

Copyright (c) [year] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

___

# 2.0 Notes
## 2.1 Goals
- [ ] Create a Custom Hook called useTimer
- [ ] Make the ToDos form editable on the card
- [ ] Make custom timer components that are reusable 

___
## 2.2 Creating the useTimer custom hook
I decided to break down this problem in smaller chunks. I will work on the custom hook like this:
1. create a seconds timer hook
2. create a minutes and seconds timer hook
3. create a hours, minutes, and seconds timer hook

I choose this approach so I do not have to focus on the added complexity of working with digits while I initially create the hook. 
### 2.2.1 Creating a seconds timer
##### How do I intend to use the hook?
```const {isRunning, start, stop, pause, seconds} = useTimer(totalDuration);``` \
The values recieved from the hook should be a boolean, a function to start, a function to stop, and the seconds left on the timer. 
#### Initial Thoughts
##### Starting the timer
Everytime one second elaspe, my seconds should decrement until seconds is zero. A high level psuedo solution would look like this:
1. Elapse one second using setInterval
2. Decrement current duration by one. The current duration or seconds should be held in a state. 
3. set isRunning to true
3. Repeat until zero or stop event is triggered
The need for setInterval is to accomplish regular one second intervals of elasped time. Seconds should be a state because we need to render the remaining seconds on the timer to the user. The time elapse caused by setInterval should trigger a state change since seconds will be decreased by one after each itnerval. The seconds state should be changed using a callback function so the value is updated sychronously with the time interval. Otherwise, the timer would have issues with rendering and updating values. 

##### Stopping the timer

Initially, I thought the solution was simple. Create a reference to setInterval and pass that reference into clearInterval. The challenge is due to the rerendering of the hook. My start function causes the hook to rerender and our reference to be recreated every render. When I call clearInterval in the stop function, the reference to the timer is undefined. After further research, I need to use the built-in hook useRef to prevent my timer reference from resetting its value every render.

To autostop the timer when seconds is zero, I wrap the logic in useEffect since my expected values for seconds are in the asynchronous web api. This solution gives me a warning: \
```The 'stop' function makes the dependencies of useEffect Hook (at line 30) change on every render. To fix this, wrap the definition of 'stop' in its own useCallback() Hook```

I realized that wrapping my start and stop function in the useCallback hook will prevent my state changes from causing multiple rerenders that affect the current values of the state. This is useful if I need to start the timer in a useEffect hook in a parent component.

##### Performance optimization
I realize that when the parent componenet unmounts, the timer will continue. The timer does not need to run if our parent componenent is no longer needed. The solution is to pass a cleanup function into a useEffect hook to run once when the parent unmounts.

##### Pausing the timer
The code is exactly the same as stopping the timer except we do not update the seconds state.

