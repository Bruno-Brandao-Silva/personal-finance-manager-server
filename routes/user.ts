import { Router } from "express";
import { verifyAuth } from '../middlewares/auth';
import { get, patch, remove } from '../controllers/user';
import { deleteAllFinancialReports } from "../controllers/financialReport";
import { deletePresetReport } from "../controllers/presetReport";

const router = Router();

router.get('/', verifyAuth, get);
router.patch('/', verifyAuth, patch);
router.delete('/', verifyAuth, remove, deleteAllFinancialReports, deletePresetReport);

export default router;