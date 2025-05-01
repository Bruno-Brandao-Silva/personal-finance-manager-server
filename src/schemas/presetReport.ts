import { model, Schema } from "mongoose";
import type { IPreset } from "../interfaces/preset.js"

const presetReportSchema = new Schema<IPreset>({
    userId: {
        type: Schema.Types.ObjectId,
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

export default model("PresetReport", presetReportSchema);