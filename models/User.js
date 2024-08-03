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
		enum: ['provider', 'consumer'],
		default: 'consumer',
	},
	duck: {
		type: Number,
		required: false,
		default: null,
	},
	hen: {
		type: Number,
		required: false,
		default: null,
	},
	cow: {
		type: Number,
		required: false,
		default: null,
	},
	goat: {
		type: Number,
		required: false,
		default: null,
	},
	fish: {
		type: Number,
		required: false,
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
