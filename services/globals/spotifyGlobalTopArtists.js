const axios = require('axios');

const apiUrl = 'https://api.spotify.com/v1/browse/categories/toplists/playlists/37i9dQZEVXbMDoHDwVN2tF';
let accessToken = '';

const setAccessToken = (token) => {
	accessToken = token;
}

const getTopArtist = async () => {
	const url = apiUrl;
	const headers = {
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};

	try {
		const response = await axios.get(url, { headers });
		//return response.data.tracks.items.map(item => item.artists[0]);
		return response.data;
	} catch (error) {
		console.error('Spotify API error:', error.response.data);
		throw error;
	}
};

module.exports = {
	getTopArtist,
	setAccessToken,
};