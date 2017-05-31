const {Router} = require('express');
const StationController = require('../../controllers/station-controller');


const router = Router();
const stationCtrl = new StationController();

router.get('/', stationCtrl.getAllStation);
router.get('/:trainId', stationCtrl.getOneStation);
router.post('/:trainId', stationCtrl.createStation);
router.delete('/:stationId', stationCtrl.deleteStation);
router.put('/:stationId', stationCtrl.updateStation);

module.exports = router;