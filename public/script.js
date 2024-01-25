document.addEventListener('DOMContentLoaded', function () {
	var authLink = document.getElementById('authLink');

	fetch('http://localhost:3000/api/user/data')
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			const { clientId, redirectUri } = data;

			const CLIENT_ID = clientId;
			const REDIRECT_URI = redirectUri;

			const spotifyAuthLink = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=user-read-private%20user-read-email%20user-top-read%20user-library-read%20playlist-read-private`;

			authLink.href = spotifyAuthLink;
		});
});

