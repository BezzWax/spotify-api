const axios = require('axios');

const apiUrl = 'https://api.spotify.com/v1/me/top/artists';
let accessToken = '';

const setAccessToken = (token) => {
	accessToken = token;
}

const getTopArtists = async () => {
	const url = apiUrl;
	const headers = {
		'Authorization': `Bearer ${accessToken}`,
		'Content-Type': 'application/json',
	};

	try {
		const response = await axios.get(url, { headers });
		const artists = response.data.items.map(artist => ({
			name: artist.name,
			externalUrl: artist.external_urls.spotify,
			images: artist.images,
			id: artist.id,
		}));
		return artists;
	} catch (error) {
		console.error('Spotify API error:', error.response.data);
		throw error;
	}
};

module.exports = {
	getTopArtists,
	setAccessToken,
};