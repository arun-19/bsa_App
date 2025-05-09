import { Router } from 'express';
const router = Router();

const upload = multer({ limits:  {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
    fields: 10, // Limit number of fields (optional)
    fieldSize: 100 * 1024 * 1024, // Set the field value size limit to 100MB (if you are sending large data in form fields)
  },storage: multer.memoryStorage()});
import { login, create, get, remove, getOne, getUserDet, getDesignation, getRolesOnPage, createRoleOnPage, getUserDetails, UpdateRoleOnPage, UploadImage, getUserImage, getCompanyCode, getEmployeeIds, update_fcm, get_hod_token, get_refresh_token, get_fcm_token, send_Otp, verify_Otp_and_change_pass } from "../services/user.service.js";
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
router.get("/get_refresh_token",get_refresh_token)

router.delete('/', remove)

router.post("/UpdateRoleOnPage",UpdateRoleOnPage)

router.get("/getCompanyCode",getCompanyCode)
router.get("/getEmployeeIds",getEmployeeIds)
router.post("/update_fcm",update_fcm)
router.get("/get_hod_token",get_hod_token)
router?.get("/get_fcm_token",get_fcm_token)
router?.post("/send_Otp",send_Otp)
router?.post("/change_password",verify_Otp_and_change_pass)
// router.put('/', put)

export default router;