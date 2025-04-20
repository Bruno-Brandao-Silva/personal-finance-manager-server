import { Router } from "express";
import { deleteAllFinancialReports } from "../controllers/financialReport.ts";
import { deletePresetReport } from "../controllers/presetReport.ts";
import { get, patch, remove } from '../controllers/user.ts';
import { verifyAuth } from '../middlewares/auth.ts';

const router = Router();

router.get('/', verifyAuth, get);
router.patch('/', verifyAuth, patch);
router.delete('/', verifyAuth, remove, deleteAllFinancialReports, deletePresetReport);

export default router;