const axios = require('axios');

const apiUrl = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF';
let accessToken = '';

const setAccessToken = (token) => {
	accessToken = token;
}

const getTopTracks = async () => {
	const url = apiUrl;
	const headers = {
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};

	try {
		const response = await axios.get(url, { headers });
		return response.data;
	} catch (error) {
		console.error('Spotify API error:', error.response.data);
		throw error;
	}
};

module.exports = {
	getTopTracks,
	setAccessToken,
};