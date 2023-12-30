const axios = require('axios');

const apiUrl = 'https://api.spotify.com/v1/me/top/artists';

let accessToken = '';

const setAccessToken = (token) => {
	accessToken = token;
}

const getSpotifyGenres = async () => {
	const url = apiUrl;
	const headers = {
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};

	try {
		const response = await axios.get(url, { headers });
		const artists = response.data.items;
		return allGenres = artists.flatMap(artist => artist.genres);
	} catch (error) {
		console.error('Spotify API error:', error.response.data);
		throw error;
	}
};

module.exports = {
	getSpotifyGenres,
	setAccessToken,
};
