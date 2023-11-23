import { useState, useEffect } from 'react';

interface TimerProps {
  stop: boolean;
  reset: boolean;
  setReset: (reset: boolean) => void;
}

const Timer = (props: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (props.stop) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [props.stop]);

  useEffect(() => {
    if (props.reset) {
      setSeconds(0);
      props.setReset(false);
    }
  }, [props]);

  const mmss = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const sec = (secondsLeft < 10 ? '0' : '') + secondsLeft;
    const min = (minutes < 10 ? '0' : '') + minutes;
    return `${min}:${sec}`;
  }

  return (
    <div style={{fontSize: '1.8rem'}}>
      {mmss(seconds)}
    </div>
  );
};

export default Timer;

/****

return;
    }
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const mmss = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    const sec = (secondsLeft < 10 ? '0' : '') + secondsLeft;
    const min = (minutes < 10 ? '0' : '') + minutes;
    return `${min}:${sec}`;
  }

  return (
    <div style={{fontSize: '1.8rem'}}>
      {mmss(seconds)}
    </div>
  );
};

export default Timer;
***/