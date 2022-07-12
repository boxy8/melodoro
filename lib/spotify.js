import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
].join(',');

const params = {
    scope: scopes,
    show_dialog: true,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize/?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };