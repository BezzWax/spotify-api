const axios = require('axios');

const apiUrl = 'https://api.spotify.com/v1';
let accessToken = '';

const setAccessToken = (token) => {
	accessToken = token;
}

const getSpotifyPlaylists = async () => {
	const url = `${apiUrl}/me/playlists`;
	const headers = {
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};

	try {
		const response = await axios.get(url, { headers });
		return response.data.items;
	} catch (error) {
		console.error('Spotify API error:', error.response.data);
		throw error;
	}
};

module.exports = {
	getSpotifyPlaylists,
	setAccessToken,
};