
const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');


//app.set('view engine', 'ejs');

//router
const userRouter = require('./routes/UserRouter');
const globalRouter = require('./routes/GlobalRouter');

//current user
const spotifyPlaylistService = require('./services/user/spotifyPlaylistService');
const spotifyGenresService = require('./services/user/spotifyGenresService');
const spotifyGetUserData = require('./services/user/spotifyUserService');
const spotifySavedAlbums = require('./services/user/spotifyAlbumsService');
const spotifyTopUserArtist = require('./services/user/spotifyTopArtistService');
const spotifyTopUsertracks = require('./services/user/spotifyTopTracksService');

//global
// const spotifyGlobalTopTracks = require('./services/globals/spotifyGlobalTopTracks');
// const spotifyGlobalTopAlbums = require('./services/globals/spotifyGlobalTopAlbums');
// const spotifyGlobalTopArtist = require('./services/globals/spotifyGlobalTopArtists');

app.use(express.json());

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = process.env.REDIRECT_URI;


app.listen(3000, () => {
	console.log('Server is run');
});

app.get('/callback', async (req, res) => {
	const { code } = req.query;

	if (!code) {
		return res.status(400).send('Missing authorization code');
	}

	try {
		const response = await axios.post('https://accounts.spotify.com/api/token', null, {
			params: {
				code,
				grant_type: 'authorization_code',
				redirect_uri: redirectUri,
				client_id: clientId,
				client_secret: clientSecret,
			},
		});

		const { access_token, refresh_token } = response.data;
		console.log('Access Token:', access_token);
		console.log('Refresh Token:', refresh_token);

		//user routes
		spotifyGetUserData.setAccessToken(access_token);
		spotifyPlaylistService.setAccessToken(access_token);
		spotifyGenresService.setAccessToken(access_token);
		spotifySavedAlbums.setAccessToken(access_token);
		spotifyTopUserArtist.setAccessToken(access_token);
		spotifyTopUsertracks.setAccessToken(access_token);

		//global routes
		//spotifyGlobalTopTracks.setAccessToken(access_token);
		//spotifyGlobalTopAlbums.setAccessToken(access_token);
		//spotifyGlobalTopArtist.setAccessToken(access_token);

		res.redirect('/');

	} catch (error) {
		console.error('Error exchanging authorization code for token:', error.message);
		console.error('Error stack:', error.stack);
		res.status(500).send('Error exchanging authorization code for token');
	}

});

app.use('/api/user', userRouter);
app.use('/api/global', globalRouter);

app.use(express.static('public'));

app.get('/', async (req, res) => {
	try {
		res.render('index', {
			CLIENT_ID: process.env.CLIENT_ID,
			REDIRECT_URI: process.env.REDIRECT_URI,
		});
	} catch (error) {
		console.error('Error:', error);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = app;
