import { Request, Response, NextFunction } from 'express';
import { SignJWT, jwtVerify } from 'jose';
import { nanoid } from 'nanoid';
import { Types } from 'mongoose';
import User from '../schemas/user';

const expiresIn = 1000 * 60 * 60;
const invalidTokens: Set<string> = new Set();

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_KEY = process.env.TOKEN_KEY!;

if (!JWT_SECRET) throw new Error('JWT_SECRET is undefined');
if (!TOKEN_KEY) throw new Error('TOKEN_KEY is undefined');

export const addInvalidToken = (token: string) => {
  invalidTokens.add(token);
};

export const isTokenInvalid = (token: string): boolean => {
  return invalidTokens.has(token);
};

export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.signedCookies[TOKEN_KEY] || req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'Access denied, missing token' });
    }

    if (isTokenInvalid(token)) {
      return res.status(403).json({ error: 'Access denied, invalid token' });
    }

    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const userExists = await User.exists({ _id: verified.payload._id });
    if (!userExists) {
      return res.status(401).json({ error: 'Access denied, invalid token' });
    }

    req.UserJwtPayload = verified.payload as UserJwtPayload;
    next();
  } catch (err: any) {
    console.error(err);
    return res.status(403).json({ error: 'Access denied, invalid token' });
  }
}

export async function signAuth(res: Response, _id: Types.ObjectId) {
  try {
    const expirationDate = new Date(Date.now() + expiresIn);
    const token = await new SignJWT({ _id })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime(expirationDate)
      .sign(new TextEncoder().encode(JWT_SECRET));
    res.cookie(TOKEN_KEY, token,
      {
        httpOnly: true,
        expires: expirationDate,
        secure: true,
        sameSite: 'none',
        signed: true
      });
    // res.cookie(TOKEN_KEY, token, { httpOnly: true, secure: true, expires: expirationDate });
    return { token_key: TOKEN_KEY, token, expires: expirationDate };
  } catch (err: any) {
    console.error('Error signing the authentication token:', err);
    throw new Error('Error signing the authentication token');
  }
}