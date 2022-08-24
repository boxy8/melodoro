import useSpotify from '../hooks/useSpotify';
import { useRef, useState } from 'react';
import Timer from '../components/Timer';

function MusicTimer() {
    // unit: minutes
    const duration = {
        'work': 1,
        'break': 1
    };
    const spotifyApi = useSpotify();
    const [isRunning, setIsRunning] = useState(false);
    const [timerValue, setTimerValue] = useState(duration.work * 60 * 1000);
    const [mode, setMode] = useState('work'); // work or break mode
    const [endTimestamp, setEndTimestamp] = useState(duration.work * 60 * 1000 + Date.now());  
    const timeout = useRef();

    function resume() {
        setIsRunning(true)
        setEndTimestamp(timerValue + Date.now());
        syncMusic('play');
    }

    function pause() {
        clearTimeout(timeout);
        setIsRunning(false);
        syncMusic('pause');
    }

    function switchMode() {
        pause();
        const nextMode = mode === 'work' ? 'break' : 'work';
        const nextTimerValue = (nextMode === 'work' ? duration.work : duration.break) * 60 * 1000;

        setMode(nextMode);
        setTimerValue(nextTimerValue);
    }

    function syncMusic(timerStatus) {
        spotifyApi.getMyCurrentPlaybackState()
            .then(function (data) {
                if (data.body && data.body.is_playing) {
                    if (timerStatus == 'pause') {
                        spotifyApi.pause()
                        .then(function () {
                            console.log('Playback paused');
                        }, function (err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.log('Something went wrong!', err);
                        });
                    }
                } else {
                    if (timerStatus == 'play') {
                        spotifyApi.play()
                        .then(function () {
                            console.log('Playback started');
                        }, function (err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.log('Something went wrong!', err);
                        });
                    }
                }
            });
    }

    if (isRunning) {
        timeout.current = setTimeout(() => {
            if (endTimestamp - Date.now() <= 0) {
                switchMode();
            } else {
                setTimerValue(endTimestamp - Date.now());
            }
        }, 500);
    }

    const [hrs, mins, secs] = getReturnValues(timerValue);

    function getReturnValues(timerValue) {
        // calculate timer value in terms of hrs, mins, secs
        const hours = Math.floor(timerValue / (1000 * 60 * 60));
        const minutes = Math.floor((timerValue % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timerValue % (1000 * 60)) / 1000);
    
        return [hours, minutes, seconds];
    };

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                <h1>{mode}</h1>
                <div>{hrs} : {mins} : {secs}</div>
                    <div className="now-playing__side">

                        <button className="btn-spotify" onClick={() => { 
                            spotifyApi.skipToPrevious()
                                .then(function () {
                                    console.log('Skip to previous');
                                }, function (err) {
                                    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                    // ^^bruh wtf scopes say u dont need premium for this tho
                                    console.log('Something went wrong!', err);
                                });
                         }} >
                            &lt;&lt;
                        </button>

                         {isRunning 
                            ? <button className="btn-spotify" onClick={pause}>PAUSE</button>
                            : <button className="btn-spotify" onClick={resume}>PLAY</button>
                         }

                        <button className="btn-spotify" onClick={() => { 
                            spotifyApi.skipToNext()
                                .then(function () {
                                    console.log('Skip to next');
                                }, function (err) {
                                    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                    console.log('Something went wrong!', err);
                                });
                         }} >
                            &gt;&gt;
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicTimer;