import React, { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';


function MusicTimer() {
    console.log("so this is rendering i guesS?");
    const spotifyApi = useSpotify();
    let onPlay;    // this is bad probs shuld i make it a state??? but not necessary because it's only read after we set it ?? doesn't need to persist between renders

    return (
        <>
            <div className="container">
                <div className="main-wrapper">

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
                            // check if currently play or pause
                            spotifyApi.getMyCurrentPlaybackState()
                                .then(function (data) {
                                    // Output items
                                    if (data.body && data.body.is_playing) {
                                        // we want to pause
                                        onPlay = false;
                                        spotifyApi.pause()
                                            .then(function () {
                                                console.log('Playback paused');
                                            }, function (err) {
                                                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
                                                console.log('Something went wrong!', err);
                                            });
                                    } else {
                                        // we want to play
                                        onPlay = true;
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
                            
                         }} >
                            { onPlay ? "PAUSE" : "PLAY" }
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

export default MusicTimer