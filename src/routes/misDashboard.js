import { Router } from 'express';

import { get, getActualVsBudget, getActualVsBudgetValueMonthWise, getBuyerWiseRevenue, getCateogryToTSalary, getCurrentMonthLeaves, getEachOverTimeWages, getESI, getGenderCount, getInOut, getInsuranceData, getLastMonthSalary, getMonthESIPF, getMoreDetails, getOverTime, getOverTimeWages, getShortShipmentRatio, getTotalHeadCount, getTotalPA, getTotalStrength, getUserMobData, getYearlyComp, getYearWiseToTSalary, ToTexpenses } from '../services/misDashboard.service.js';

const router = Router();

router.get('/', get);
router.get('/getInsuranceData', getInsuranceData);
router.get('/getTotalStrength', getTotalStrength);
router.get('/actualVsBudgetValueMonthWise', getActualVsBudgetValueMonthWise);
router.get('/getYearWiseToTSalary', getYearWiseToTSalary); 
router.get('/yearlyComp', getYearlyComp)
router.get('/buyerWiseRev', getBuyerWiseRevenue)
router.get('/actualVsBudget', getActualVsBudget)
router.get('/shortShipment', getShortShipmentRatio)
router.get("/getLastMonthSalary",getLastMonthSalary)
router.get("/getCurrentMonthLeaves",getCurrentMonthLeaves)
router.get("/getTotalHeadCount",getTotalHeadCount)
router.get("/getCateogryToTSalary",getCateogryToTSalary)
router.get("/ToTexpenses",ToTexpenses)
router.get("/getMonthESIPF",getMonthESIPF)
router?.get("/getOverTime",getOverTime)
router?.get("/getMoreDetails",getMoreDetails)
router?.get("/getESI",getESI)
router?.get("/getOverTimeWages",getOverTimeWages)
router?.get("/getEachOverTimeWages",getEachOverTimeWages)
router?.get("/getUserMobData",getUserMobData)
router?.get("/getInOut",getInOut)
router?.get("/getgendercount",getGenderCount)
router?.get("/getTotalPA",getTotalPA)

export default router;