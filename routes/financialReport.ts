import { Router } from "express";
import { verifyAuth } from '../middlewares/auth';
import {
    getFinancialReports,
    createFinancialReport,
    getFinancialReport,
    updateFinancialReport,
    deleteFinancialReport
} from '../controllers/financialReport';

const router = Router();

router.get('/', verifyAuth, getFinancialReports);
router.post('/:year/:month', verifyAuth, createFinancialReport);
router.get('/:year/:month', verifyAuth, getFinancialReport);
router.put('/:year/:month', verifyAuth, updateFinancialReport);
router.delete('/:year/:month', verifyAuth, deleteFinancialReport);

export default router;