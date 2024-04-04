import { useState, useEffect } from 'react';
import './App.css';
import { FiPlayCircle, FiRefreshCcw, FiPauseCircle} from 'react-icons/fi';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const startTimer = () => {
    setIsRunning(true);
    setStartTime(Date.now() - elapsedTime);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setStartTime(null);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((time % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <>
      <h2 style={{marginBottom: "5px"}}>OnlineTimer</h2>
      <div style={{fontSize:"13px"}}>Desenvolvido com ❤️ por Kaik Silva</div>

      <div className="total-real-time">
        <span id="hours">{formatTime(elapsedTime).split(':')[0]}</span>:
        <span id="minutes">{formatTime(elapsedTime).split(':')[1]}</span>:
        <span id="seconds">{formatTime(elapsedTime).split(':')[2]}</span>
      </div>
      <div className='list-options'>
        {isRunning? 
        <a onClick={pauseTimer}><FiPauseCircle size={70} /></a>
        :
        <a onClick={startTimer}><FiPlayCircle size={70} /></a>
        }
        <a onClick={resetTimer}><FiRefreshCcw size={40} /></a>
      </div>
    </>
  );
}

export default App;
