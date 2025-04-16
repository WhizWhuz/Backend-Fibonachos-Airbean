const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Controller
exports.register = async (req, res) => {
	const { email, password, name, role } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists!" });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await User.create({
			email,
			password: hashedPassword,
			name,
			role,
		});

		const token = jwt.sign(
			{ id: newUser._id, role: newUser.role },
			process.env.JWT_SECRET,
			{
				expiresIn: "1h",
			}
		);

		res.status(201).json({
			message: "✅ Registration COMPLETE!",
			token,
			user: {
				id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
			},
		});
	} catch (err) {
		res
			.status(500)
			.json({ message: "⛔ Registration has failed!", error: err.message });
	}
};
// Login Controller
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user)
			return res
				.status(401)
				.json({ message: "🙅 Email or password is INCORRECT! ❌" });

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch)
			return res
				.status(401)
				.json({ message: "🙅 Email or password is INCORRECT! ❌" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});

		res.status(200).json({ token });
	} catch (err) {
		res.status(500).json({ message: "Server exploded! 🌋" });
	}
};
// Get all Users Controller
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({
			status: "success",
			results: users.length,
			data: {
				users,
			},
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: "Could not get users.",
		});
	}
};
