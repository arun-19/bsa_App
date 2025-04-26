import { Router } from 'express';
const router = Router();

const upload = multer({ limits:  {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
    fields: 10, // Limit number of fields (optional)
    fieldSize: 100 * 1024 * 1024, // Set the field value size limit to 100MB (if you are sending large data in form fields)
  },storage: multer.memoryStorage()});
import { login, create, get, remove, getOne, getUserDet, getDesignation, getRolesOnPage, createRoleOnPage, getUserDetails, UpdateRoleOnPage, UploadImage, getUserImage, getCompanyCode, getEmployeeIds } from "../services/user.service.js";
import multer from 'multer';

router.post('/login', login);

router.post('/', create);

router.get('/', get);

router.get('/getUserDet', getUserDet)

router.get('/userDetails', getOne)

router.get('/getUserBasicDetails',getUserDetails)

router.get('/getDesignation', getDesignation)

router.get('/getRolesOnPage', getRolesOnPage)


router.post('/createRoleOnPage', createRoleOnPage);
router.post("/upload",upload.single('file'),UploadImage)
router.get("/getUserImage/:USERNAME",getUserImage)

router.delete('/', remove)

router.post("/UpdateRoleOnPage",UpdateRoleOnPage)

router.get("/getCompanyCode",getCompanyCode)
router.get("/getEmployeeIds",getEmployeeIds)


// router.put('/', put)

export default router;