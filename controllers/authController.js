import User from '../models/User.js';
import jwt from 'jsonwebtoken';
const generateToken = (id, role) => {
	return jwt.sign({ id, role }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});
};

const registerUser = async (req, res) => {
	const { mobile, role, veterinaries, name, password } = req.body;
	let cow, fish, goat, hen, duck;

	if (role === "consumer" && veterinaries) {
		cow = veterinaries.cow;
		fish = veterinaries.fish;
		goat = veterinaries.goat;
		hen = veterinaries.hen;
		duck = veterinaries.duck;
	}

	try {
		const userExists = await User.findOne({ mobile });

		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}


		const user = await User.create({ ...req.body });

		if (user) {
			res.status(201).json({
				user,
				token: generateToken(user._id, user.role),
			});
		} else {
			res.status(400).json({ message: 'Invalid user data' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

const authUser = async (req, res) => {
	const { mobile, password } = req.body;
	console.log(mobile, password);

	try {
		const user = await User.findOne({ mobile });
		if (user && (await user.matchPassword(password))) {
			console.log(user)
			res.json({
				user,
				token: generateToken(user._id, user.role),
			});
		} else {
			res.status(401).json({ message: 'Invalid mobile or password' });
		}
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};

// Update password controller
export const updatePassword = async (req, res) => {
	const { userId, oldPassword, newPassword } = req.body;

	try {
		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Check if the old password matches
		const isMatch = await user.matchPassword(oldPassword);
		if (!isMatch) {
			return res.status(400).json({ message: 'Old password is incorrect' });
		}

		// Hash the new password and update the user
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(newPassword, salt);
		await user.save();

		res.status(200).json({ message: 'Password updated successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
export { registerUser, authUser };
