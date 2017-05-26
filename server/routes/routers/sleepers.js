const {Router} = require('express');
const SleeperController = require('../../controllers/sleeper-controller');


const router = Router();
const sleeperCtrl = new SleeperController();

router.get('/', sleeperCtrl.getAll);
router.get('/:sleeperId', sleeperCtrl.getOne);
router.post('/', sleeperCtrl.create);
router.delete('/:sleeperId', sleeperCtrl.delete);
router.put('/:sleeperId', sleeperCtrl.update);

module.exports = router;