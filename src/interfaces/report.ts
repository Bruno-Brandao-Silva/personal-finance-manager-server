import { FinancialStatus } from "../enums/financialStatus.js";

export interface IReport {
    name: string;
    amount?: number;
    description?: string;
    status?: FinancialStatus;
}