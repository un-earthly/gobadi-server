// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
	mobile: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
		enum: ['data', 'grohita'],
		default: 'grohita',
	},
	hash: {
		type: Number,
		required: true,
		default: null,
	},
	murgi: {
		type: Number,
		required: true,
		default: null,
	},
	goru: {
		type: Number,
		required: true,
		default: null,
	},
	chagol: {
		type: Number,
		required: true,
		default: null,
	},
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
