const {Router} = require('express');
const TickerController = require('../../controllers/ticker-controller');

const router = Router();
const tickerCtrl = new TickerController();

router.get('/', tickerCtrl.getTickers);
router.put('/:id', tickerCtrl.updateTickers);
router.post('/', tickerCtrl.createTickers);

module.exports = router;