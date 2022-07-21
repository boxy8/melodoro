import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    // "streaming", <- need this later for webplayback sdk
    // "user-read-private", <- need this later as wpbsdk is only for premium
    "user-modify-playback-state",
    "user-read-playback-state",

].join(',');

const params = {
    scope: scopes,
    show_dialog: true,  // shows approval page again (but doesn't remove the prev approval apparently)
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize/?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };