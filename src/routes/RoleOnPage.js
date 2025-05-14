import { Router } from 'express';
import { createRoleOnPage_Master } from '../services/RoleOnpage.services.js';



const router = Router();
router.get('/create_role_master',createRoleOnPage_Master);



export default router;