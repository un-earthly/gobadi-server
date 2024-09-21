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
	name: {
		type: String,
		required: false,
	},
	age: {
		type: Number,
		required: false,
	},
	district: {
		type: String,
		required: false,
	},
	avatar: {
		type: String,
		default: null,
	},
	nid: {
		type: String,
		required: false,
	},
	designation: {
		type: String,
		required: false,
	},
	organization: {
		type: String,
		required: false,
	},
	experience: {
		type: Number,
		required: false,
	},
	bio: {
		type: String,
		default: null,
	},
	specialization: {
		type: String,
		default: '',
	},
	availableTime: {
		type: String,
		required: false,
	},
	cow: {
		type: Number,
		required: false,
		default: null,
	},
	hen: {
		type: Number,
		required: false,
		default: null,
	},
	fish: {
		type: Number,
		required: false,
		default: null,
	},
	duck: {
		type: Number,
		required: false,
		default: null,
	},
	goat: {
		type: Number,
		required: false,
		default: null,
	},
	isOnline: {
		type: Boolean,
		default: false,
	},
	fee: {
		type: Number,
		required: false,
		default: null,
	}
});

// Hash password before saving
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Index for mobile field
userSchema.index({ mobile: 1 });

const User = mongoose.model('User', userSchema);

export default User;
