import React, { useState, useEffect, useRef } from 'react';

const TimerPage = () => {
  return (
    <div className='container'>
        <h1>Timer</h1>
        <Clock />
        <StopWatch />
        <Timer />
    </div>
  );
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
        현재시간은 {time.toLocaleTimeString()} 입니다.
    </div>
  );
};

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOn) {
      const timerId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      timerRef.current = timerId;
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isOn]);

  return (
    <div className='stopwatch-wrap'>
      <h3>Stopwatch</h3>
      <h2>{formatTime(time)}</h2>
      <div className='time-btn-wrap'>
        <button className={isOn ? 'btn-time-gray' : 'btn-time-blue'} onClick={() => setIsOn((prev) => !prev)}>{isOn ? 'Stop' : 'Start'}</button>
        <button className='btn-time-red'
            onClick={() => {
            setTime(0);
            setIsOn(false);
            }}
        >
            Reset
        </button>
        </div>
    </div>
  );
};

const Timer = () => {
  const [inputTime, setInputTime] = useState(0);
  const [time, setTime] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOn && time > 0) {
      const timerId = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
      timerRef.current = timerId;
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isOn, time]);

  const startTimer = () => {
    if (inputTime > 0) {
      setTime(inputTime);
      setIsOn(true);
    }
  };

  return (
    <div className='timer-wrap'>
      <h3>Timer</h3>
      {!isOn && (
        <div className='set-timer'>
            <p>Enter time in seconds</p>
          <input
            type="number"
            value={inputTime}
            onChange={(e) => setInputTime(Number(e.target.value))}
          />
          <button className='btn-time-blue' onClick={startTimer}>Start Timer</button>
        </div>
      )}
      <h2>{formatTime(time)}</h2>
      <div className='time-btn-wrap'>
        {isOn && <button className='btn-time-gray' onClick={() => setIsOn(false)}>Stop</button>}
        <button className='btn-time-red'
            onClick={() => {
            setIsOn(false);
            setTime(0);
            }}
        >
            Reset
        </button>
      </div>
    </div>
  );
};

const formatTime = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${secs}`;
};

export default TimerPage;
