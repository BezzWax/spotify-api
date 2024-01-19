
document.addEventListener('DOMContentLoaded', function () {
	var authLink = document.getElementById('authLink');

	const CLIENT_ID = '91bf0d3fbdb74deba38ea4ed9ec44f7b';
	const REDIRECT_URI = 'http://localhost:3000/callback';

	const spotifyAuthLink = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-top-read%20user-library-read%20playlist-read-private`;

	authLink.href = spotifyAuthLink;

});

// 