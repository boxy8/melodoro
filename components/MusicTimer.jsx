import useSpotify from '../hooks/useSpotify';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import SkipBackButton from './SkipBackButton';
import SkipForwardButton from './SkipForwardButton';
import ProgressCircle from './ProgressCircle';
import 'react-circular-progressbar/dist/styles.css';
import { useRef, useState } from 'react';

function MusicTimer() {
    // unit: minutes
    const duration = {
        'work': 25,
        'break': 5
    };
    const spotifyApi = useSpotify();
    const [isRunning, setIsRunning] = useState(false);
    const [timerValue, setTimerValue] = useState(duration.work * 60 * 1000);
    const [mode, setMode] = useState('work'); // work / break 
    const timeout = useRef();

    function resume() {
        const newTimestamp = timerValue + Date.now();
        updateTimer(newTimestamp);
        setIsRunning(true)
        syncMusic('play');
    }

    function pause() {
        clearTimeout(timeout.current);
        setIsRunning(false);
        syncMusic('pause');
    }

    function skipBack() {
        spotifyApi.skipToPrevious()
            .then(function () {
                console.log('Skip to previous');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }
    
    function skipForward() {
        spotifyApi.skipToNext()
            .then(function () {
                console.log('Skip to next');
            }, function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                console.log('Something went wrong!', err);
            });
    }

    function syncMusic(timerStatus) {
        spotifyApi.getMyCurrentPlaybackState()
            .then(function (data) {
                if (data.body && data.body.is_playing) {
                    if (timerStatus == 'pause') {
                        spotifyApi.pause()
                        .then(function () {
                        }, function (err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.log('Something went wrong!', err);
                        });
                    }
                } else {
                    if (timerStatus == 'play') {
                        spotifyApi.play()
                        .then(function () {
                        }, function (err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.log('Something went wrong!', err);
                        });
                    }
                }
            });
    }

    function updateTimer(timestamp) {
        if (timestamp - Date.now() <= 0) {
            switchMode();
        } else {
            setTimerValue(timestamp - Date.now());
            timeout.current = setTimeout(() => {updateTimer(timestamp)}, 500);
        }
    }

    function switchMode() {
        pause();
        const nextMode = mode === 'work' ? 'break' : 'work';
        const nextTimerValue = (nextMode === 'work' ? duration.work : duration.break) * 60 * 1000;

        setMode(nextMode);
        setTimerValue(nextTimerValue);
    }

    let [hrs, mins, secs] = getReturnValues(timerValue);
    if (mins < 10) mins = '0' + mins;
    if (secs < 10) secs = '0' + secs;

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
                <ProgressCircle text={`${mins}:${secs}`}/>
                    <div className="now-playing__side">
                        <SkipBackButton onClick={skipBack} />
                         {isRunning 
                            ? <PauseButton onClick={pause} />
                            : <PlayButton onClick={resume} />
                         }
                        <SkipForwardButton onClick={skipForward} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicTimer;