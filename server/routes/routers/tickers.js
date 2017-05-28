const {Router} = require('express');
const TickerController = require('../../controllers/ticker-controller');

const router = Router();
const tickerCtrl = new TickerController();

router.get('/', tickerCtrl.getTickers);
router.get('/:trainId', tickerCtrl.getOneTicker);
router.put('/:tickerId', tickerCtrl.updateTickers);
router.post('/', tickerCtrl.createTickers);
router.delete('/:tickerId', tickerCtrl.deleteTickers);

module.exports = router;