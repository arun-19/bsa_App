import { Router } from 'express';

import { get, getActualVsBudget, getActualVsBudgetValueMonthWise, getBuyerWiseRevenue, getInsuranceData, getOrdersInHandMonthWise, getShortShipmentRatio, getYearlyComp } from '../services/misDashboard.service.js';

const router = Router();

router.get('/', get);

router.get('/getInsuranceData', getInsuranceData);


router.get('/ordersInHandMonthWise', getOrdersInHandMonthWise);

router.get('/actualVsBudgetValueMonthWise', getActualVsBudgetValueMonthWise);

router.get('/yearlyComp', getYearlyComp)

router.get('/buyerWiseRev', getBuyerWiseRevenue)

router.get('/actualVsBudget', getActualVsBudget)

router.get('/shortShipment', getShortShipmentRatio)

export default router;