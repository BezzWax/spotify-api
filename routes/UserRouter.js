const express = require('express');
const router = express.Router();

const spotifyPlaylistService = require('../services/user/spotifyPlaylistService');
const spotifyGenresService = require('../services/user/spotifyGenresService');
const spotifyGetUserData = require('../services/user/spotifyUserService');
const spotifySavedAlbums = require('../services/user/spotifyAlbumsService');
const spotifyTopUserArtist = require('../services/user/spotifyTopArtistService');
const spotifyTopUserTracks = require('../services/user/spotifyTopTracksService');

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

router.route('/artist').get(async (req, res) => {
	try {
		const artist = await spotifyTopUserArtist.getTopArtists();
		res.json(artist);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route('/tracks').get(async (req, res) => {
	try {
		const tracks = await spotifyTopUserTracks.getUserTopTrack();
		res.json(tracks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;