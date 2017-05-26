const {Router} = require('express');
const ReportController = require('../../controllers/report-controller');


const router = Router();
const reportCtrl = new ReportController();

router.get('/train', reportCtrl.getTrain);

module.exports = router;