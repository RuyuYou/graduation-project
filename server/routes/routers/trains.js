const {Router} = require('express');
const TrainController = require('../../controllers/train-controller');


const router = Router();
const trainCtrl = new TrainController();

router.get('/', trainCtrl.getAll);
// router.get('/:trainId', trainCtrl.getOne);
router.post('/', trainCtrl.create);
// router.delete('/:trainId', trainCtrl.delete);
// router.put('/:trainId', trainCtrl.update);

module.exports = router;