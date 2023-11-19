import React, { useState, useEffect } from 'react';

interface TimerProps {
  stop: boolean;
}

const Timer = (args: TimerProps) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log(args.stop);
    if (args.stop) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [args.stop]);

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