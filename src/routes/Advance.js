import { Router } from 'express';
import { add_requestAdvance, get_advance } from '../services/Advance.service.js';


const router = Router();

router.post("/add_requestAdvance",add_requestAdvance)

router.get("/get_Advance",get_advance)


export default router;