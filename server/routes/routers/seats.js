const {Router} = require('express');
const SeatController = require('../../controllers/seat-controller');


const router = Router();
const seatCtrl = new SeatController();

// router.get('/', seatCtrl.getAll);
// router.get('/:seatId', seatCtrl.getOne);
router.post('/', seatCtrl.create);
// router.delete('/:seatId', seatCtrl.delete);
// router.put('/:seatId', seatCtrl.update);

module.exports = router;