import React, { useEffect, useState } from 'react';
import '../../assets/styles/ClearanceSaleBox.css';

export default function ClearanceSaleBox({ children, endTime }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [percentElapsed, setPercentElapsed] = useState(0);
  const [toggleColors, setToggleColors] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (!endTime) {
      setTimeLeft(null);
      setPercentElapsed(0);
      return;
    }

    const endTimestamp = new Date(endTime).getTime();
    if (isNaN(endTimestamp)) {
      setTimeLeft(null);
      setPercentElapsed(0);
      return;
    }

    const totalDuration = endTimestamp - Date.now();

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(endTimestamp - now, 0);

      if (remaining === 0) setIsEnded(true);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((remaining / (1000 * 60)) % 60);
      const seconds = Math.floor((remaining / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      const elapsedPercent =
        totalDuration > 0 ? ((totalDuration - remaining) / totalDuration) * 100 : 100;
      setPercentElapsed(Math.min(elapsedPercent, 100));
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [endTime]);

  useEffect(() => {
    const toggleInterval = setInterval(() => {
      setToggleColors((prev) => !prev);
    }, 25000);
    return () => clearInterval(toggleInterval);
  }, []);

  if (!timeLeft) return null;

  const colorScheme = toggleColors
    ? {
        background: '#ff7300',
        border: '#f36100',
        progressBar: '#ffffff',
        clockColor: '#ca3102',
        textColor: '#ffffff',
      }
    : {
        background: 'rgba(202, 0, 0, 1)',
        border: 'rgba(217, 0, 0, 1)',
        progressBar: '#ffffff',
        clockColor: '#ffffff',
        textColor: '#ffffff',
      };

  const formatTime = (value) => value.toString().padStart(2, '0');

  const isZero =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  return (
    <div
      className="clearance-sale-box"
      style={{
        borderColor: colorScheme.border,
        backgroundColor: 'transparent',
        color: colorScheme.textColor,
      }}
    >
      <div
        className="clearance-header"
        style={{
          backgroundColor: colorScheme.background,
          borderColor: colorScheme.border,
          borderBottom: 'none',
          borderStyle: 'solid',
          borderWidth: '1px 1px 0 1px',
          borderRadius: '8px 8px 0 0',
          color: colorScheme.textColor,
        }}
      >
        <div className="clearance-left">
          <div className="clearance-label">Clearance Sale</div>
          <div className="clearance-endtime">
            | Ends in:{' '}
            {!isZero
              ? `${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(
                  timeLeft.seconds
                )}`
              : '00:00:00'}
          </div>
        </div>

        <div className="clearance-progress-wrapper">
          <div className="clearance-progress">
            <div
              className={`progress-bar ${isZero ? 'blinking' : ''}`}
              style={{
                width: `${percentElapsed}%`,
                backgroundColor: colorScheme.progressBar,
              }}
            />
            <div
              className="progress-clock"
              style={{
                left: `${percentElapsed}%`,
                color: colorScheme.clockColor,
              }}
              aria-label="clock icon"
            >
              🕒
            </div>
          </div>
        </div>
      </div>

      <div
        className="variant-wrapper"
        style={{
          borderColor: colorScheme.border,
          borderStyle: 'solid',
          borderWidth: '0 1px 1px 1px',
          borderRadius: '0 0 8px 8px',
          backgroundColor: 'transparent',
          color: colorScheme.textColor,
        }}
      >
        {children}
      </div>
    </div>
  );
}
