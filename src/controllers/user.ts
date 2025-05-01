import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { handleError } from '../lib/utils.js';
import { addInvalidToken, signAuth } from '../middlewares/auth.js';
import User from '../schemas/user.js';

export async function login(req: Request, res: Response) {
    try {
        const { email, password }: LoginRequestBody = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return
        }

        const isPasswordValid = await bcrypt.compare(password, user.password.toString());
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }

        const data = await signAuth(res, user._id);
        res.json({ ...data });
    } catch (error: any) {
        handleError(res, error);
    }
};

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password }: RegisterRequestBody = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ error: 'Email already in use' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        const data = await signAuth(res, newUser._id);
        res.status(201).json({ ...data });
    } catch (error: any) {
        handleError(res, error, 'Error registering user');
    }
};

export async function logout(req: Request, res: Response) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (token) {
            addInvalidToken(token);
        }
        res.status(200).json({ message: 'Logout successful' });
    } catch (error: any) {
        handleError(res, error, 'Error during logout');
    }
};

export async function get(req: Request, res: Response) {
    try {
        const { _id }: UserJwtPayload = req.UserJwtPayload;
        const user = await User.findById(_id).select('-password');
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error: any) {
        handleError(res, error, 'Error getting user data');
    }
};

export async function patch(req: Request, res: Response) {
    try {
        const { _id }: UserJwtPayload = req.UserJwtPayload;
        const updatedFields = req.body;
        const updatedUser = await User.findByIdAndUpdate(_id, updatedFields, { new: true }).select('-password');
        if (!updatedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Profile edited successfully', user: updatedUser });
    } catch (error: any) {
        handleError(res, error, 'Error editing profile');
    }
};

export async function remove(req: Request, res: Response) {
    try {
        const { _id }: UserJwtPayload = req.UserJwtPayload;
        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error deleting user');
    }
};