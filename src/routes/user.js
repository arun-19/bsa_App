import { Router } from 'express';
const router = Router();
import { login, create, get, remove, getOne, getUserDet, getDesignation, getRolesOnPage, createRoleOnPage } from "../services/user.service.js";

router.post('/login', login);

router.post('/', create);

router.get('/', get);

router.get('/getUserDet', getUserDet)

router.get('/userDetails', getOne)

router.get('/getDesignation', getDesignation)

router.get('/getRolesOnPage', getRolesOnPage)

router.post('/createRoleOnPage', createRoleOnPage);

router.delete('/', remove)


// router.put('/', put)

export default router;