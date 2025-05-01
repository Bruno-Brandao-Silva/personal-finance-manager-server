import { Schema } from "mongoose";
import { FinancialStatus } from "../enums/financialStatus.js";
import type { IReport } from "../interfaces/report.js";


export const ReportSchema = new Schema<IReport>({
    name: { type: String, required: true },
    amount: { type: Number },
    description: { type: String },
    status: {
        type: String,
        enum: FinancialStatus,
        default: FinancialStatus.ToConfirm
    }
});