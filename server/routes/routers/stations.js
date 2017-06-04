const {Router} = require('express');
const StationController = require('../../controllers/station-controller');


const router = Router();
const stationCtrl = new StationController();

router.get('/:trainId', stationCtrl.getTrainStation);
// router.get('/:trainId/:number', stationCtrl.getOneStation);
// router.post('/:trainId', stationCtrl.createStation);
// router.delete('/:trainId/:number', stationCtrl.deleteOneStation);
// router.put('/:trainId/:number', stationCtrl.updateStation);

module.exports = router;