import { Router } from 'express';
import { InsertLeave } from '../services/LeaveData.service.js';


const router = Router();

router.get('/leaveReg', InsertLeave);

export default router;