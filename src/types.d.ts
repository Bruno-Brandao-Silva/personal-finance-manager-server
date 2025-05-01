import { ObjectId } from 'mongoose';
import { IReport } from './interfaces/report';

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

  type ReportRequestBody = {
    incomes: IReport[];
    expenses: IReport[];
  }
}
