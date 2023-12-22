const userService = require('../services/UserService');

exports.getAllUsers = async (req, res) => {
	try {
		const users = await userService.getAllUsers();
		res.json({ data: users, status: 'success' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};