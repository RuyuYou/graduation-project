const {Router} = require('express');
const TickerController = require('../../controllers/ticker-controller');

const router = Router();
const tickerCtrl = new TickerController();

router.get('/:trainId', tickerCtrl.getOneTrain);
// router.put('/:tickerId', tickerCtrl.updateTickers);
// router.post('/', tickerCtrl.createTickers);
// router.delete('/:tickerId', tickerCtrl.deleteTickers);

module.exports = router;