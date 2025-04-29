import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { handleError } from '../lib/utils.ts';
import financialReport from '../schemas/financialReport.ts';

export async function createFinancialReport(req: Request, res: Response) {
    try {
        const { incomes, expenses }: ReportRequestBody = req.body;
        const { year, month } = req.params;
        const userId = req.UserJwtPayload._id;

        const existingReport = await financialReport.findOne({ userId, year, month });
        if (existingReport) {
            res.status(409).json({ error: 'Report already exists for this month and year' });
        }

        const newReport = new financialReport({ userId, year, month, incomes, expenses });
        await newReport.save();

        res.status(201).json({ message: 'Report created successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error creating financial report');
    }
}

export async function getFinancialReports(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        const reports = await financialReport.find({ userId }).select('-userId');
        res.json(reports);
    } catch (error: any) {
        handleError(res, error, 'Error fetching financial reports');
    }
}

export async function getFinancialReport(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        const { year, month } = req.params;
        const report = await financialReport.findOne({ userId, year, month });
        if (!report) {
            res.status(404).json({ error: 'Report not found' });
            return;
        }
        res.json(report);
    } catch (error: any) {
        handleError(res, error, 'Error fetching financial report');
    }
}

export async function updateFinancialReport(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        const { year, month } = req.params;
        const { incomes, expenses }: ReportRequestBody = req.body;

        const report = await financialReport.findOne({ userId, year, month });
        if (!report) {
            res.status(404).json({ error: 'Report not found' });
            return;
        }

        report.incomes = incomes as mongoose.Types.DocumentArray<Income>;
        report.expenses = expenses as mongoose.Types.DocumentArray<Expense>;

        await report.save();
        res.json({ message: 'Report updated successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error updating financial report');
    }
}

export async function deleteFinancialReport(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        const { year, month } = req.params;

        const report = await financialReport.findOne({ userId, year, month });
        if (!report) {
            res.status(404).json({ error: 'Report not found' });
            return;
        }

        await report.deleteOne();
        res.json({ message: 'Report deleted successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error deleting financial report');
    }
}

export async function deleteAllFinancialReports(req: Request, res: Response) {
    try {
        const userId = req.UserJwtPayload._id;
        await financialReport.deleteMany({ userId });
        res.json({ message: 'All reports deleted successfully' });
    } catch (error: any) {
        handleError(res, error, 'Error deleting all financial reports');
    }
}