import { Router } from 'express';
import { getDocId, requestPermission, requestPermission_Approval,get__per, addPermission_master, get__per_category} from '../services/PermissionEntry.service.js';

const router = Router();
router.get('/', get__per);
router.get('/getDocId', getDocId);
router.post("/requestPermission",requestPermission)
router.post("/requestPermission_Approval",requestPermission_Approval)
router.post("/addPermission_Master",addPermission_master)
router.get("/get__per_category",get__per_category)

export default router;