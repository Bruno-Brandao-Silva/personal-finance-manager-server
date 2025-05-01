import { Router } from "express";
import {
    createFinancialReport,
    deleteFinancialReport,
    getFinancialReport,
    getFinancialReports,
    updateFinancialReport
} from '../controllers/financialReport.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyAuth, getFinancialReports);
router.post('/:year/:month', verifyAuth, createFinancialReport);
router.get('/:year/:month', verifyAuth, getFinancialReport);
router.put('/:year/:month', verifyAuth, updateFinancialReport);
router.delete('/:year/:month', verifyAuth, deleteFinancialReport);

export default router;