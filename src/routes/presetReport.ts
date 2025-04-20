import { Router } from "express";
import {
    createPresetReport,
    deletePresetReport,
    getPresetReport,
    updatePresetReport
} from '../controllers/presetReport.ts';
import { verifyAuth } from '../middlewares/auth.ts';

const router = Router()

router.post('/', verifyAuth, createPresetReport);
router.get('/', verifyAuth, getPresetReport);
router.put('/', verifyAuth, updatePresetReport);
router.delete('/', verifyAuth, deletePresetReport);

export default router;