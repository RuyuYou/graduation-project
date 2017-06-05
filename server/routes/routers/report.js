const {Router} = require('express');
const ReportController = require('../../controllers/report-controller');


const router = Router();
const reportCtrl = new ReportController();

router.get('/train/:trainId', reportCtrl.getTrain);
router.get('/ticker/:trainId', reportCtrl.getTickers);

module.exports = router;