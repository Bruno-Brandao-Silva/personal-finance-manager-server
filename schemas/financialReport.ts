import mongoose from 'mongoose';

const userMonthlySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
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
        type: [{
            amount: {
                type: Number,
            },
            description: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    expenses: {
        type: [{
            amount: {
                type: Number,
            },
            description: {
                type: String,
                required: true
            }

        }],
        default: []
    },
    balance: {
        type: Number,
        default: 0
    }
});

userMonthlySchema.pre('save', function (next) {
    const incomeTotal = this.incomes.reduce((total, income) => total + income.amount!, 0);
    const expenseTotal = this.expenses.reduce((total, expense) => total + expense.amount!, 0);
    this.balance = incomeTotal - expenseTotal;
    next();
});

userMonthlySchema.index({ userId: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model('UserMonthly', userMonthlySchema);