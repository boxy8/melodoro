import useSpotify from '../hooks/useSpotify';
import { useTimer } from '../hooks/useTimer';
import { useEffect, useState } from 'react';
import Timer from '../components/Timer';

function MusicTimer() {
    const spotifyApi = useSpotify();
    const [isActive, setIsActive] = useState(false);   

    useEffect(() => {
        toggleMusic(spotifyApi);    // k problem is there is now noticeable delay...
    }, [isActive])

    return (
        <>
            <div className="container">
                <div className="main-wrapper">
                    <Timer isActive={isActive} duration={1} setIsActive={setIsActive}/>
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

                        <button className="btn-spotify" onClick={() => {
                            // remember please that it is not being called on render... it calls on click...
                            // logic to toggle isActive. music playback being toggled after render.
                            setIsActive(prevIsActive => !prevIsActive);
                         }} >
                            { isActive ? "PAUSE" : "PLAY" }
                        </button>

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

function toggleMusic(spotifyApi) {
        // check if currently play or pause
        spotifyApi.getMyCurrentPlaybackState()
            .then(function (data) {
                // Output items
                if (data.body && data.body.is_playing) {
                    // we want to pause
                    spotifyApi.pause()
                        .then(function () {
                            console.log('Playback paused');
                        }, function (err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.log('Something went wrong!', err);
                        });
                } else {
                    // we want to play
                    spotifyApi.play()
                        .then(function () {
                            console.log('Playback started');
                        }, function (err) {
                            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                            console.log('Something went wrong!', err);
                        });
                }
            }, function (err) {
                console.log('Something went wrong!', err);
            });
}

export default MusicTimer;