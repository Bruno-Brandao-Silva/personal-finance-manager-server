import { Schema, model } from 'mongoose';
import type { IUser } from '../interfaces/user.js';

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		trim: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}

},
	{ timestamps: true }
);

export default model('User', userSchema);