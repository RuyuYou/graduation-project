const {Router} = require('express');
const ConsumerController = require('../../controllers/consumer-controller');


const router = Router();
const consumerCtrl = new ConsumerController();

router.get('/', consumerCtrl.getAll);
router.get('/:consumerId', consumerCtrl.getOne);
// router.post('/', consumerCtrl.create);
// router.delete('/:consumerId', consumerCtrl.delete);
// router.put('/:consumerId', consumerCtrl.update);

module.exports = router;