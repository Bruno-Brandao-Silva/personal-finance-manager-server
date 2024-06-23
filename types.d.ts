import { ObjectId } from 'mongoose';

declare global {
  namespace Express {
    export interface Request {
      UserJwtPayload: UserJwtPayload;
    }
  }

  type UserJwtPayload = {
    _id: ObjectId;
    jti: string;
    iat: number;
    exp: number;
  }

  interface String {
    toProperCase(): string;
  }

  type LoginRequestBody = {
    email: string;
    password: string;
  }

  type RegisterRequestBody = {
    name: string;
    email: string;
    password: string;
  }

  type Income = {
    amount?: number;
    description: string;
  }

  type Expense = {
    amount?: number;
    description: string;
  }

  type ReportRequestBody = {
    incomes: Income[];
    expenses: Expense[];
  }
}
