const userRouter = require('./routes/UserRouter');
const express = require('express');
const app = express();
require('dotenv').config();
const axios = require('axios');

const spotifyPlaylistService = require('./services/spotifyPlaylistService');
const spotifyGenresService = require('./services/spotifyGenresService');
const spotifyGetUserData = require('./services/spotifyUserService');
const spotifySavedAlbums = require('./services/spotifyAlbumsService');

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

		spotifyGetUserData.setAccessToken(access_token);
		spotifyPlaylistService.setAccessToken(access_token);
		spotifyGenresService.setAccessToken(access_token);
		spotifySavedAlbums.setAccessToken(access_token);

		res.redirect('/');

	} catch (error) {
		console.error('Error exchanging authorization code for token:', error.message);
		console.error('Error stack:', error.stack);
		res.status(500).send('Error exchanging authorization code for token');
	}
});

app.use('/api/user', userRouter);

app.use(express.static('public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;
