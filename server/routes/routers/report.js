const {Router} = require('express');
const ReportController = require('../../controllers/report-controller');


const router = Router();
const reportCtrl = new ReportController();

router.get('/train', reportCtrl.getTrain);
router.get('/ticker', reportCtrl.getTickers);

module.exports = router;