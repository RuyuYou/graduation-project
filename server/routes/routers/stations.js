const {Router} = require('express');
const StationController = require('../../controllers/station-controller');


const router = Router();
const stationCtrl = new StationController();

// router.get('/', stationCtrl.getAll);
// router.get('/:stationId', stationCtrl.getOne);
router.post('/', stationCtrl.createStation);
// router.delete('/:stationId', stationCtrl.delete);
// router.put('/:stationId', stationCtrl.update);

module.exports = router;