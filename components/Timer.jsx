import { useRef, useEffect, useState } from 'react';

function Timer(props) {
    const { isActive, duration, setIsActive } = props;
    const endTimestamp = useRef(duration * 60 * 1000 + Date.now());
    const [timerValue, setTimerValue] = useState(duration * 60 * 1000);

    const interval = useRef();
    if (isActive) {
        if (endTimestamp.current < 0) {
            endTimestamp.current = timerValue + Date.now();
        }

        interval.current = setTimeout(() => {
            if (Date.now() > endTimestamp.current) {
                setIsActive(false);
                endTimestamp.current = -1;
            } else {
                setTimerValue(endTimestamp.current - Date.now());
            }
        }, 1000);
    } else {
        endTimestamp.current = -1;
    }


    const [hours, minutes, seconds] = getReturnValues(timerValue);
  

    return (
        <div>
            {hours}:{minutes}:{seconds}
        </div>
    );
}

const getReturnValues = (timerValue) => {
	// calculate timerValue (ms) in terms of hrs, mins, secs
	const hours = Math.floor(timerValue / (1000 * 60 * 60));
	const minutes = Math.floor((timerValue % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timerValue % (1000 * 60)) / 1000);

	return [hours, minutes, seconds];
};

export default Timer;