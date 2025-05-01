import { Types } from "mongoose";
import type { IReport } from "./report.js";

export interface IFinancial {
    userId: Types.ObjectId;
    month: number;
    year: number;
    incomes: IReport[];
    expenses: IReport[];
    balance: number;
}