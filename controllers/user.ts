import { Request, Response } from 'express';
import User from '../schemas/user';
import bcrypt from 'bcrypt';
import { signAuth, addInvalidToken } from '../middlewares/auth';
import { handleError } from '../lib/utils';

export async function login(req: Request, res: Response) {
    try {
        const { email, password }: LoginRequestBody = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid email or password' });

        const token = await signAuth(res, user._id);
        return res.json({ token });
    } catch (error: any) {
        handleError(res, error);
    }
};

export async function register(req: Request, res: Response) {
    try {
        const { name, email, password }: RegisterRequestBody = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ error: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });

        await newUser.save();

        const token = await signAuth(res, newUser._id);
        return res.status(201).json({ token });
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
        if (!user) return res.status(404).json({ error: 'User not found' });
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
        if (!updatedUser) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'Profile edited successfully', user: updatedUser });
    } catch (error: any) {
        handleError(res, error, 'Error editing profile');
    }
};

export async function remove(req: Request, res: Response) {
    try {
        const { _id }: UserJwtPayload = req.UserJwtPayload;
        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) return res.status(404).json({ error: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error deleting user');
    }
};