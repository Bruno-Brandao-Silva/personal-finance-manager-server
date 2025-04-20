import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleError } from '../lib/utils.ts';
import presetReport from '../schemas/presetReport.ts';

export async function createPresetReport(req: Request, res: Response) {
    try {
        const { incomes, expenses }: ReportRequestBody = req.body;
        const userId = req.UserJwtPayload._id;

        const existingReport = await presetReport.findOne({ userId });
        if (existingReport) {
            return res.status(409).json({ error: 'Report already exists with this name' });
        }
        presetReport.create({ userId, incomes, expenses });
        return res.status(201).json({ message: 'Report created successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error creating preset report');
    }
}

export async function getPresetReport(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        const report = await presetReport.findOne({ userId });
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.json(report);
    } catch (error: any) {
        handleError(res, error, 'Error fetching preset report');
    }
}

export async function updatePresetReport(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        const { incomes, expenses } = req.body;

        const report = await presetReport.findOne({ userId });
        if (!report) return res.status(404).json({ error: 'Report not found' });

        report.incomes = incomes as mongoose.Types.DocumentArray<Income>;
        report.expenses = expenses as mongoose.Types.DocumentArray<Expense>;

        await report.save();
        res.json({ message: 'Report updated successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error updating preset report');
    }
}

export async function deletePresetReport(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;

        const report = await presetReport.findOne({ userId });
        if (!report) return res.status(404).json({ error: 'Report not found' });

        await report.deleteOne();
        res.json({ message: 'Report deleted successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error deleting preset report');
    }
}