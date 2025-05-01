import { Schema, Types, model } from 'mongoose';
import { ReportSchema } from './report.js';
import type { IFinancial } from '../interfaces/financial.js';

const financialReport = new Schema<IFinancial>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    month: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year: {
        type: Number,
        required: true,
    },
    incomes: {
        type: [ReportSchema],
        default: []
    },
    expenses: {
        type: [ReportSchema],
        default: []
    },
    balance: {
        type: Number,
        default: 0
    }
});

financialReport.pre('save', function (next) {
    const incomeTotal = this.incomes.reduce((total, income) => total + income.amount!, 0);
    const expenseTotal = this.expenses.reduce((total, expense) => total + expense.amount!, 0);
    this.balance = incomeTotal - expenseTotal;
    next();
});

financialReport.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default model('FinancialReport', financialReport);