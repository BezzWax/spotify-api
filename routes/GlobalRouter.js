const express = require('express');
const router = express.Router();

const spotifyGlobalTopTracks = require('../services/globals/spotifyGlobalTopTracks');
const spotifyGlobalTopAlbums = require('../services/globals/spotifyGlobalTopAlbums');
const spotifyGlobalTopArtist = require('../services/globals/spotifyGlobalTopArtists');

router.route('/tracks').get(async (req, res) => {
	try {
		const tracks = await spotifyGlobalTopTracks.getTopTracks();
		res.json(tracks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route('/artists').get(async (req, res) => {
	try {
		const artists = await spotifyGlobalTopArtist.getTopArtist();
		res.json(artists);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route('/albums').get(async (req, res) => {
	try {
		const albums = await spotifyGlobalTopAlbums.getTopAlbums();
		res.json(albums);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;