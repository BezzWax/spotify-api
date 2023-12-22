
const express = require('express');
const router = express.Router();

const spotifyPlaylistService = require('../services/spotifyPlaylistService');
const spotifyGenresService = require('../services/spotifyGenresService');
const spotifyGetUserData = require('../services/spotifyUserService');
const spotifySavedAlbums = require('../services/spotifyAlbumsService');

router.route('/').get(async (req, res) => {
	try {
		const user = await spotifyGetUserData.getUserData();
		res.json(user);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route('/playlist').get(async (req, res) => {
	try {
		const playlist = await spotifyPlaylistService.getSpotifyPlaylists();
		res.json(playlist);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route('/genres').get(async (req, res) => {
	try {
		const genres = await spotifyGenresService.getSpotifyGenres();
		res.json(genres);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route('/albums').get(async (req, res) => {
	try {
		const albums = await spotifySavedAlbums.getSavedAlbum();
		res.json(albums);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;