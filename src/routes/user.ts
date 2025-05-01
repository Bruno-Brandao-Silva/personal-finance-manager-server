import { Router } from "express";
import { deleteAllFinancialReports } from "../controllers/financialReport.js";
import { deletePresetReport } from "../controllers/presetReport.js";
import { get, patch, remove } from '../controllers/user.js';
import { verifyAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyAuth, get);
router.patch('/', verifyAuth, patch);
router.delete('/', verifyAuth, remove, deleteAllFinancialReports, deletePresetReport);

export default router;