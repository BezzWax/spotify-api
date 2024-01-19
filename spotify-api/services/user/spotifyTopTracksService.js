const axios = require('axios');

const apiUrl = 'https://api.spotify.com/v1/me/top/tracks';
let accessToken = '';

const setAccessToken = (token) => {
	accessToken = token;
}

const getUserTopTrack = async () => {
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
	getUserTopTrack,
	setAccessToken,
};