import { Router } from "express";
import { verifyAuth } from '../middlewares/auth';
import {
    createPresetReport,
    getPresetReport,
    updatePresetReport,
    deletePresetReport
} from '../controllers/presetReport';

const router = Router()

router.post('/', verifyAuth, createPresetReport);
router.get('/', verifyAuth, getPresetReport);
router.put('/', verifyAuth, updatePresetReport);
router.delete('/', verifyAuth, deletePresetReport);

export default router;