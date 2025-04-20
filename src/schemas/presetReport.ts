import mongoose from "mongoose";

const presetReportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    incomes: [{
        amount: {
            type: Number,
        },
        description: {
            type: String,
            required: true
        }
    }],
    expenses: [{
        amount: {
            type: Number,
        },
        description: {
            type: String,
            required: true
        }
    }],
});

export default mongoose.model("PresetReport", presetReportSchema);