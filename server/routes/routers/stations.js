const {Router} = require('express');
const StationController = require('../../controllers/station-controller');


const router = Router();
const stationCtrl = new StationController();

router.get('/:trainId/:number', stationCtrl.findNumber);
router.get('/:trainId', stationCtrl.getOneStation);
router.get('/:trainId/:number', stationCtrl.getStationNumber);
router.post('/:trainId', stationCtrl.createStation);
router.delete('/:trainId/:stationId', stationCtrl.deleteStation);
router.put('/:trainId/:number', stationCtrl.updateStation);

module.exports = router;