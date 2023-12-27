import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, "Please provide a username"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Please provide a email"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExprity: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

// if users collection already exists then don't create
// and if its not exists then only create
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
