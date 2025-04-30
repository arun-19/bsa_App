import { Router } from 'express';
import { getDocId, requestPermission, requestPermission_Approval } from '../services/PermissionEntry.service.js';


const router = Router();

router.get('/getDocId', getDocId);

router.post("/requestPermission",requestPermission)

router.post("/requestPermission_Approval",requestPermission_Approval)

export default router;