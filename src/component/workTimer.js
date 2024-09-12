import React, { useState } from 'react';
import useInterval from '../hooks/useInterval';
import logo from '../assets/pazari-logo-dark.a08188ad.png'

const WorkTimer = () => {
    const [timeLeft, setTimeLeft] = useState(8 * 60 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [shiftDuration, setShiftDuration] = useState(8 * 60 * 60);

    useInterval(() => {
        if (timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        }
    }, isRunning ? 1000 : null);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setTimeLeft(shiftDuration);
        setIsRunning(false);
    };

    const handleShiftChange = (hours) => {
        const durationInSeconds = hours * 60 * 60;
        setShiftDuration(durationInSeconds);
        setTimeLeft(durationInSeconds);
        setIsRunning(false);
    };

    return (
        <div className="App">
            <img src={logo} alt="Pazari Shop Logo" className="shop-logo" />

            <h3>Izaberi radno vreme:</h3>
            <div>
                <button onClick={() => handleShiftChange(8)}>8 sati</button>
                <button onClick={() => handleShiftChange(5)}>5 sati</button>
            </div>

            <h3>Radno vreme:</h3>
            <h2>{formatTime(timeLeft)}</h2>

            <div>
                <button onClick={handleStartStop}>
                    {isRunning ? 'Zaustavi' : 'Pokreni'}
                </button>
                <button onClick={handleReset}>Resetuj</button>
            </div>
        </div>
    );
};

export default WorkTimer;
